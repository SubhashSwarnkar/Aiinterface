import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.5
      }}
      className={cn(
        "flex items-center gap-1 bg-white dark:bg-secondary-800 rounded-full p-1 shadow-lg border border-secondary-200 dark:border-secondary-700",
        className
      )}
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme('light')}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          theme === 'light'
            ? "bg-primary-100 text-primary-600"
            : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700"
        )}
        aria-label="Light mode"
      >
        <motion.div
          animate={{ 
            rotate: theme === 'light' ? [0, 360] : 0,
            scale: theme === 'light' ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.2 }
          }}
        >
          <Sun size={16} />
        </motion.div>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: -15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme('system')}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          theme === 'system'
            ? "bg-primary-100 text-primary-600"
            : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700"
        )}
        aria-label="System mode"
      >
        <motion.div
          animate={{ 
            rotate: theme === 'system' ? [0, 360] : 0,
            scale: theme === 'system' ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.2 }
          }}
        >
          <Monitor size={16} />
        </motion.div>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme('dark')}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          theme === 'dark'
            ? "bg-primary-100 text-primary-600"
            : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700"
        )}
        aria-label="Dark mode"
      >
        <motion.div
          animate={{ 
            rotate: theme === 'dark' ? [0, 360] : 0,
            scale: theme === 'dark' ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.2 }
          }}
        >
          <Moon size={16} />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
