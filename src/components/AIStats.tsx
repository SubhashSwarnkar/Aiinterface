import { Cpu, MessageSquare, Zap } from 'lucide-react'

// Sample data - replace with real data in production
const stats = [
  {
    id: 1,
    name: 'Total Conversations',
    value: '2,847',
    change: '+12.5%',
    icon: MessageSquare,
  },
  {
    id: 2,
    name: 'Tokens Generated',
    value: '186K',
    change: '+8.2%',
    icon: Cpu,
  },
  {
    id: 3,
    name: 'Response Time',
    value: '0.8s',
    change: '-15.3%',
    icon: Zap,
  },
]

export function AIStats() {
  return (
    <div className="hidden xl:flex flex-col gap-6 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.id}
              className="flex flex-col gap-2 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className={`text-xs font-medium ${
                  stat.change.startsWith('+') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-1">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.name}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
