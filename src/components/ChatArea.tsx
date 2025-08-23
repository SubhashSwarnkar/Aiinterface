import { useState, useEffect, useRef } from 'react'
import { Copy, Download, User, Bot, ThumbsUp, ThumbsDown, RotateCcw, MoreVertical } from 'lucide-react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatConversation, ChatMessage } from '../lib/chatStorage'

interface ChatAreaProps {
  currentConversation: ChatConversation | null
  isLoading: boolean
}

const mockResponses = [
  "I'd be happy to help you with that! Based on your prompt, here are some key insights and recommendations that should address your needs effectively. Let me break this down into actionable steps that you can implement right away.",
  "That's an interesting question that touches on several important concepts. Let me provide you with a comprehensive analysis that covers the theoretical background, practical applications, and best practices in this area.",
  "Great prompt! I can see you're looking for detailed guidance on this topic. Here's what I recommend based on current best practices and industry standards. This approach has been proven effective in similar scenarios.",
  "I understand what you're asking for, and this is definitely something I can help with. Let me provide you with a structured response that covers all the key points you need to consider for your specific situation.",
  "Excellent question! This is a complex topic that requires careful consideration of multiple factors. Here's my analysis based on the latest research and practical experience in this field."
]

export function ChatArea({ currentConversation, isLoading }: ChatAreaProps) {
  const [currentResponse, setCurrentResponse] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = currentConversation?.messages || []

  // Auto-scroll to bottom when messages change or loading state changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (isLoading) {
      // Simulate streaming response
      let currentText = ''
      const fullResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      const interval = setInterval(() => {
        if (currentText.length < fullResponse.length) {
          currentText = fullResponse.slice(0, currentText.length + 10)
          setCurrentResponse(currentText)
        } else {
          clearInterval(interval)
          setCurrentResponse('')
        }
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const handleDownload = (messages: ChatMessage[]) => {
    const dataStr = JSON.stringify(messages, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `chat-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getMessageIcon = (role: 'user' | 'assistant') => {
    if (role === 'user') {
      return <User size={20} className="text-slate-600 dark:text-slate-300" />
    }
    return <Bot size={20} className="text-emerald-600 dark:text-emerald-400" />
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col min-h-0"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between mb-4 xl:mb-6"
      >
        <div>
          <h2 className="text-lg xl:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 xl:mb-2">
            {currentConversation?.title || 'New Chat'}
          </h2>
          <p className="text-xs xl:text-sm text-slate-600 dark:text-slate-300">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <AnimatePresence>
          {messages.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload(messages)}
              className="bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 dark:from-slate-700/80 dark:to-slate-600/80 dark:hover:from-slate-600 dark:hover:to-slate-500 text-slate-700 dark:text-slate-300 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all duration-200 text-xs xl:text-sm flex items-center gap-1.5 xl:gap-2 shadow-sm"
            >
              <Download size={14} className="xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Export</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.4,
                type: "spring",
                stiffness: 100
              }}
              className={cn(
                "flex gap-4",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {/* User Message */}
              {message.role === 'user' && (
                <motion.div 
                  className="max-w-[80%] bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-2xl rounded-br-md shadow-lg shadow-indigo-500/25"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                </motion.div>
              )}
              
              {/* AI Message */}
              {message.role === 'assistant' && (
                <div className="flex gap-4 max-w-[80%]">
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getMessageIcon(message.role)}
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 rounded-2xl rounded-bl-md shadow-lg border border-slate-200 dark:border-slate-600/60"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-sm text-slate-900 dark:text-slate-100 whitespace-pre-wrap mb-3">
                      {message.content}
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(message.content)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded transition-all duration-200"
                        title="Copy message"
                      >
                        <Copy size={14} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded transition-all duration-200"
                        title="Thumbs up"
                      >
                        <ThumbsUp size={14} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded transition-all duration-200"
                        title="Thumbs down"
                      >
                        <ThumbsDown size={14} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded transition-all duration-200"
                        title="Regenerate"
                      >
                        <RotateCcw size={14} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded transition-all duration-200"
                        title="More options"
                      >
                        <MoreVertical size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
                 {/* Loading indicator */}
         <AnimatePresence>
           {isLoading && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="flex gap-4 max-w-[80%]"
             >
               <motion.div 
                 className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center"
                 animate={{ rotate: [0, 360] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               >
                 <Bot size={20} className="text-emerald-600 dark:text-emerald-400" />
               </motion.div>
               
               <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 rounded-2xl rounded-bl-md shadow-lg border border-slate-200 dark:border-slate-600/60">
                 <div className="text-sm text-slate-900 dark:text-slate-100 mb-3">
                   {currentResponse}
                                                            <motion.span 
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ duration: 1, repeat: Infinity }}
                       className="inline-block w-2 h-4 bg-slate-400 dark:bg-slate-500 ml-1"
                     />
                 </div>
               </div>
             </motion.div>
           )}
         </AnimatePresence>
         
                   {/* Invisible div for auto-scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      
      {/* Empty state */}
      <AnimatePresence>
        {messages.length === 0 && !isLoading && (
                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.4 }}
                           className="text-center py-8 xl:py-12 h-full flex flex-col justify-center"
           >
                         <motion.div
               animate={{ 
                 y: [0, -10, 0],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ 
                 duration: 3, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="w-12 h-12 xl:w-16 xl:h-16 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/80 dark:to-slate-700/80 rounded-full flex items-center justify-center mx-auto mb-4 xl:mb-6 shadow-lg"
             >
               <Bot size={24} className="xl:w-8 xl:h-8 text-slate-400 dark:text-slate-300" />
             </motion.div>
             <h3 className="text-base xl:text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
               Start a conversation
             </h3>
             <p className="text-sm xl:text-base text-slate-600 dark:text-slate-300">
               Write a message to begin chatting with the AI
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
