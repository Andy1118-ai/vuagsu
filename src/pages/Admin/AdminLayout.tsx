import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Heart, 
  Calendar, 
  Users, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/atoms/Button';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Dogs', href: '/admin/dogs', icon: Heart },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-800">
                  Vugasu Admin
                </h1>
                <p className="text-xs text-neutral-600">Management Portal</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-6 border-t border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                <span className="text-neutral-600 font-medium">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-neutral-500">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};