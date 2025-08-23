import { useState, useEffect } from 'react'
import { MessageSquare, Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatStorage } from '../lib/chatStorage'
import type { ChatConversation } from '../lib/chatStorage'
import { cn } from '../lib/utils'

interface ChatHistoryProps {
  currentConversationId: string | null
  onSelectConversation: (conversationId: string) => void
  onNewConversation: () => void
}

export function ChatHistory({ currentConversationId, onSelectConversation, onNewConversation }: ChatHistoryProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = () => {
    const stored = ChatStorage.getAllConversations()
    setConversations(stored)
  }

  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    ChatStorage.deleteConversation(conversationId)
    loadConversations()
    
    // If deleting current conversation, create a new one
    if (conversationId === currentConversationId) {
      onNewConversation()
    }
  }

  const handleEditTitle = (conversation: ChatConversation, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(conversation.id)
    setEditTitle(conversation.title)
  }

  const handleSaveTitle = (conversationId: string) => {
    if (editTitle.trim()) {
      ChatStorage.updateConversationTitle(conversationId, editTitle.trim())
      loadConversations()
    }
    setEditingId(null)
    setEditTitle('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  const getConversationPreview = (conversation: ChatConversation) => {
    if (conversation.messages.length === 0) {
      return 'No messages yet'
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    return lastMessage.content.slice(0, 80) + (lastMessage.content.length > 80 ? '...' : '')
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Chat History
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewConversation}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-sm"
            title="New chat"
          >
            <Plus size={18} />
          </motion.button>
        </div>
                 <p className="text-sm text-slate-600 dark:text-slate-300">
           {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
         </p>
      </motion.div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-3 custom-scrollbar max-h-[calc(100vh-200px)]">
        <AnimatePresence>
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => onSelectConversation(conversation.id)}
              className={cn(
                "rounded-lg cursor-pointer transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10",
                currentConversationId === conversation.id
                  ? "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/25"
                  : "bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 dark:from-purple-600/60 dark:via-blue-600/60 dark:to-purple-600/60 p-0.5 hover:from-purple-300 hover:via-blue-300 hover:to-purple-300 dark:hover:from-purple-500/80 dark:hover:via-blue-500/80 dark:hover:to-purple-500/80"
              )}
            >
              <div className={cn(
                "p-4 rounded-lg transition-all duration-300",
                currentConversationId === conversation.id
                  ? "bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20"
                  : "bg-white/95 dark:bg-slate-800/95"
              )}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 dark:from-purple-700/80 dark:via-blue-700/80 dark:to-purple-700/80 rounded-full flex items-center justify-center">
                  <MessageSquare size={16} className="text-slate-600 dark:text-slate-300" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  {editingId === conversation.id ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveTitle(conversation.id)
                          if (e.key === 'Escape') handleCancelEdit()
                        }}
                        className="flex-1 text-sm font-medium bg-transparent border-b border-purple-500 focus:outline-none text-slate-900 dark:text-slate-100"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveTitle(conversation.id)
                        }}
                        className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                      >
                        <Check size={14} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCancelEdit()
                        }}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      >
                        <X size={14} />
                      </motion.button>
                    </div>
                  ) : (
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate mb-2">
                      {conversation.title}
                    </h3>
                  )}
                  
                  {/* Preview */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                    {getConversationPreview(conversation)}
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatRelativeTime(conversation.updatedAt)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleEditTitle(conversation, e)}
                                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-purple-900 dark:hover:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-700/60 rounded transition-all duration-200"
                    title="Edit title"
                  >
                    <Edit2 size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {conversations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center py-12 flex-1 flex flex-col justify-center"
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
               className="w-16 h-16 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 dark:from-purple-800/50 dark:via-blue-800/50 dark:to-purple-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
             >
               <MessageSquare size={32} className="text-purple-600 dark:text-purple-400" />
             </motion.div>
             <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
               No conversations yet
             </h3>
             <p className="text-slate-600 dark:text-slate-300 mb-4">
               Start a new chat to begin your conversation history
             </p>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={onNewConversation}
               className="mx-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25"
             >
               Start New Chat
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
