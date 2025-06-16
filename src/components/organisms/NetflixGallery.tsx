import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, X, Clock, MessageCircle, Send, Minimize2, Maximize2 } from 'lucide-react';
import { GalleryImage } from '../../types';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

interface GalleryRow {
  id: string;
  title: string;
  images: GalleryImage[];
}

const profiles: Profile[] = [
  { id: '1', name: 'Dog Lover', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', color: '#e50914' },
  { id: '2', name: 'Breeder', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg', color: '#0071eb' },
  { id: '3', name: 'Trainer', avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg', color: '#ffd700' },
  { id: '4', name: 'Family', avatar: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg', color: '#00d4aa' },
];

const mockGalleryRows: GalleryRow[] = [
  {
    id: 'featured',
    title: 'Featured Champions',
    images: [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
        title: 'Champion Ace von Vugasu',
        description: 'Our champion German Shepherd Ace during advanced protection training session.',
        category: 'training',
        tags: ['protection', 'training', 'champion'],
        featured: true,
        uploadedAt: '2024-01-15',
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
        title: 'Beautiful Bella',
        description: 'Bella showing her excellent structure and noble expression.',
        category: 'breeding',
        tags: ['breeding', 'structure', 'female'],
        featured: false,
        uploadedAt: '2024-01-14',
      },
      {
        id: '3',
        url: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
        title: 'Thor the Magnificent',
        description: 'Impressive solid black male with commanding presence.',
        category: 'breeding',
        tags: ['breeding', 'male', 'black'],
        featured: false,
        uploadedAt: '2024-01-13',
      },
      {
        id: '4',
        url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
        title: 'Elegant Zara',
        description: 'Stunning bi-color female with exceptional movement.',
        category: 'breeding',
        tags: ['breeding', 'female', 'show'],
        featured: false,
        uploadedAt: '2024-01-12',
      },
      {
        id: '5',
        url: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
        title: 'Training Excellence',
        description: 'Professional training session focusing on obedience.',
        category: 'training',
        tags: ['training', 'obedience'],
        featured: false,
        uploadedAt: '2024-01-11',
      },
    ],
  },
  {
    id: 'puppies',
    title: 'Adorable Puppies',
    images: [
      {
        id: '6',
        url: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg',
        title: 'Puppy Playtime',
        description: 'Young puppies enjoying supervised play.',
        category: 'puppies',
        tags: ['puppies', 'play'],
        featured: false,
        uploadedAt: '2024-01-10',
      },
      {
        id: '7',
        url: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg',
        title: 'First Steps',
        description: 'Puppies taking their first steps outdoors.',
        category: 'puppies',
        tags: ['puppies', 'outdoor'],
        featured: false,
        uploadedAt: '2024-01-09',
      },
      {
        id: '8',
        url: 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg',
        title: 'Sleepy Pups',
        description: 'Peaceful puppies resting after play.',
        category: 'puppies',
        tags: ['puppies', 'rest'],
        featured: false,
        uploadedAt: '2024-01-08',
      },
      {
        id: '9',
        url: 'https://images.pexels.com/photos/4148931/pexels-photo-4148931.jpeg',
        title: 'Learning Time',
        description: 'Early socialization and learning activities.',
        category: 'puppies',
        tags: ['puppies', 'learning'],
        featured: false,
        uploadedAt: '2024-01-07',
      },
    ],
  },
  {
    id: 'training',
    title: 'Training Sessions',
    images: [
      {
        id: '10',
        url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        title: 'Advanced Training',
        description: 'Advanced obedience and protection training.',
        category: 'training',
        tags: ['training', 'advanced'],
        featured: false,
        uploadedAt: '2024-01-06',
      },
      {
        id: '11',
        url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
        title: 'Agility Course',
        description: 'Dogs navigating challenging agility obstacles.',
        category: 'training',
        tags: ['training', 'agility'],
        featured: false,
        uploadedAt: '2024-01-05',
      },
      {
        id: '12',
        url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
        title: 'Handler Bonding',
        description: 'Building strong bonds between dogs and handlers.',
        category: 'training',
        tags: ['training', 'bonding'],
        featured: false,
        uploadedAt: '2024-01-04',
      },
    ],
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    message: 'Beautiful dogs! When will the next litter be available?',
    timestamp: new Date(Date.now() - 300000),
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
  },
  {
    id: '2',
    user: 'Mike Chen',
    message: 'Love the training videos. Do you offer remote consultations?',
    timestamp: new Date(Date.now() - 180000),
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
  },
  {
    id: '3',
    user: 'Emily Rodriguez',
    message: 'The facility looks amazing! Can we schedule a visit?',
    timestamp: new Date(Date.now() - 60000),
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
  },
];

export const NetflixGallery: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [unreadCount, setUnreadCount] = useState(2);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle image hover with delay
  const handleImageHover = useCallback((imageId: string | null) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    if (imageId) {
      const timeout = setTimeout(() => {
        setHoveredImage(imageId);
      }, 500);
      setHoverTimeout(timeout);
    } else {
      setHoveredImage(null);
    }
  }, [hoverTimeout]);

  // Scroll row left/right
  const scrollRow = (rowId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[rowId];
    if (container) {
      const scrollAmount = container.clientWidth * 0.4; // 40% overlap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: newMessage,
        timestamp: new Date(),
        avatar: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  // Profile Selection Screen
  if (!selectedProfile) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-6xl font-light mb-12" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            Who's watching?
          </h1>
          
          <div className="flex justify-center gap-8 mb-12">
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                className="cursor-pointer group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProfile(profile)}
              >
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300"
                  style={{ borderColor: profile.color }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-xl mt-4 group-hover:text-gray-300 transition-colors duration-300" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                  {profile.name}
                </p>
              </motion.div>
            ))}
          </div>

          <button className="text-gray-400 text-lg border border-gray-400 px-6 py-2 hover:text-white hover:border-white transition-colors duration-300" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            Manage Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-netflix-black to-black text-white overflow-hidden">
      {/* Header with Clock */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-netflix-black to-transparent p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-red-600">VUGASU</h1>
            <button 
              onClick={() => setSelectedProfile(null)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Switch Profile
            </button>
          </div>
          
          <motion.div 
            className="text-white text-lg"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="inline w-5 h-5 mr-2" />
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </motion.div>
        </div>
      </header>

      {/* Main Gallery Content */}
      <main className="pt-20 pb-10" style={{ minHeight: '90vh' }}>
        {mockGalleryRows.map((row, rowIndex) => (
          <div key={row.id} className="mb-12">
            {/* Row Header */}
            <div className="px-12 mb-4 flex items-center justify-between">
              <h2 className="text-white text-2xl font-bold" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                {row.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollRow(row.id, 'left')}
                  className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => scrollRow(row.id, 'right')}
                  className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Scrollable Row */}
            <div className="relative group">
              <div
                ref={(el) => (scrollRefs.current[row.id] = el)}
                className="flex gap-2 overflow-x-auto scrollbar-hide px-12 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {row.images.map((image, imageIndex) => (
                  <motion.div
                    key={image.id}
                    className="relative flex-shrink-0 cursor-pointer"
                    style={{ width: '300px', aspectRatio: '16/9' }}
                    whileHover={{ scale: 1.4, zIndex: 10 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => handleImageHover(image.id)}
                    onHoverEnd={() => handleImageHover(null)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover rounded-md"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredImage === image.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{image.description}</p>
                            <div className="flex items-center gap-2">
                              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Play className="w-4 h-4 text-black ml-0.5" />
                              </button>
                              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                                <ThumbsUp className="w-4 h-4 text-white" />
                              </button>
                              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors ml-auto">
                                <ChevronDown className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Chat Interface */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-black bg-opacity-90 backdrop-blur-md border-l border-gray-800 z-50"
            style={{ borderRadius: '16px 0 0 16px' }}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                Live Chat
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <AnimatePresence>
              {!chatMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 overflow-hidden"
                >
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <img
                          src={message.avatar}
                          alt={message.user}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{message.user}</span>
                            <span className="text-gray-400 text-xs">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                            {message.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                        style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setChatOpen(true);
            setUnreadCount(0);
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg z-40 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
};