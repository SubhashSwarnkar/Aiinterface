export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatConversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

const STORAGE_KEY = 'ai-chat-conversations'

// Static sample conversations for demonstration
const STATIC_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'static-1',
    title: 'How to learn React?',
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'How to learn React effectively? I\'m a beginner in web development.',
        timestamp: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'Great question! Here\'s a structured approach to learning React:\n\n1. **Master JavaScript fundamentals** first - ES6+, promises, async/await\n2. **Start with the official React tutorial** at react.dev\n3. **Build small projects** - todo app, weather app, etc.\n4. **Learn React hooks** - useState, useEffect, useContext\n5. **Practice with create-react-app** for quick setup\n6. **Join the React community** - follow React docs, blogs, and forums\n\nWould you like me to elaborate on any of these steps?',
        timestamp: new Date(Date.now() - 86400000 * 2 + 60000)
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Can you recommend some good practice projects for beginners?',
        timestamp: new Date(Date.now() - 86400000 * 2 + 120000)
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'Absolutely! Here are some excellent beginner projects:\n\n**Easy Level:**\n• Todo List with add/delete/complete functionality\n• Counter app with increment/decrement\n• Simple calculator\n\n**Intermediate Level:**\n• Weather app using a free API\n• Movie search app with TMDB API\n• Personal portfolio website\n• Simple blog with routing\n\n**Advanced Beginner:**\n• Shopping cart with local storage\n• Chat application\n• Expense tracker with charts\n\nStart with the easy ones and gradually move up!',
        timestamp: new Date(Date.now() - 86400000 * 2 + 180000)
      }
    ]
  },
  {
    id: 'static-2',
    title: 'JavaScript async/await explained',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000),
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'Can you explain async/await in JavaScript? I find promises confusing.',
        timestamp: new Date(Date.now() - 86400000)
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content: 'I\'d be happy to explain async/await! It\'s actually a cleaner way to work with promises.\n\n**Think of it this way:**\n• `async` = "This function will wait for something"\n• `await` = "Wait here until this promise finishes"\n\n**Basic example:**\n```javascript\n// Old way with promises\nfetch(\'api/data\')\n  .then(response => response.json())\n  .then(data => console.log(data))\n\n// New way with async/await\nasync function getData() {\n  const response = await fetch(\'api/data\')\n  const data = await response.json()\n  console.log(data)\n}\n```\n\nIt reads like normal code but handles asynchronous operations!',
        timestamp: new Date(Date.now() - 86400000 + 60000)
      }
    ]
  },
  {
    id: 'static-3',
    title: 'CSS Flexbox vs Grid',
    createdAt: new Date(Date.now() - 3600000 * 6), // 6 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 6),
    messages: [
      {
        id: 'msg-7',
        role: 'user',
        content: 'When should I use CSS Flexbox vs CSS Grid?',
        timestamp: new Date(Date.now() - 3600000 * 6)
      },
      {
        id: 'msg-8',
        role: 'assistant',
        content: '**Flexbox** is for **1-dimensional** layouts:\n• Navigation bars\n• Button groups\n• Centering items\n• Equal height columns\n\n**Grid** is for **2-dimensional** layouts:\n• Page layouts (header, sidebar, main, footer)\n• Card galleries\n• Complex responsive designs\n• Magazine-style layouts\n\n**Rule of thumb:**\n• Use Flexbox when arranging items in a single row/column\n• Use Grid when you need rows AND columns simultaneously\n\nThey work great together too! Grid for overall layout, Flexbox for component internals.',
        timestamp: new Date(Date.now() - 3600000 * 6 + 60000)
      }
    ]
  },
  {
    id: 'static-4',
    title: 'Best VS Code extensions for developers',
    createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 2),
    messages: [
      {
        id: 'msg-9',
        role: 'user',
        content: 'What are the best VS Code extensions for web development?',
        timestamp: new Date(Date.now() - 3600000 * 2)
      },
      {
        id: 'msg-10',
        role: 'assistant',
        content: 'Here are my top VS Code extensions for web development:\n\n**Essential:**\n• Prettier - Code formatter\n• ESLint - JavaScript linting\n• Auto Rename Tag - Sync HTML tag editing\n• Bracket Pair Colorizer - Color matching brackets\n\n**Productivity:**\n• Live Server - Local development server\n• GitLens - Enhanced Git capabilities\n• Path Intellisense - File path autocomplete\n• Thunder Client - API testing\n\n**Theme & UI:**\n• Material Icon Theme - Better file icons\n• One Dark Pro - Popular dark theme\n\n**Framework Specific:**\n• ES7+ React snippets - React code snippets\n• Vetur - Vue.js support\n\nThese will significantly boost your development productivity!',
        timestamp: new Date(Date.now() - 3600000 * 2 + 60000)
      }
    ]
  },
  {
    id: 'static-5',
    title: 'API design best practices',
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1800000),
    messages: [
      {
        id: 'msg-11',
        role: 'user',
        content: 'What are some best practices for designing REST APIs?',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: 'msg-12',
        role: 'assistant',
        content: 'Great question! Here are key REST API design principles:\n\n**URL Structure:**\n• Use nouns, not verbs: `/users` not `/getUsers`\n• Use HTTP methods: GET, POST, PUT, DELETE\n• Be consistent with naming\n\n**HTTP Status Codes:**\n• 200 - Success\n• 201 - Created\n• 400 - Bad Request\n• 401 - Unauthorized\n• 404 - Not Found\n• 500 - Server Error\n\n**Response Format:**\n• Always return JSON\n• Include metadata (pagination, counts)\n• Consistent error format\n\n**Security:**\n• Use HTTPS always\n• Implement authentication\n• Rate limiting\n• Input validation\n\n**Documentation:**\n• Use tools like Swagger/OpenAPI\n• Provide examples\n• Keep it updated\n\nWould you like me to dive deeper into any of these areas?',
        timestamp: new Date(Date.now() - 1800000 + 60000)
      }
    ]
  }
]

export class ChatStorage {
  static getAllConversations(): ChatConversation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      
      // If no stored conversations, return static ones and save them
      if (!stored) {
        this.initializeWithStaticConversations()
        return [...STATIC_CONVERSATIONS]
      }
      
      const conversations = JSON.parse(stored)
      return conversations.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
    } catch (error) {
      console.error('Error loading conversations:', error)
      return [...STATIC_CONVERSATIONS]
    }
  }

  private static initializeWithStaticConversations(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATIC_CONVERSATIONS))
    } catch (error) {
      console.error('Error initializing static conversations:', error)
    }
  }

  static saveConversation(conversation: ChatConversation): void {
    try {
      const conversations = this.getAllConversations()
      const existingIndex = conversations.findIndex(c => c.id === conversation.id)
      
      if (existingIndex !== -1) {
        conversations[existingIndex] = conversation
      } else {
        conversations.unshift(conversation) // Add new conversations at the beginning
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    } catch (error) {
      console.error('Error saving conversation:', error)
    }
  }

  static deleteConversation(conversationId: string): void {
    try {
      const conversations = this.getAllConversations()
      const filtered = conversations.filter(c => c.id !== conversationId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }

  static createNewConversation(firstMessage?: string): ChatConversation {
    const id = Date.now().toString()
    const title = firstMessage 
      ? firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '')
      : 'New Chat'
    
    return {
      id,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  static updateConversationTitle(conversationId: string, title: string): void {
    try {
      const conversations = this.getAllConversations()
      const conversation = conversations.find(c => c.id === conversationId)
      if (conversation) {
        conversation.title = title
        conversation.updatedAt = new Date()
        this.saveConversation(conversation)
      }
    } catch (error) {
      console.error('Error updating conversation title:', error)
    }
  }
}
