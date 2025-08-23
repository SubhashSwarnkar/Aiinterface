import { Check, Zap, Brain, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Model {
  id: string
  name: string
  description: string
  speed: 'fast' | 'medium' | 'slow'
  intelligence: 'high' | 'medium' | 'low'
  cost: 'low' | 'medium' | 'high'
  icon: React.ComponentType<{ size?: number }>
}

const models: Model[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model, best for complex reasoning',
    speed: 'slow',
    intelligence: 'high',
    cost: 'high',
    icon: Brain,
  },
  {
    id: 'gpt-3.5',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient, good for most tasks',
    speed: 'fast',
    intelligence: 'medium',
    cost: 'low',
    icon: Zap,
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Balanced performance and safety',
    speed: 'medium',
    intelligence: 'high',
    cost: 'medium',
    icon: Sparkles,
  },
  {
    id: 'copilot',
    name: 'copilot',
    description: 'Most capable model, best for complex reasoning',
    speed: 'slow',
    intelligence: 'high',
    cost: 'high',
    icon: Brain,
  },
]

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState('gpt-3.5')

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'fast': return 'text-purple-600'
      case 'medium': return 'text-blue-600'
      case 'slow': return 'text-purple-500'
      default: return 'text-slate-600'
    }
  }

  const getIntelligenceColor = (intelligence: string) => {
    switch (intelligence) {
      case 'high': return 'text-purple-600'
      case 'medium': return 'text-blue-600'
      case 'low': return 'text-purple-500'
      default: return 'text-slate-600'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
          Select AI Model
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Choose the model that best fits your needs
        </p>
      </motion.div>
      
      <div className="space-y-3">
        {models.map((model, index) => {
          const Icon = model.icon
          const isSelected = selectedModel === model.id
          
          return (
            <motion.button
              key={model.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.2 + index * 0.1, 
                duration: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedModel(model.id)}
              className={cn(
                "w-full p-4 rounded-lg border transition-all duration-200 text-left",
                isSelected
                  ? "border-transparent bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-purple-900/30 shadow-lg shadow-purple-500/10"
                  : "border-purple-200 dark:border-purple-600/60 hover:border-purple-300 dark:hover:border-purple-500 bg-white/95 dark:bg-slate-800/95"
              )}
            >
              <div className="flex items-start gap-3">
                <motion.div 
                  className={cn(
                    "p-2 rounded-lg",
                    isSelected ? "bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 dark:from-purple-800/50 dark:via-blue-800/50 dark:to-purple-800/50" : "bg-slate-100 dark:bg-slate-700/60"
                  )}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {model.name}
                    </h4>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check size={16} className="text-purple-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    {model.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <motion.span 
                      className={cn("flex items-center gap-1", getSpeedColor(model.speed))}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Zap size={12} />
                      {model.speed}
                    </motion.span>
                    <motion.span 
                      className={cn("flex items-center gap-1", getIntelligenceColor(model.intelligence))}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Brain size={12} />
                      {model.intelligence}
                    </motion.span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Cost: {model.cost}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
