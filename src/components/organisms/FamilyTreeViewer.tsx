import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Award, Calendar, Info } from 'lucide-react';
import { FamilyTree, FamilyTreeNode } from '../../types';

// Mock family tree data
const mockFamilyTrees: Record<string, FamilyTree> = {
  'West German Working Line': {
    id: '1',
    bloodline: 'West German Working Line',
    sire: {
      id: 'sire-1',
      name: 'Champion Rex von Vugasu',
      gender: 'male',
      image: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
      bloodline: 'West German Working Line',
      achievements: ['Schutzhund III', 'Regional Champion', 'Breeding Survey'],
      status: 'breeding',
      age: 5,
      description: 'Exceptional working drive with perfect temperament. Multiple championship titles.',
      position: { x: 100, y: 50 },
      connections: ['dam-1'],
    },
    dam: {
      id: 'dam-1',
      name: 'Elite Luna von Vugasu',
      gender: 'female',
      image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
      bloodline: 'West German Working Line',
      achievements: ['IPO3', 'Breeding Survey', 'Health Tested'],
      status: 'breeding',
      age: 4,
      description: 'Outstanding female with excellent structure and proven producing ability.',
      position: { x: 400, y: 50 },
      connections: ['sire-1'],
    },
    offspring: [
      {
        id: 'pup-1',
        name: 'Ace von Vugasu',
        gender: 'male',
        image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
        bloodline: 'West German Working Line',
        achievements: ['Basic Training Complete'],
        status: 'available',
        price: 3500,
        age: 0.5,
        description: 'Promising young male with excellent drive and temperament.',
        position: { x: 100, y: 300 },
        connections: ['sire-1', 'dam-1'],
      },
      {
        id: 'pup-2',
        name: 'Bella von Vugasu',
        gender: 'female',
        image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
        bloodline: 'West German Working Line',
        achievements: ['Puppy Evaluation Excellent'],
        status: 'reserved',
        price: 3200,
        age: 0.5,
        description: 'Beautiful female with show potential and gentle nature.',
        position: { x: 250, y: 300 },
        connections: ['sire-1', 'dam-1'],
      },
      {
        id: 'pup-3',
        name: 'Thor von Vugasu',
        gender: 'male',
        image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
        bloodline: 'West German Working Line',
        achievements: ['Health Tested', 'Temperament Tested'],
        status: 'available',
        price: 3800,
        age: 0.5,
        description: 'Strong male with exceptional working potential.',
        position: { x: 400, y: 300 },
        connections: ['sire-1', 'dam-1'],
      },
    ],
  },
  'Czech Working Line': {
    id: '2',
    bloodline: 'Czech Working Line',
    sire: {
      id: 'sire-2',
      name: 'Warrior King von Vugasu',
      gender: 'male',
      image: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg',
      bloodline: 'Czech Working Line',
      achievements: ['IPO3', 'Athletic Champion', 'Breeding Approved'],
      status: 'breeding',
      age: 6,
      description: 'Athletic excellence with superior endurance and drive.',
      position: { x: 100, y: 50 },
      connections: ['dam-2'],
    },
    dam: {
      id: 'dam-2',
      name: 'Noble Queen von Vugasu',
      gender: 'female',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      bloodline: 'Czech Working Line',
      achievements: ['Working Dog Excellent', 'Health Certified'],
      status: 'breeding',
      age: 5,
      description: 'Proven producer with excellent working ability and structure.',
      position: { x: 400, y: 50 },
      connections: ['sire-2'],
    },
    offspring: [
      {
        id: 'pup-4',
        name: 'Storm von Vugasu',
        gender: 'male',
        image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg',
        bloodline: 'Czech Working Line',
        achievements: ['Early Training Started'],
        status: 'available',
        price: 3300,
        age: 0.3,
        description: 'Energetic male with natural athletic ability.',
        position: { x: 175, y: 300 },
        connections: ['sire-2', 'dam-2'],
      },
      {
        id: 'pup-5',
        name: 'Zara von Vugasu',
        gender: 'female',
        image: 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg',
        bloodline: 'Czech Working Line',
        achievements: ['Health Screened'],
        status: 'available',
        price: 3100,
        age: 0.3,
        description: 'Intelligent female with balanced temperament.',
        position: { x: 325, y: 300 },
        connections: ['sire-2', 'dam-2'],
      },
    ],
  },
};

interface FamilyTreeViewerProps {
  bloodline: string;
  onClose: () => void;
}

interface TooltipProps {
  node: FamilyTreeNode;
  position: { x: number; y: number };
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ node, position, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed z-50 bg-white rounded-xl shadow-2xl border border-shepherd-beige/20 p-6 max-w-sm"
      style={{
        left: Math.min(position.x, window.innerWidth - 400),
        top: Math.min(position.y, window.innerHeight - 300),
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4 mb-4">
        <img
          src={node.image}
          alt={node.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-bold text-shepherd-black text-lg">{node.name}</h3>
          <p className="text-shepherd-brown text-sm">{node.bloodline}</p>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4 text-shepherd-tan" />
            <span className="text-sm text-neutral-600">{node.age} years</span>
          </div>
        </div>
      </div>

      <p className="text-neutral-700 text-sm mb-4">{node.description}</p>

      {node.achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-shepherd-black mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-shepherd-tan" />
            Achievements
          </h4>
          <ul className="space-y-1">
            {node.achievements.map((achievement, index) => (
              <li key={index} className="text-sm text-neutral-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-shepherd-tan rounded-full" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            node.status === 'available' ? 'bg-green-500' :
            node.status === 'reserved' ? 'bg-yellow-500' :
            node.status === 'breeding' ? 'bg-blue-500' : 'bg-red-500'
          }`} />
          <span className="text-sm font-medium capitalize text-shepherd-black">
            {node.status}
          </span>
        </div>
        {node.price && (
          <span className="font-bold text-shepherd-brown">
            ${node.price.toLocaleString()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const FamilyTreeViewer: React.FC<FamilyTreeViewerProps> = ({
  bloodline,
  onClose,
}) => {
  const [hoveredNode, setHoveredNode] = useState<FamilyTreeNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const familyTree = mockFamilyTrees[bloodline];

  if (!familyTree) {
    return null;
  }

  const handleNodeHover = (node: FamilyTreeNode, event: React.MouseEvent) => {
    setHoveredNode(node);
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
  };

  const renderConnection = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    
    return (
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        d={`M ${from.x + 50} ${from.y + 50} Q ${midX} ${midY - 30} ${to.x + 50} ${to.y + 50}`}
        stroke="#C4A484"
        strokeWidth="2"
        fill="none"
        className="drop-shadow-sm"
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-shepherd-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-shepherd-beige to-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-shepherd-brown text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{familyTree.bloodline}</h2>
            <p className="text-shepherd-beige">Family Tree & Available Puppies</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Family Tree */}
        <div className="p-8 overflow-auto">
          <div className="relative min-h-[500px]" style={{ width: '800px', margin: '0 auto' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Sire to Dam connection */}
              {renderConnection(
                familyTree.sire.position,
                familyTree.dam.position
              )}
              
              {/* Parent to offspring connections */}
              {familyTree.offspring.map((offspring) => (
                <g key={`connections-${offspring.id}`}>
                  {renderConnection(
                    familyTree.sire.position,
                    offspring.position
                  )}
                  {renderConnection(
                    familyTree.dam.position,
                    offspring.position
                  )}
                </g>
              ))}
            </svg>

            {/* Sire */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute"
              style={{
                left: familyTree.sire.position.x,
                top: familyTree.sire.position.y,
              }}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={(e) => handleNodeHover(familyTree.sire, e)}
                onMouseLeave={handleNodeLeave}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-shepherd-brown shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={familyTree.sire.image}
                    alt={familyTree.sire.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="font-semibold text-shepherd-black text-sm whitespace-nowrap">
                    {familyTree.sire.name}
                  </p>
                  <p className="text-xs text-shepherd-brown">Sire</p>
                </div>
              </div>
            </motion.div>

            {/* Dam */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute"
              style={{
                left: familyTree.dam.position.x,
                top: familyTree.dam.position.y,
              }}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={(e) => handleNodeHover(familyTree.dam, e)}
                onMouseLeave={handleNodeLeave}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-shepherd-brown shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={familyTree.dam.image}
                    alt={familyTree.dam.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="font-semibold text-shepherd-black text-sm whitespace-nowrap">
                    {familyTree.dam.name}
                  </p>
                  <p className="text-xs text-shepherd-brown">Dam</p>
                </div>
              </div>
            </motion.div>

            {/* Offspring */}
            {familyTree.offspring.map((offspring, index) => (
              <motion.div
                key={offspring.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="absolute"
                style={{
                  left: offspring.position.x,
                  top: offspring.position.y,
                }}
              >
                <div
                  className={`relative group cursor-pointer ${
                    offspring.status === 'available' ? 'animate-glow' : ''
                  }`}
                  onMouseEnter={(e) => handleNodeHover(offspring, e)}
                  onMouseLeave={handleNodeLeave}
                >
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-4 shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                    offspring.status === 'available' 
                      ? 'border-shepherd-tan shadow-shepherd-tan/30' 
                      : offspring.status === 'reserved'
                      ? 'border-yellow-500'
                      : 'border-shepherd-brown'
                  }`}>
                    <img
                      src={offspring.image}
                      alt={offspring.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                    offspring.status === 'available' ? 'bg-green-500' :
                    offspring.status === 'reserved' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {offspring.status === 'available' && <Heart className="w-3 h-3 text-white" />}
                    {offspring.status === 'reserved' && <Info className="w-3 h-3 text-white" />}
                  </div>

                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="font-semibold text-shepherd-black text-sm whitespace-nowrap">
                      {offspring.name}
                    </p>
                    <p className="text-xs text-shepherd-brown capitalize">
                      {offspring.status}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 bg-white/50 rounded-lg p-4">
            <h3 className="font-semibold text-shepherd-black mb-3">Legend</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Breeding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-shepherd-tan rounded-full animate-glow"></div>
                <span>Available with glow effect</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredNode && (
          <Tooltip
            node={hoveredNode}
            position={tooltipPosition}
            onClose={() => setHoveredNode(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};