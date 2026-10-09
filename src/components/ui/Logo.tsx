import { useRef, useEffect } from 'react';

export const Logo = ({
  className = "",
  onAdminTrigger
}: {
  className?: string;
  onAdminTrigger?: () => void;
}) => {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (!onAdminTrigger) return;

    clickCount.current += 1;

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    if (clickCount.current >= 3) {
      // Triple-click detected
      clickCount.current = 0;
      onAdminTrigger();
    } else {
      // Reset after 2 seconds
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 2000);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      onClick={handleClick}
      style={{ cursor: onAdminTrigger ? 'pointer' : 'default' }}
      role={onAdminTrigger ? 'button' : undefined}
      aria-label={onAdminTrigger ? 'Mana Naidupalli - triple click for admin access' : undefined}
      tabIndex={onAdminTrigger ? 0 : undefined}
      onKeyDown={(e) => {
        if (onAdminTrigger && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <span className="text-2xl" role="img" aria-label="wheat">🌾</span>
      <span className="font-bold text-xl tracking-tight text-primary-dark">MANA NAIDUPALLI</span>
    </div>
  );
};