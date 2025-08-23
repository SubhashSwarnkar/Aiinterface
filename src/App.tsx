import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'

import { ChatStorage } from './lib/chatStorage'
import type { ChatConversation, ChatMessage } from './lib/chatStorage'
import './App.css'

// Wrapper component to access theme context
function AppContent({ 
  isLoading, 
  mobileSidebarOpen, 
  currentConversation, 
  conversations,
  toggleMobileSidebar,
  closeMobileSidebar,
  selectConversation,
  createNewConversation,
  handleSubmit
}: {
  isLoading: boolean
  mobileSidebarOpen: boolean
  currentConversation: ChatConversation | null
  conversations: ChatConversation[]
  toggleMobileSidebar: () => void
  closeMobileSidebar: () => void
  selectConversation: (conversationId: string) => void
  createNewConversation: () => void
  handleSubmit: (promptText: string) => Promise<void>
}) {
  const { isTransitioning } = useTheme()
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col transition-all duration-1000 ease-in-out overflow-hidden">
      {/* Theme Transition Overlay - Magical Ripple Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Main Ripple Layer */}
            <motion.div
              initial={{ 
                scale: 0,
                opacity: 0.8,
                borderRadius: '50%',
                x: '50%',
                y: '50%'
              }}
              animate={{ 
                scale: 4,
                opacity: 1,
                borderRadius: '0%',
                x: '0%',
                y: '0%'
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
                borderRadius: '50%',
                x: '50%',
                y: '50%'
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeInOut"
              }}
              className="fixed inset-0 bg-white dark:bg-slate-900 z-50 pointer-events-none origin-center"
              style={{
                transformOrigin: 'center center'
              }}
            />
            
            {/* Glow Effect Layer */}
            <motion.div
              initial={{ 
                scale: 0,
                opacity: 0,
                borderRadius: '50%',
                x: '50%',
                y: '50%'
              }}
              animate={{ 
                scale: 3.5,
                opacity: 0.3,
                borderRadius: '0%',
                x: '0%',
                y: '0%'
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
                borderRadius: '50%',
                x: '50%',
                y: '50%'
              }}
              transition={{ 
                duration: 1.4,
                ease: "easeInOut",
                delay: 0.1
              }}
              className="fixed inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20 dark:from-purple-600/20 dark:via-blue-600/20 dark:to-purple-600/20 z-40 pointer-events-none origin-center backdrop-blur-sm"
              style={{
                transformOrigin: 'center center'
              }}
            />
            
            {/* Particle Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-30 pointer-events-none"
            >
              {/* Animated particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    scale: 0,
                    opacity: 0,
                    x: '50%',
                    y: '50%'
                  }}
                  animate={{ 
                    scale: 1,
                    opacity: [0, 1, 0],
                    x: `${50 + (Math.cos(i * 45 * Math.PI / 180) * 100)}%`,
                    y: `${50 + (Math.sin(i * 45 * Math.PI / 180) * 100)}%`
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                                     className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300 rounded-full shadow-lg"
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <Header onMobileMenuClick={toggleMobileSidebar} />
      
      {/* Main Layout */}
      <div className="flex relative flex-1 overflow-hidden min-h-0">
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <Sidebar 
          isMobileOpen={mobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
          currentConversationId={currentConversation?.id || null}
          onSelectConversation={selectConversation}
          onNewConversation={createNewConversation}
        />
        
        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <MainContent 
            currentConversation={currentConversation}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null)
  const [conversations, setConversations] = useState<ChatConversation[]>([])

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = () => {
    const stored = ChatStorage.getAllConversations()
    setConversations(stored)
    
    // If no current conversation, select the most recent one or create a new one
    if (!currentConversation) {
      if (stored.length > 0) {
        // Sort conversations by updatedAt to get the most recent one
        const sortedConversations = [...stored].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        setCurrentConversation(sortedConversations[0])
      } else {
        createNewConversation()
      }
    }
  }

  const createNewConversation = () => {
    const newConversation = ChatStorage.createNewConversation()
    ChatStorage.saveConversation(newConversation)
    setCurrentConversation(newConversation)
    loadConversations()
  }

  const selectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId)
    if (conversation) {
      setCurrentConversation(conversation)
    }
  }

  const handleSubmit = async (promptText: string) => {
    if (!currentConversation) return

    setIsLoading(true)
    
    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      timestamp: new Date()
    }

    // Update conversation with user message
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      updatedAt: new Date(),
      // Update title if this is the first message
      title: currentConversation.messages.length === 0 
        ? promptText.slice(0, 50) + (promptText.length > 50 ? '...' : '')
        : currentConversation.title
    }

    setCurrentConversation(updatedConversation)
    ChatStorage.saveConversation(updatedConversation)

    // Simulate API call for AI response
    setTimeout(() => {
      const mockResponses = [
        "I'd be happy to help you with that! Based on your prompt, here are some key insights and recommendations that should address your needs effectively. Let me break this down into actionable steps that you can implement right away.",
        "That's an interesting question that touches on several important concepts. Let me provide you with a comprehensive analysis that covers the theoretical background, practical applications, and best practices in this area.",
        "Great prompt! I can see you're looking for detailed guidance on this topic. Here's what I recommend based on current best practices and industry standards. This approach has been proven effective in similar scenarios.",
        "I understand what you're asking for, and this is definitely something I can help with. Let me provide you with a structured response that covers all the key points you need to consider for your specific situation.",
        "Excellent question! This is a complex topic that requires careful consideration of multiple factors. Here's my analysis based on the latest research and practical experience in this field."
      ]

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date()
      }

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date()
      }

      setCurrentConversation(finalConversation)
      ChatStorage.saveConversation(finalConversation)
      loadConversations()
      setIsLoading(false)
    }, 2000)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  return (
    <ThemeProvider>
      <AppContent 
        isLoading={isLoading}
        mobileSidebarOpen={mobileSidebarOpen}
        currentConversation={currentConversation}
        conversations={conversations}
        toggleMobileSidebar={toggleMobileSidebar}
        closeMobileSidebar={closeMobileSidebar}
        selectConversation={selectConversation}
        createNewConversation={createNewConversation}
        handleSubmit={handleSubmit}
      />
    </ThemeProvider>
  )
}

export default App
