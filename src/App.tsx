import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { Chatbot } from './components/organisms/Chatbot';
import { Home } from './pages/Home';
import { Dogs } from './pages/Dogs';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ScheduleVisit } from './pages/ScheduleVisit';
import { AdminLogin } from './pages/Admin/Login';
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminDogs } from './pages/Admin/Dogs';
import { AdminBookings } from './pages/Admin/Bookings';
import { AdminCustomers } from './pages/Admin/Customers';
import { AdminGallery } from './pages/Admin/Gallery';
import { AdminSettings } from './pages/Admin/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="dogs" element={<AdminDogs />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Public Routes */}
              <Route path="/*" element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dogs" element={<Dogs />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/schedule-visit" element={<ScheduleVisit />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Chatbot />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;