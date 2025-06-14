import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const stats = [
  {
    title: 'Total Dogs',
    value: '24',
    change: '+2 this month',
    icon: Heart,
    color: 'bg-blue-500',
  },
  {
    title: 'Active Bookings',
    value: '12',
    change: '+3 this week',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    title: 'Monthly Revenue',
    value: '$15,420',
    change: '+12% from last month',
    icon: DollarSign,
    color: 'bg-yellow-500',
  },
  {
    title: 'Customer Inquiries',
    value: '38',
    change: '+8 today',
    icon: Users,
    color: 'bg-purple-500',
  },
];

const recentActivities = [
  {
    id: '1',
    type: 'booking',
    message: 'New training session booked by Sarah Johnson',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'inquiry',
    message: 'Puppy inquiry from Michael Chen',
    time: '4 hours ago',
    status: 'pending',
  },
  {
    id: '3',
    type: 'health',
    message: 'Health check completed for Ace von Vugasu',
    time: '6 hours ago',
    status: 'success',
  },
  {
    id: '4',
    type: 'alert',
    message: 'Vaccination reminder for 3 dogs',
    time: '1 day ago',
    status: 'warning',
  },
];

const upcomingTasks = [
  {
    id: '1',
    task: 'Health screening for new litter',
    due: 'Today',
    priority: 'high',
  },
  {
    id: '2',
    task: 'Client visit - Thompson family',
    due: 'Tomorrow',
    priority: 'medium',
  },
  {
    id: '3',
    task: 'Update website gallery',
    due: 'This week',
    priority: 'low',
  },
  {
    id: '4',
    task: 'Quarterly health reports',
    due: 'Next week',
    priority: 'medium',
  },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-dog':
        navigate('/admin/dogs');
        break;
      case 'new-booking':
        navigate('/admin/bookings');
        break;
      case 'add-customer':
        navigate('/admin/customers');
        break;
      case 'update-gallery':
        navigate('/admin/gallery');
        break;
    }
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
          Dashboard
        </h1>
        <p className="text-neutral-600">
          Welcome back! Here's what's happening at Vugasu Kennels today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-neutral-600 mb-2">{stat.title}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-800">{activity.message}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
                {activity.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
                {activity.status === 'warning' && (
                  <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Upcoming Tasks
          </h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">{task.task}</p>
                  <p className="text-xs text-neutral-500">{task.due}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleQuickAction('add-dog')}
            className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-center"
          >
            <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-primary-800">Add Dog</span>
          </button>
          <button
            onClick={() => handleQuickAction('new-booking')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
          >
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-800">New Booking</span>
          </button>
          <button
            onClick={() => handleQuickAction('add-customer')}
            className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-center"
          >
            <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-yellow-800">Add Customer</span>
          </button>
          <button
            onClick={() => handleQuickAction('update-gallery')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
          >
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-800">Update Gallery</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};