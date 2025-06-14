import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Heart, Shield, Star, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DynamicHero } from '../components/organisms/DynamicHero';
import { Button } from '../components/atoms/Button';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const stats = [
  { label: 'Years of Excellence', value: '29+', icon: Award },
  { label: 'Happy Families', value: '500+', icon: Heart },
  { label: 'Champions Bred', value: '50+', icon: Star },
  { label: 'Health Certifications', value: '100%', icon: Shield },
];

const features = [
  {
    title: 'Championship Bloodlines',
    description: 'Our German Shepherds come from world-renowned champion bloodlines with documented pedigrees.',
    icon: Award,
  },
  {
    title: 'Health Guaranteed',
    description: 'Every puppy comes with comprehensive health testing and lifetime health guarantees.',
    icon: Shield,
  },
  {
    title: 'Professional Training',
    description: 'Expert training services from basic obedience to advanced protection work.',
    icon: Users,
  },
  {
    title: 'Lifetime Support',
    description: 'We provide ongoing support and guidance throughout your dogs entire life.',
    icon: Heart,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Pittsburgh, PA',
    text: 'Max from Vugasu Kennels is absolutely incredible. The bloodline quality and temperament are exactly what we were looking for. Professional service from start to finish.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    location: 'Philadelphia, PA',
    text: 'Outstanding experience! The training program exceeded our expectations. Luna is now a perfectly trained family companion.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    location: 'New York, NY',
    text: 'The health guarantees and ongoing support make all the difference. Three years later, we still receive check-ins from the Vugasu team.',
    rating: 5,
  },
];

export const Home: React.FC = () => {
  const { elementRef: statsRef, isIntersecting: statsVisible } = useIntersectionObserver();
  const { elementRef: featuresRef, isIntersecting: featuresVisible } = useIntersectionObserver();

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <DynamicHero />

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-shepherd-tan/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-shepherd-brown" />
                </div>
                <div className="text-3xl font-bold text-shepherd-black mb-2">{stat.value}</div>
                <div className="text-shepherd-brown">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-shepherd-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-shepherd-black mb-4">
              Why Choose Vugasu Kennels?
            </h2>
            <p className="text-xl text-shepherd-brown max-w-3xl mx-auto">
              We combine decades of breeding expertise with modern health testing 
              and training methods to deliver exceptional German Shepherds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-shepherd-tan/20 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-shepherd-brown" />
                </div>
                <h3 className="text-xl font-semibold text-shepherd-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-shepherd-brown">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-shepherd-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Families Say</h2>
            <p className="text-xl text-shepherd-beige max-w-2xl mx-auto">
              Hear from the families who have welcomed our German Shepherds into their homes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-shepherd-black/20 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-shepherd-tan fill-current" />
                  ))}
                </div>
                <p className="text-shepherd-beige mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-shepherd-tan text-sm">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-shepherd-tan">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-shepherd-black mb-4">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-xl text-shepherd-brown mb-8">
              Schedule a visit to meet our available dogs and learn more about our breeding program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white text-shepherd-brown border-white hover:bg-shepherd-beige">
                  Schedule a Visit
                </Button>
              </Link>
              <Link to="/dogs">
                <Button size="lg" className="bg-shepherd-brown hover:bg-shepherd-black text-white">
                  View Available Dogs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};