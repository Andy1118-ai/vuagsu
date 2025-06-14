import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/atoms/Button';

export const ScheduleVisit: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Schedule a Visit</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-4">
          Please fill out the form below to schedule a visit to our facility.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-neutral-700 mb-1">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us about your interest in our dogs and any specific questions you have..."
                />
              </div>

              <div className="flex items-center justify-center">
                <Button type="submit" variant="primary" size="lg">
                  Schedule Visit
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-primary-50 rounded-xl p-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                Visit Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">What to Expect</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Tour of our facilities</li>
                    <li>• Meet our breeding dogs</li>
                    <li>• Learn about our breeding program</li>
                    <li>• Discuss your preferences</li>
                    <li>• Q&A session</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Location</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <div className="text-neutral-600">
                      <p>123 Kennel Road</p>
                      <p>Rural Valley, PA 15555</p>
                      <p className="mt-2 text-sm">Visits by appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 