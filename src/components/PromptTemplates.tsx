import { useState } from 'react'
import { Plus, Edit2, Trash2, Copy, Download } from 'lucide-react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Template {
  id: string
  name: string
  description: string
  prompt: string
  category: string
  createdAt: string
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Code Review Assistant',
    description: 'Get detailed code review with suggestions',
    prompt: 'Please review this code and provide detailed feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance improvements\n4. Security considerations\n\nCode:\n{code}',
    category: 'Development',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Creative Writing Helper',
    description: 'Generate creative story ideas and outlines',
    prompt: 'Help me create a creative story with:\n- Genre: {genre}\n- Main character: {character}\n- Setting: {setting}\n- Conflict: {conflict}\n\nPlease provide a detailed outline and opening scene.',
    category: 'Writing',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Business Plan Generator',
    description: 'Create comprehensive business plan outlines',
    prompt: 'Generate a business plan outline for a {business_type} business including:\n1. Executive Summary\n2. Market Analysis\n3. Marketing Strategy\n4. Financial Projections\n5. Risk Assessment',
    category: 'Business',
    createdAt: '2024-01-05',
  },
]

export function PromptTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleCopy = (template: Template) => {
    navigator.clipboard.writeText(template.prompt)
    // You could add a toast notification here
  }

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id))
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null)
    }
  }

  const categories = Array.from(new Set(templates.map(t => t.category)))

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Prompt Templates
          </h3>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Save and reuse your favorite prompts
          </p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl"
        >
          <Plus size={16} />
          New
        </motion.button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template List */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full whitespace-nowrap hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1, 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md",
                    selectedTemplate?.id === template.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                      : "border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600"
                  )}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-2">
                        {template.name}
                      </h4>
                      <p className="text-xs text-secondary-600 dark:text-secondary-400 mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded-full">
                          {template.category}
                        </span>
                        <span className="text-xs text-secondary-500">
                          {template.createdAt}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-3">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopy(template)
                        }}
                        className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                        title="Copy prompt"
                      >
                        <Copy size={14} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(template.id)
                        }}
                        className="p-2 text-secondary-600 hover:text-red-600 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                        title="Delete template"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Template Preview */}
        <AnimatePresence mode="wait">
          {selectedTemplate && (
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {selectedTemplate.name}
                </h4>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                  title="Edit template"
                >
                  <Edit2 size={16} />
                </motion.button>
              </div>
              
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                {selectedTemplate.description}
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-secondary-900 dark:text-white">
                  Prompt Template
                </label>
                <textarea
                  value={selectedTemplate.prompt}
                  readOnly={!isEditing}
                  className="w-full h-32 p-4 text-sm border border-secondary-200 dark:border-secondary-700 rounded-xl bg-secondary-50 dark:bg-secondary-800 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your prompt template..."
                />
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(selectedTemplate)}
                  className="bg-secondary-100 hover:bg-secondary-200 text-secondary-900 font-medium py-2 px-4 rounded-xl transition-colors duration-200 text-sm flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Copy size={14} />
                  Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary-100 hover:bg-secondary-200 text-secondary-900 font-medium py-2 px-4 rounded-xl transition-colors duration-200 text-sm flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Download size={14} />
                  Export
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
