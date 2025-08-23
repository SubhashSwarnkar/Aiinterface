import { useState } from 'react'
import { Info, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

interface Parameter {
  id: string
  name: string
  description: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
}

const parameters: Parameter[] = [
  {
    id: 'Usesess',
    name: 'Usesess',
    description: 'Controls randomness: 0 = focused, 1 = creative',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.7,
  },
  {
    id: 'maxTokens',
    name: 'Max Tokens',
    description: 'Maximum length of the response',
    min: 1,
    max: 4000,
    step: 1,
    defaultValue: 1000,
    unit: 'tokens',
  },
  {
    id: 'topP',
    name: 'Top P',
    description: 'Controls diversity via nucleus sampling',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.9,
  },
  {
    id: 'frequencyPenalty',
    name: 'Frequency Penalty',
    description: 'Reduces repetition of common phrases',
    min: -2,
    max: 2,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 'presencePenalty',
    name: 'Presence Penalty',
    description: 'Encourages new topics and ideas',
    min: -2,
    max: 2,
    step: 0.1,
    defaultValue: 0,
  },
]

export function ParameterPanel() {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    parameters.forEach(param => {
      initial[param.id] = param.defaultValue
    })
    return initial
  })

  const resetToDefaults = () => {
    const defaults: Record<string, number> = {}
    parameters.forEach(param => {
      defaults[param.id] = param.defaultValue
    })
    setValues(defaults)
  }

  const handleChange = (id: string, value: number) => {
    setValues(prev => ({ ...prev, [id]: value }))
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
        className="flex items-center justify-between"
      >
        <div>
          <h3 className="text-sm font-medium text-secondary-900 dark:text-white">
            AI Parameters
          </h3>
          <p className="text-xs text-secondary-600 dark:text-secondary-400">
            Fine-tune the AI's behavior
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={resetToDefaults}
          className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw size={16} />
        </motion.button>
      </motion.div>
      
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <motion.div 
            key={param.id} 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 0.2 + index * 0.1, 
              duration: 0.4,
              type: "spring",
              stiffness: 100
            }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-900 dark:text-white">
                {param.name}
              </label>
              <motion.span 
                key={values[param.id]}
                initial={{ scale: 1.2, color: "#3b82f6" }}
                animate={{ scale: 1, color: "inherit" }}
                transition={{ duration: 0.2 }}
                className="text-sm text-secondary-600 dark:text-secondary-400"
              >
                {values[param.id]}{param.unit && ` ${param.unit}`}
              </motion.span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={values[param.id]}
                onChange={(e) => handleChange(param.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </motion.div>
            
            <div className="flex items-center justify-between text-xs text-secondary-500">
              <span>{param.min}{param.unit && ` ${param.unit}`}</span>
              <span>{param.max}{param.unit && ` ${param.unit}`}</span>
            </div>
            
            <motion.div 
              className="flex items-start gap-2 text-xs text-secondary-600 dark:text-secondary-400"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Info size={12} className="mt-0.5 flex-shrink-0" />
              </motion.div>
              <p>{param.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
