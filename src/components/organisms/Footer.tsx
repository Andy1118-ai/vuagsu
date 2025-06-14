import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Vugasu Kennels</h3>
                <p className="text-sm text-neutral-400">Premium German Shepherds</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Dedicated to breeding exceptional German Shepherds with superior bloodlines, 
              temperament, and health. Serving dog lovers since 1995.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Available Dogs', href: '/dogs' },
                { name: 'Training Services', href: '/services' },
                { name: 'Breeding Program', href: '/breeding' },
                { name: 'Health Testing', href: '/health' },
                { name: 'Testimonials', href: '/testimonials' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                'Puppy Training',
                'Adult Dog Training',
                'Boarding Services',
                'Breeding Consultation',
                'Health Screenings',
              ].map((service) => (
                <li key={service}>
                  <span className="text-neutral-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-400">
                    123 Kennel Road<br />
                    Rural Valley, PA 15555
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <p className="text-sm text-neutral-400">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <p className="text-sm text-neutral-400">info@vugasu.com</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Business Hours</h5>
              <div className="text-sm text-neutral-400 space-y-1">
                <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 Vugasu Kennels. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-neutral-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};