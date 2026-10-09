import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { AnnouncementsPage } from './pages/Announcements';
import { AnnouncementDetail } from './pages/AnnouncementDetail';
import { EventsPage } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { TemplesPage } from './pages/Temples';
import { TempleDetail } from './pages/TempleDetail';
import { CricketPage } from './pages/Cricket';
import { AgriculturePage } from './pages/Agriculture';
import { GovernmentPage } from './pages/Government';
import { GalleryPage } from './pages/Gallery';
import { SriRamYouthPage } from './pages/SriRamYouth';
import { ExplorePage } from './pages/Explore';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminTemples } from './pages/admin/AdminTemples';
import { AdminCricket } from './pages/admin/AdminCricket';
import { AdminAgriculture } from './pages/admin/AdminAgriculture';
import { AdminGovernment } from './pages/admin/AdminGovernment';
import { AdminSriRamYouth } from './pages/admin/AdminSriRamYouth';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminSettings } from './pages/admin/AdminSettings';
import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';

// Admin route protection wrapper
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const role = session.user.user_metadata?.role || session.user.app_metadata?.role;
        if (role === 'admin' || session.user.email === 'admin@mana-naidupalli.in') {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || session.user.app_metadata?.role;
        if (role === 'admin' || session.user.email === 'admin@mana-naidupalli.in') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="announcements/:id" element={<AnnouncementDetail />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="temples" element={<TemplesPage />} />
          <Route path="temples/:id" element={<TempleDetail />} />
          <Route path="cricket" element={<CricketPage />} />
          <Route path="agriculture" element={<AgriculturePage />} />
          <Route path="government" element={<GovernmentPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="sri-ram-youth" element={<SriRamYouthPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>

        {/* Admin routes - protected */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/announcements" element={
            <ProtectedAdminRoute>
              <AdminAnnouncements />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedAdminRoute>
              <AdminEvents />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/temples" element={
            <ProtectedAdminRoute>
              <AdminTemples />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/cricket" element={
            <ProtectedAdminRoute>
              <AdminCricket />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/agriculture" element={
            <ProtectedAdminRoute>
              <AdminAgriculture />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/government" element={
            <ProtectedAdminRoute>
              <AdminGovernment />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/sri-ram-youth" element={
            <ProtectedAdminRoute>
              <AdminSriRamYouth />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/gallery" element={
            <ProtectedAdminRoute>
              <AdminGallery />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedAdminRoute>
              <AdminNotifications />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          } />
        </Route>

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </LanguageProvider>
  );
}

export default App;
