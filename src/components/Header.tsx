import { Menu, Zap, Settings, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  onMobileMenuClick: () => void
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-600/60 sticky top-0 z-40 shadow-sm"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - Only visible on mobile */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            onClick={onMobileMenuClick}
            className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 lg:hidden"
            aria-label="Toggle mobile sidebar"
          >
            <Menu size={22} />
          </motion.button>
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/25"
            >
              <Zap className="text-white" size={28} />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 dark:from-purple-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent filter drop-shadow-sm"
            >
              AI Interface
            </motion.h1>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          {/* Theme Toggle */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </motion.button>
          
          {/* Settings Button */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            aria-label="Settings"
          >
            <Settings size={22} />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  )
}
