import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { Booking, Service } from '../../types';

// Mock data for demonstration
const mockServices: Record<string, Service> = {
  'training-1': {
    id: 'training-1',
    name: 'Puppy Training',
    description: 'Basic obedience training for puppies',
    price: 150,
    duration: 60,
    category: 'training',
    features: ['Basic commands', 'Socialization', 'House training'],
    image: '/images/services/training.jpg',
  },
  'boarding-1': {
    id: 'boarding-1',
    name: 'Weekend Boarding',
    description: 'Overnight boarding service',
    price: 75,
    duration: 24,
    category: 'boarding',
    features: ['24/7 supervision', 'Regular exercise', 'Comfortable accommodation'],
    image: '/images/services/boarding.jpg',
  },
};

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: 'training-1',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    customerPhone: '(555) 123-4567',
    date: '2024-03-15',
    time: '10:00',
    status: 'confirmed',
    notes: 'First training session for new puppy',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: '2',
    serviceId: 'boarding-1',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    customerPhone: '(555) 987-6543',
    date: '2024-03-20',
    time: '14:00',
    status: 'pending',
    notes: 'Weekend boarding request',
    createdAt: '2024-03-02T15:30:00Z',
  },
];

export const AdminBookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesDate = !selectedDate || booking.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement actual API call
      console.log('Update booking status:', bookingId, newStatus);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      setError('Failed to update booking status');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyles = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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
          Bookings Management
        </h1>
        <p className="text-neutral-600">
          Manage and track all service bookings and appointments.
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-neutral-900">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {booking.customerEmail}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {booking.customerPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-900">
                        {mockServices[booking.serviceId]?.name || 'Unknown Service'}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {mockServices[booking.serviceId]?.category || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-neutral-900">
                        <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${getStatusStyles(booking.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('View booking details:', booking.id)}
                        disabled={isLoading}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}; 