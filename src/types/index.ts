export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  color: string;
  weight: number;
  height: number;
  bloodline: string;
  parents: {
    sire?: string;
    dam?: string;
  };
  images: string[];
  description: string;
  achievements: string[];
  healthCertifications: string[];
  available: boolean;
  price?: number;
  status: 'available' | 'reserved' | 'sold' | 'breeding';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'training' | 'boarding' | 'breeding' | 'healthcare';
  features: string[];
  image: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'customer';
  avatar?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: 'training' | 'puppies' | 'breeding' | 'facility' | 'events';
  tags: string[];
  featured: boolean;
  uploadedAt: string;
}

export interface BloodlineSlide {
  id: string;
  bloodline: string;
  title: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface FamilyTreeNode {
  id: string;
  name: string;
  gender: 'male' | 'female';
  image: string;
  bloodline: string;
  achievements: string[];
  status: 'available' | 'reserved' | 'sold' | 'breeding';
  price?: number;
  age?: number;
  description: string;
  position: {
    x: number;
    y: number;
  };
  connections: string[];
}

export interface FamilyTree {
  id: string;
  bloodline: string;
  sire: FamilyTreeNode;
  dam: FamilyTreeNode;
  offspring: FamilyTreeNode[];
}