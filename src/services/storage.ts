const STORAGE_KEY = 'vugasu_chat_history';

export interface StoredMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const storageService = {
  saveMessages(messages: StoredMessage[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  loadMessages(): StoredMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  },

  clearMessages() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  },
}; 