import { useState } from 'react'
import { X, MessageSquare, History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModelSelector } from './ModelSelector'
import { ChatHistory } from './ChatHistory'
import { cn } from '../lib/utils'

interface SidebarProps {
  isMobileOpen: boolean
  onMobileClose: () => void
  currentConversationId: string | null
  onSelectConversation: (conversationId: string) => void
  onNewConversation: () => void
}

export function Sidebar({ isMobileOpen, onMobileClose, currentConversationId, onSelectConversation, onNewConversation }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'models'>('history')

  const tabs = [
    { id: 'history', label: 'History', icon: History },
    { id: 'models', label: 'Models', icon: MessageSquare },
  ] as const

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between p-6 border-b border-purple-200 dark:border-purple-600/60 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm"
      >
        <motion.h2 
          className="text-xl font-bold text-slate-900 dark:text-slate-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Configuration
        </motion.h2>
        {/* Mobile Close Button - Only visible on mobile */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMobileClose}
          className="lg:hidden p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-700/60 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-purple-900 dark:hover:text-purple-100"
        >
          <X size={20} />
        </motion.button>
      </motion.div>
      
      {/* Tabs */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex border-b border-purple-200 dark:border-purple-600/60 bg-gradient-to-r from-purple-50/50 via-blue-50/50 to-purple-50/50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-purple-900/10"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 py-4 px-4 text-sm font-medium transition-all duration-300 relative",
                isActive
                  ? "text-purple-600 bg-white dark:bg-slate-800 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-purple-900 dark:hover:text-purple-100 hover:bg-purple-50/50 dark:hover:bg-purple-800/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 rounded-t-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? [0, 10, -10, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
                }}
              >
                <Icon size={18} />
              </motion.div>
              <span className="font-semibold">{tab.label}</span>
            </motion.button>
          )
        })}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white via-purple-50/30 to-blue-50/30 dark:from-slate-800/90 dark:via-purple-900/10 dark:to-blue-900/10 backdrop-blur-sm min-h-0 custom-scrollbar max-h-[calc(100vh-200px)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30, y: -10 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 25
            }}
            className="h-full"
          >
            {activeTab === 'history' && (
              <ChatHistory 
                currentConversationId={currentConversationId}
                onSelectConversation={onSelectConversation}
                onNewConversation={onNewConversation}
              />
            )}
            {activeTab === 'models' && <ModelSelector />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Sidebar */}
      <motion.aside 
        initial={{ x: -400 }}
        animate={{ x: isMobileOpen ? 0 : -400 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4
        }}
        className="fixed lg:hidden inset-y-0 left-0 z-40 w-80 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 shadow-2xl"
      >
        {sidebarContent}
      </motion.aside>

      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:block w-80 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 shadow-lg flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  )
}
