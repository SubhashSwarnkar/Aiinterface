import { motion } from 'framer-motion'
import { PromptEditor } from './PromptEditor'
import { ChatArea } from './ChatArea'
import type { ChatConversation } from '../lib/chatStorage'

interface MainContentProps {
  currentConversation: ChatConversation | null
  isLoading: boolean
  onSubmit: (prompt: string) => void
}

export function MainContent({ currentConversation, isLoading, onSubmit }: MainContentProps) {
  return (
    <motion.main 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 flex flex-col h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Mobile Layout: Sticky Input at Top + Scrollable Chat Below */}
      <div className="xl:hidden flex flex-col h-full">
        {/* Sticky PromptEditor at Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="sticky top-0 z-10 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-600/60 shadow-sm"
        >
          <PromptEditor onSubmit={onSubmit} isLoading={isLoading} />
        </motion.div>
        
        {/* Scrollable ChatArea Below */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4"
        >
          <ChatArea currentConversation={currentConversation} isLoading={isLoading} />
        </motion.div>
      </div>

      {/* Desktop Layout: Side by Side */}
      <div className="hidden xl:flex flex-1 flex-row min-h-0">
        {/* Prompt Editor Section - Takes remaining space on the left */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 p-6 xl:p-8 border-r border-gray-200 dark:border-slate-600/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm flex flex-col h-screen overflow-hidden shadow-sm"
        >
          <PromptEditor onSubmit={onSubmit} isLoading={isLoading} />
        </motion.div>
        
        {/* Chat Area Section - Fixed width on the right */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-96 2xl:w-[450px] p-6 xl:p-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm flex-shrink-0 flex flex-col min-h-0 overflow-hidden shadow-sm"
        >
          <ChatArea currentConversation={currentConversation} isLoading={isLoading} />
        </motion.div>
      </div>
    </motion.main>
  )
}
