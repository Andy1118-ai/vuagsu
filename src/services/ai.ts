/// <reference types="node" />

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class AIService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get response from AI service');
    }
  }
}

export const aiService = new AIService(); 