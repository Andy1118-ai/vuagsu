import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  Save,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/atoms/Button';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your admin profile and account information',
    icon: User,
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure email and system notifications',
    icon: Bell,
  },
  {
    id: 'security',
    title: 'Security Settings',
    description: 'Manage password and security preferences',
    icon: Lock,
  },
  {
    id: 'website',
    title: 'Website Settings',
    description: 'Configure website content and appearance',
    icon: Globe,
  },
  {
    id: 'email',
    title: 'Email Settings',
    description: 'Manage email templates and settings',
    icon: Mail,
  },
];

export const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          Settings
        </h1>
        <p className="text-neutral-600">
          Manage your admin account and website settings.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-4">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            {settingsSections.map((section) => (
              <div
                key={section.id}
                className={activeSection === section.id ? 'block' : 'hidden'}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-800">
                      {section.title}
                    </h2>
                    <p className="text-neutral-600">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Settings Form */}
                <div className="space-y-6">
                  {section.id === 'profile' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </>
                  )}

                  {section.id === 'notifications' && (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-neutral-800">
                              Email Notifications
                            </h3>
                            <p className="text-sm text-neutral-600">
                              Receive email notifications for important updates
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-neutral-800">
                              System Notifications
                            </h3>
                            <p className="text-sm text-neutral-600">
                              Show notifications in the admin dashboard
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === 'security' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </>
                  )}

                  {section.id === 'website' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Website Title
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter website title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter contact email"
                        />
                      </div>
                    </>
                  )}

                  {section.id === 'email' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          SMTP Server
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter SMTP server address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          SMTP Port
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter SMTP port"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Save Button */}
                <div className="mt-8 flex items-center justify-end gap-4">
                  {showSuccess && (
                    <div className="flex items-center gap-2 text-green-600">
                      <AlertCircle className="w-5 h-5" />
                      <span>Settings saved successfully!</span>
                    </div>
                  )}
                  <Button
                    onClick={handleSave}
                    loading={isSaving}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 