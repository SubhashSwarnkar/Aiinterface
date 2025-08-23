import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AIStats } from './AIStats'

interface PromptEditorProps {
  onSubmit: (prompt: string) => void
  isLoading: boolean
}

export function PromptEditor({ onSubmit, isLoading }: PromptEditorProps) {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showModelSettings, setShowModelSettings] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gemini-pro')
  const [maxTokens, setMaxTokens] = useState(2048)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [prompt])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim())
      setPrompt('')
    }
  }

  const handleMaxTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxTokens(parseInt(e.target.value))
  }

  return (
    <div className="flex flex-col">
      {/* Mobile: Compact Input */}
      <div className="xl:hidden w-full p-4">
        <div className="w-full">
          {/* Compact Input Area for Mobile */}
    <motion.div 
                  className={`relative w-full rounded-xl border-2 transition-all duration-300 ${
                    isFocused
                      ? 'border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/25'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
                              {/* Input Container */}
                  <div className={`p-3 backdrop-blur-sm rounded-xl ${
                    isFocused 
                      ? 'bg-purple-50/80 dark:bg-purple-900/10'
                      : 'bg-purple-50/50 dark:bg-slate-800/90'
                  }`}>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type your message here..."
                className="w-full min-h-[60px] max-h-[120px] p-0 text-base border-none bg-transparent resize-none focus:outline-none focus:ring-0 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
                style={{ fontFamily: 'inherit' }}
                disabled={isLoading}
              />
            </div>

            {/* Compact Action Bar for Mobile */}
            <div className={`px-3 py-2 backdrop-blur-sm border-t border-gray-200 dark:border-slate-600/60 rounded-b-xl ${
              isFocused
                ? 'bg-purple-50/80 dark:from-slate-800/80 dark:to-slate-700/80'
                : 'bg-purple-50/50 dark:from-slate-800/80 dark:to-slate-700/80'
            }`}>
            <div className="flex items-center justify-between">
                {/* Left Side - Tools */}
                <div className="flex items-center gap-2">
              <motion.button
                    type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                    title="Attach file"
                  >
                    <Paperclip size={16} />
                  </motion.button>
        <motion.button
                    type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModelSettings(!showModelSettings)}
                    className={`px-2 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                      showModelSettings
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400'
                        : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    }`}
                    title="Toggle model settings"
                  >
                    <div className="w-3 h-3 border-2 border-current rounded-full relative">
                      <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-current transform -translate-x-1/2"></div>
                      <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-current"></div>
                    </div>
                    <span className="text-xs font-medium">Tools</span>
        </motion.button>
        <motion.button
                    type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                    title="Voice input"
        >
                    <Mic size={16} />
        </motion.button>
                </div>
        
                {/* Right Side - Submit Button */}
        <motion.button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border ${
                    prompt.trim() && !isLoading
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 border-purple-400'
                      : 'bg-purple-200/50 dark:bg-purple-800/30 text-purple-400 dark:text-purple-500 border-purple-300 dark:border-purple-700/50 cursor-not-allowed'
                  }`}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span className="text-sm">...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span className="text-sm">Send</span>
                    </>
                  )}
        </motion.button>
              </div>
            </div>
      </motion.div>
        </div>
      </div>

      {/* Desktop: Centered Layout with Stats */}
      <div className="hidden xl:flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-8">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          {/* Main Input Section */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full">
              {/* Large Input Area */}
              <motion.div
                className={`relative w-full rounded-2xl border-2 transition-all duration-300 ${
                  isFocused
                    ? 'border-transparent bg-gradient-to-r from-purple-500 to-purple-600 p-0.5 shadow-2xl shadow-purple-400/30 dark:shadow-purple-300/20'
                    : 'border-gray-300 dark:border-purple-800/30 hover:border-gray-400 dark:hover:border-purple-700/50'
                }`}
                animate={{
                  scale: isFocused ? 1.01 : 1,
                  boxShadow: isFocused ? '0 25px 50px -12px rgba(59, 130, 246, 0.25)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Input Container */}
                <div className={`p-6 backdrop-blur-sm rounded-t-2xl ${
                  isFocused 
                    ? 'bg-purple-50/80 dark:bg-purple-800/20'
                    : 'bg-purple-50/50 dark:bg-purple-800/20'
                }`}>
                  {/* Placeholder Text */}
                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Type your message here..."
                    className="w-full min-h-[120px] p-0 text-lg border-none bg-transparent resize-none focus:outline-none focus:ring-0 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
                    style={{ fontFamily: 'inherit' }}
                    disabled={isLoading}
                  />
                </div>
                
                {/* Bottom Action Bar */}
                <div className={`px-6 py-4 backdrop-blur-sm border-t border-gray-200 dark:border-purple-800/30 rounded-b-2xl ${
                    isFocused
                      ? 'bg-purple-50/80 dark:bg-purple-800/20'
                      : 'bg-purple-50/50 dark:bg-purple-800/20'
                  }`}>
                  <div className="flex items-center justify-between">
                    {/* Left Side - Tools */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                        title="Attach file"
                      >
                        <Paperclip size={18} />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModelSettings(!showModelSettings)}
                        className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          showModelSettings
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400'
                            : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                        title="Toggle model settings"
                      >
                        <div className="w-4 h-4 border-2 border-current rounded-full relative">
                          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-current transform -translate-x-1/2"></div>
                          <div className="absolute top-1/2 left-0 w-1 h-0.5 bg-current"></div>
                        </div>
                        <span className="text-sm font-medium">Tools</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-all duration-200"
                        title="Voice input"
                      >
                        <Mic size={18} />
                      </motion.button>
                    </div>

                    {/* Right Side - Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={!prompt.trim() || isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border ${
                        prompt.trim() && !isLoading
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 border-purple-400'
                          : 'bg-purple-200/50 dark:bg-purple-800/30 text-purple-400 dark:text-purple-500 border-purple-300 dark:border-purple-700/50 cursor-not-allowed'
                      }`}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Model and Parameters Selection */}
              <AnimatePresence>
                {showModelSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full mt-8 overflow-hidden max-h-96"
                  >
                    <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600/60 p-4 overflow-y-auto custom-scrollbar max-h-80">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Model Settings
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowModelSettings(false)}
                          className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-all duration-200"
                          title="Close settings"
                        >
                          <Settings size={18} />
                        </motion.button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Model Selection */}
                        <div className="md:col-span-2 space-y-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Model Selection
                          </label>
                          <div className="relative">
                            <select
                              value={selectedModel}
                              onChange={(e) => setSelectedModel(e.target.value)}
                              className="w-full appearance-none pl-12 pr-10 py-4 bg-white dark:bg-slate-800/90 border-2 border-purple-100 dark:border-purple-800/30 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            >
                              <option value="gemini-pro" className="flex items-center gap-2 py-2">
                                Gemini Pro - Fastest text model with enhanced reasoning
                              </option>
                              <option value="gemini-pro-vision" className="flex items-center gap-2 py-2">
                                Gemini Pro Vision - Best for images & visual tasks
                              </option>
                              <option value="gemini-flash" className="flex items-center gap-2 py-2">
                                Gemini Flash - Quick responses & real-time chat
                              </option>
                            </select>
                            {/* Model Icons */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              {selectedModel === 'gemini-pro' && (
                                <div className="w-5 h-5 text-purple-500">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="8" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                </div>
                              )}
                              {selectedModel === 'gemini-pro-vision' && (
                                <div className="w-5 h-5 text-purple-500">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M3 12h.01M12 3v.01M21 12h.01M12 21v.01M18.5 5.5l.01.01M18.5 18.5l.01.01M5.5 5.5l.01.01M5.5 18.5l.01.01" strokeLinecap="round" />
                                  </svg>
                                </div>
                              )}
                              {selectedModel === 'gemini-flash' && (
                                <div className="w-5 h-5 text-purple-500">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {/* Dropdown Arrow */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            
                            {/* Selected Badge */}
                            <div className="absolute right-12 top-1/2 -translate-y-1/2">
                              <span className="px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                Selected
                              </span>
                            </div>
                          </div>
                          
                          {/* Model Description */}
                          <div className="text-sm text-slate-600 dark:text-slate-400 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-100/50 dark:border-purple-800/30">
                            {selectedModel === 'gemini-pro' && (
                              "Optimized for text conversations with enhanced reasoning capabilities. Best for general use."
                            )}
                            {selectedModel === 'gemini-pro-vision' && (
                              "Specialized in understanding and analyzing images alongside text. Perfect for visual tasks."
                            )}
                            {selectedModel === 'gemini-flash' && (
                              "Streamlined for quick responses and real-time interactions. Ideal for fast-paced conversations."
                            )}
                          </div>
                        </div>

                        {/* Token Usage */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Token Usage
                          </label>
                          <div className="flex flex-col gap-3">
                            <div className="relative w-full h-4 bg-purple-100/50 dark:bg-purple-900/20 rounded-full overflow-hidden">
                              <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                                style={{ width: `${(maxTokens / 8192) * 100}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex flex-col">
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{maxTokens.toLocaleString()} tokens</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Currently Using</span>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                  {8192 - maxTokens} tokens remaining
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Max Tokens */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Maximum Length
                          </label>
                          <div className="flex flex-col gap-2">
                            <input
                              type="number"
                              min="100"
                              max="8192"
                              value={maxTokens}
                              onChange={handleMaxTokensChange}
                              className="w-full px-4 py-3 border-2 border-purple-100 dark:border-purple-800/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 backdrop-blur-sm"
                            />
                            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                              <span>Short ({Math.round(maxTokens / 8192 * 100)}% of max)</span>
                              <span>8,192 tokens max</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* AI Stats Section */}
          <div className='w-full'><AIStats /></div>
        </div>
      </div>

      {/* Mobile Model Settings */}
      <AnimatePresence>
        {showModelSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden w-full bg-white dark:bg-slate-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-slate-600/60 p-4"
          >
            <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600/60 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Model Settings
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModelSettings(false)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-all duration-200"
                  title="Close settings"
                >
                  <Settings size={18} />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                {/* Model Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Model Selection
                  </label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full appearance-none pl-10 pr-10 py-3 bg-white dark:bg-slate-800/90 border-2 border-purple-100 dark:border-purple-800/30 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
                    >
                      <option value="gemini-pro" className="flex items-center gap-2 py-2">
                        Gemini Pro - Fastest text model with enhanced reasoning
                      </option>
                      <option value="gemini-pro-vision" className="flex items-center gap-2 py-2">
                        Gemini Pro Vision - Best for images & visual tasks
                      </option>
                      <option value="gemini-flash" className="flex items-center gap-2 py-2">
                        Gemini Flash - Quick responses & real-time chat
                      </option>
                    </select>
                    {/* Model Icons */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      {selectedModel === 'gemini-pro' && (
                        <div className="w-4 h-4 text-purple-500">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="8" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                      )}
                      {selectedModel === 'gemini-pro-vision' && (
                        <div className="w-4 h-4 text-purple-500">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M3 12h.01M12 3v.01M21 12h.01M12 21v.01M18.5 5.5l.01.01M18.5 18.5l.01.01M5.5 5.5l.01.01M5.5 18.5l.01.01" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                      {selectedModel === 'gemini-flash' && (
                        <div className="w-4 h-4 text-purple-500">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Dropdown Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Model Description */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-100/50 dark:border-purple-800/30">
                    {selectedModel === 'gemini-pro' && (
                      "Optimized for text conversations with enhanced reasoning capabilities. Best for general use."
                    )}
                    {selectedModel === 'gemini-pro-vision' && (
                      "Specialized in understanding and analyzing images alongside text. Perfect for visual tasks."
                    )}
                    {selectedModel === 'gemini-flash' && (
                      "Streamlined for quick responses and real-time interactions. Ideal for fast-paced conversations."
                    )}
                  </div>
                </div>

                {/* Token Usage */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Token Usage
                  </label>
                  <div className="flex flex-col gap-3">
                    <div className="relative w-full h-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                        style={{ width: `${(maxTokens / 8192) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{maxTokens.toLocaleString()} tokens</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Currently Using</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          {8192 - maxTokens} remaining
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Max Tokens Input */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Adjust Token Limit
                      </label>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Max 8,192
                      </span>
                    </div>
                    <input
                      type="number"
                      min="100"
                      max="8192"
                      value={maxTokens}
                      onChange={handleMaxTokensChange}
                      className="w-full px-3 py-2 text-sm border-2 border-purple-100 dark:border-purple-800/30 rounded-lg bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
