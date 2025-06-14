import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Users, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const timeline = [
  {
    year: '1995',
    title: 'Kennel Foundation',
    description: 'Vugasu Kennels was established with a vision to breed exceptional German Shepherds with superior bloodlines and temperament.',
  },
  {
    year: '2000',
    title: 'First Champions',
    description: 'Our first breeding program produced multiple regional champions, establishing our reputation for quality.',
  },
  {
    year: '2005',
    title: 'International Recognition',
    description: 'Achieved international recognition with dogs exported to Europe and featured in major dog publications.',
  },
  {
    year: '2010',
    title: 'Training Expansion',
    description: 'Expanded services to include professional training programs for obedience, protection, and specialized work.',
  },
  {
    year: '2015',
    title: 'Health Testing Leader',
    description: 'Became leaders in health testing and genetic screening, ensuring the healthiest possible breeding program.',
  },
  {
    year: '2020',
    title: 'Modern Facilities',
    description: 'Completed construction of state-of-the-art facilities with climate-controlled kennels and training areas.',
  },
  {
    year: '2024',
    title: 'Digital Innovation',
    description: 'Launched comprehensive digital platform for enhanced customer experience and breeding transparency.',
  },
];

const team = [
  {
    name: 'John Mueller',
    role: 'Founder & Head Breeder',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    bio: 'With over 30 years of experience, John founded Vugasu Kennels with a passion for preserving the working German Shepherd.',
    certifications: ['Master Breeder Certificate', 'Schutzhund Judge', 'Canine Genetics Specialist'],
  },
  {
    name: 'Sarah Mueller',
    role: 'Training Director',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    bio: 'Sarah leads our training programs with expertise in behavioral psychology and positive reinforcement methods.',
    certifications: ['Certified Professional Dog Trainer', 'Animal Behavior Specialist', 'IPO Judge'],
  },
  {
    name: 'Dr. Michael Torres',
    role: 'Veterinary Consultant',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    bio: 'Dr. Torres oversees our health testing protocols and ensures the highest standards of veterinary care.',
    certifications: ['DVM', 'Canine Reproduction Specialist', 'Genetic Testing Certified'],
  },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of breeding, training, and customer service.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Every dog is treated with love and care, ensuring their physical and emotional well-being.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in breeding practices and business operations.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building lasting relationships with our customers and supporting the German Shepherd community.',
  },
];

export const About: React.FC = () => {
  const { elementRef: heroRef, isIntersecting: heroVisible } = useIntersectionObserver();
  const { elementRef: timelineRef, isIntersecting: timelineVisible } = useIntersectionObserver();
  const { elementRef: teamRef, isIntersecting: teamVisible } = useIntersectionObserver();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 bg-gradient-to-br from-primary-800 to-primary-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Three decades of dedication to breeding exceptional German Shepherds 
              and building lifelong relationships with dog-loving families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-neutral-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              At Vugasu Kennels, our mission is to preserve and enhance the noble German Shepherd breed 
              through responsible breeding practices, comprehensive health testing, and dedicated customer service. 
              We believe that every dog deserves a loving home and every family deserves a healthy, 
              well-tempered companion that will bring joy for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a recognized leader in German Shepherd breeding.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={timelineVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg hidden md:block" />

                  {/* Mobile year indicator */}
                  <div className="md:hidden absolute left-0 w-20 text-center">
                    <div className="text-primary-600 font-bold text-lg">
                      {item.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Vugasu Kennels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The dedicated professionals behind Vugasu Kennels' success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-neutral-600 mb-4">
                    {member.bio}
                  </p>
                  <div className="space-y-1">
                    {member.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-center gap-2 text-sm text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};