import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send,  User, Loader2, Trash2, Info, Phone, Mail, Download, Share2, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../atoms/Button';
import { PawIcon } from '../atoms/PawIcon';
import { TypingIndicator } from '../atoms/TypingIndicator';
import { aiService } from '../../services/ai';
import { storageService, StoredMessage } from '../../services/storage';
import { SYSTEM_PROMPT, QUICK_REPLIES } from '../../config/chatbot';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply';
}

interface ChatbotProps {
  onError?: (error: Error) => void;
  initialMessage?: string;
  className?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ 
  onError,
  initialMessage = 'Hello! I\'m your Vugasu Kennels assistant. How can I help you today?',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = storageService.loadMessages();
    if (stored.length > 0) {
      return stored.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
    return [{
      id: '1',
      content: initialMessage,
      sender: 'bot',
      timestamp: new Date(),
    }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    // Save messages to storage whenever they change
    const storedMessages: StoredMessage[] = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }));
    storageService.saveMessages(storedMessages);
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);
    setShowQuickReplies(false);

    try {
      // Convert messages to AI service format
      const aiMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content,
        })),
        { role: 'user' as const, content: inputValue },
      ];

      const response = await aiService.chat(aiMessages);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred');
      setError(`Sorry, I encountered an error: ${error.message}. Please try again or contact us directly.`);
      console.error('Chat error:', error);
      onError?.(error);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping, messages, onError]);

  const handleQuickReply = useCallback((prompt: string) => {
    setInputValue(prompt);
    setShowQuickReplies(false);
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      storageService.clearMessages();
      setMessages([{
        id: '1',
        content: initialMessage,
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setShowQuickReplies(true);
    }
  }, [initialMessage]);

  const handleExportChat = useCallback(() => {
    const chatContent = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.content}\n${msg.timestamp.toLocaleString()}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vugasu-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages]);

  const handleShareChat = useCallback(async () => {
    try {
      const chatContent = messages.map(msg => 
        `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.content}`
      ).join('\n\n');
      
      await navigator.share({
        title: 'Vugasu Kennels Chat',
        text: chatContent,
      });
    } catch (err) {
      console.error('Error sharing chat:', err);
      onError?.(err instanceof Error ? err : new Error('Failed to share chat'));
    }
  }, [messages, onError]);

  const toggleQuickReplies = useCallback(() => {
    setShowQuickReplies(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const memoizedQuickReplies = useMemo(() => (
    <div className="px-4 py-2 bg-white border-t border-neutral-200">
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleQuickReply(reply.prompt)}
            className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
            aria-label={`Quick reply: ${reply.text}`}
          >
            {reply.text}
          </button>
        ))}
      </div>
    </div>
  ), [handleQuickReply]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary-700 transition-colors ${className}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        <PawIcon className="w-7 h-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '80px' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-neutral-200 transition-all duration-300"
            role="dialog"
            aria-label="Chat window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <PawIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Vugasu Assistant</h3>
                  <p className="text-xs text-primary-100">AI-Powered Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title={isMuted ? "Unmute notifications" : "Mute notifications"}
                  aria-label={isMuted ? "Unmute notifications" : "Mute notifications"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleExportChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Export chat history"
                  aria-label="Export chat history"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShareChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Share chat"
                  aria-label="Share chat"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Clear chat history"
                  aria-label="Clear chat history"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50" role="log" aria-label="Chat messages">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-neutral-800 shadow-sm border border-neutral-200'
                        }`}
                        role="article"
                        aria-label={`${message.sender === 'user' ? 'Your message' : 'Assistant message'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'bot' ? (
                            <PawIcon className="w-4 h-4 text-primary-600" />
                          ) : (
                            <User className="w-4 h-4 text-primary-100" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === 'bot' ? 'Vugasu Assistant' : 'You'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-200">
                        <div className="flex items-center gap-2">
                          <PawIcon className="w-4 h-4 text-primary-600" />
                          <span className="text-xs font-medium">Vugasu Assistant</span>
                        </div>
                        <TypingIndicator className="mt-2" />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex justify-start">
                      <div className="bg-red-50 text-red-600 rounded-2xl p-3 shadow-sm border border-red-100" role="alert">
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {showQuickReplies && memoizedQuickReplies}

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={isTyping}
                      aria-label="Message input"
                    />
                    <Button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className="min-w-[40px]"
                      aria-label={isTyping ? "Sending message..." : "Send message"}
                    >
                      {isTyping ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </form>

                {/* Contact Info */}
                <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <a href="tel:+1-555-123-4567" className="flex items-center gap-1 hover:text-primary-600" aria-label="Call us">
                      <Phone className="w-3 h-3" />
                      <span>Call Us</span>
                    </a>
                    <a href="mailto:contact@vugasu.com" className="flex items-center gap-1 hover:text-primary-600" aria-label="Email us">
                      <Mail className="w-3 h-3" />
                      <span>Email Us</span>
                    </a>
                  </div>
                  <button 
                    className="flex items-center gap-1 hover:text-primary-600"
                    onClick={toggleQuickReplies}
                    aria-label={showQuickReplies ? "Hide quick replies" : "Show quick replies"}
                  >
                    <Info className="w-3 h-3" />
                    <span>Quick Replies</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 