import { useState, useEffect, useCallback } from 'react';
import { pushSubscriptionsService, webPushService } from '../lib/services';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check browser support and permission
  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);

      // Check existing subscription
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription({
              endpoint: sub.endpoint,
              keys: {
                p256dh: arrayBufferToBase64(sub.getKey('p256dh')!),
                auth: arrayBufferToBase64(sub.getKey('auth')!),
              },
            });
          }
        });
      });
    }
  }, []);

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Convert base64 to ArrayBuffer (for VAPID key)
  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError('Push notifications not supported in this browser');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Request permission
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') {
        setError('Notification permission denied');
        setLoading(false);
        return false;
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Get VAPID public key from env
      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        setError('VAPID public key not configured');
        setLoading(false);
        return false;
      }

      // Subscribe
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToArrayBuffer(vapidPublicKey),
      });

      const subscriptionData = {
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(pushSubscription.getKey('p256dh')!),
          auth: arrayBufferToBase64(pushSubscription.getKey('auth')!),
        },
      };

      // Save to backend
      await pushSubscriptionsService.subscribe(subscriptionData, navigator.userAgent);

      setSubscription(subscriptionData);
      setIsSubscribed(true);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Push subscribe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      setLoading(false);
      return false;
    }
  }, [isSupported]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!subscription) return;

    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.getSubscription();

      if (pushSubscription) {
        await pushSubscription.unsubscribe();
      }

      await pushSubscriptionsService.unsubscribe(subscription.endpoint);

      setSubscription(null);
      setIsSubscribed(false);
      setLoading(false);
    } catch (err) {
      console.error('Push unsubscribe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to unsubscribe');
      setLoading(false);
    }
  }, [subscription]);

  // Toggle subscription
  const toggle = useCallback(async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  }, [isSubscribed, subscribe, unsubscribe]);

  return {
    isSupported,
    permission,
    isSubscribed,
    subscription,
    error,
    loading,
    subscribe,
    unsubscribe,
    toggle,
  };
}

// Helper to send test notification (admin only)
export async function sendTestNotification() {
  return webPushService.sendToAll({
    title: 'Test Notification',
    body: 'Push notifications are working correctly!',
    url: '/',
  });
}