import { useEffect, useState } from 'react';
import { Copy, MoreVertical, Pencil, Plus, Search, ThumbsUp, Trash2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const initialPrompts = [
	{
		title: 'Brainstorming blog post ideas',
		prompt: 'Brainstorm a list of 10 engaging blog post ideas for a company in the [Your Industry] space. The topics should be relevant to [Your Target Audience] and focus on solving their key problems.',
		category: 'Creative',
		use_case: 'Content Creation',
	},
	{
		title: 'Summarize a long article',
		prompt: 'Summarize the following article into 3 key bullet points, followed by a one-sentence conclusion:\n\n[Paste article here]',
		category: 'Productivity',
		use_case: 'Summarization',
	},
	{
		title: 'Write a marketing email',
		prompt: 'Write a short, persuasive marketing email to announce a new feature. The email should have a catchy subject line, highlight 3 main benefits, and include a clear call-to-action.',
		category: 'Marketing',
		use_case: 'Email Copy',
	},
	{
		title: 'Explain a complex topic simply',
		prompt: 'Explain the concept of [Complex Topic, e.g., "Quantum Computing"] to a 12-year-old. Use simple analogies and avoid technical jargon.',
		category: 'Education',
		use_case: 'Simplification',
	},
	{
		title: 'Generate SQL query',
		prompt: 'Write a SQL query to select all users from the `users` table who have signed up in the last 30 days and have made at least one purchase.',
		category: 'Technical',
		use_case: 'Code Generation',
	},
	{
		title: 'Create a social media post',
		prompt: 'Create an engaging Twitter post to promote our upcoming webinar on [Topic]. Include a relevant hashtag and a link to register.',
		category: 'Marketing',
		use_case: 'Social Media',
	},
];

// The component is renamed to PromptLibrary for clarity, but exported as AIStats to avoid breaking imports.
export function AIStats() {
	const [prompts, setPrompts] = useState(initialPrompts);
	const [searchTerm, setSearchTerm] = useState('');
	const [toast, setToast] = useState({ show: false, message: '' });
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [activeMenu, setActiveMenu] = useState<number | null>(null);
	const [newPrompt, setNewPrompt] = useState({
		title: '',
		prompt: '',
		category: '',
		use_case: '',
	});

	const handleAddPrompt = () => {
		if (!newPrompt.title || !newPrompt.prompt) {
			showToast('Please fill in all required fields');
			return;
		}
		if (editingIndex !== null) {
			const updatedPrompts = [...prompts];
			updatedPrompts[editingIndex] = newPrompt;
			setPrompts(updatedPrompts);
			showToast('Prompt updated successfully!');
		} else {
			setPrompts([...prompts, newPrompt]);
			showToast('Prompt added successfully!');
		}
		setNewPrompt({ title: '', prompt: '', category: '', use_case: '' });
		setIsDialogOpen(false);
		setEditingIndex(null);
	};

	const handleEdit = (index: number) => {
		setEditingIndex(index);
		setNewPrompt(prompts[index]);
		setIsDialogOpen(true);
	};

	const handleDelete = (index: number) => {
		const updatedPrompts = prompts.filter((_, i) => i !== index);
		setPrompts(updatedPrompts);
		setActiveMenu(null);
		showToast('Prompt deleted successfully!');
	};

	// Close menu when clicking outside
	const handleClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.prompt-menu')) {
			setActiveMenu(null);
		}
	};

	// Add and remove click listener
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const showToast = (message: string) => {
		setToast({ show: true, message });
		setTimeout(() => setToast({ show: false, message: '' }), 2000);
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			showToast('Prompt copied to clipboard!');
		} catch (err) {
			showToast('Failed to copy prompt');
			console.error('Failed to copy text: ', err);
		}
	};

	const filteredPrompts = prompts.filter(
		p =>
			p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full max-w-4xl mx-auto p-3 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 relative">
			{toast.show && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white text-xs font-medium rounded-full shadow-lg z-50"
				>
					{toast.message}
				</motion.div>
			)}
			<div className="space-y-3 mb-2">
				
				<div className="flex items-center gap-2">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
						<input
							type="text"
							placeholder="Search prompts..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors"
						/>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setIsDialogOpen(true)}
						className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-shadow whitespace-nowrap"
					>
						<Plus size={14} />
						Add New
					</motion.button>
				</div>
			</div>

			{isDialogOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsDialogOpen(false);
					}}
				>
					<motion.div
						initial={{ scale: 0.95 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.95 }}
						className="bg-white dark:bg-slate-800 rounded-xl p-4 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700"
					>
						<h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
							{editingIndex !== null ? 'Edit Prompt' : 'Add New Prompt'}
						</h3>
						<div className="space-y-3">
							<div>
								<input
									type="text"
									placeholder="Title"
									value={newPrompt.title}
									onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
									className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
								/>
							</div>
							<div>
								<textarea
									placeholder="Prompt"
									value={newPrompt.prompt}
									onChange={(e) => setNewPrompt({ ...newPrompt, prompt: e.target.value })}
									className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 min-h-[100px]"
								/>
							</div>
							<div className="flex gap-2">
								<input
									type="text"
									placeholder="Category"
									value={newPrompt.category}
									onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
									className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
								/>
								<input
									type="text"
									placeholder="Use Case"
									value={newPrompt.use_case}
									onChange={(e) => setNewPrompt({ ...newPrompt, use_case: e.target.value })}
									className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
								/>
							</div>
							<div className="flex justify-end gap-2 mt-4">
								<button
									onClick={() => setIsDialogOpen(false)}
									className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
								>
									Cancel
								</button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleAddPrompt}
									className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
								>
									Add Prompt
								</motion.button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				{filteredPrompts.map((prompt, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}
						className="bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 flex items-center gap-3 group relative"
					>
						<div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
							{prompt.title.charAt(0)}
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
								{prompt.title}
							</h3>
							<div className="flex items-center gap-1.5 text-[10px] mt-0.5">
								<span className="inline-flex items-center gap-0.5 px-1.5 py-px bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
									<Zap size={8} />
									{prompt.category}
								</span>
								<span className="inline-flex items-center gap-0.5 px-1.5 py-px bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
									<ThumbsUp size={8} />
									{prompt.use_case}
								</span>
							</div>
						</div>
						<div className="relative prompt-menu">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveMenu(activeMenu === index ? null : index)}
								className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
								title="More options"
							>
								<MoreVertical size={14} className="text-slate-600 dark:text-slate-400" />
							</motion.button>
							
							{activeMenu === index && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="absolute right-0 top-7 w-32 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10"
								>
									<button
										onClick={() => {
											handleCopy(prompt.prompt);
											setActiveMenu(null);
										}}
										className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
									>
										<Copy size={12} />
										Copy
									</button>
									<button
										onClick={() => {
											handleEdit(index);
											setActiveMenu(null);
										}}
										className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-blue-600 dark:text-blue-400"
									>
										<Pencil size={12} />
										Edit
									</button>
									<button
										onClick={() => handleDelete(index)}
										className="w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-red-600 dark:text-red-400"
									>
										<Trash2 size={12} />
										Delete
									</button>
								</motion.div>
							)}
						</div>
					</motion.div>
				))}
			</div>
		</div>
    
	);
}
