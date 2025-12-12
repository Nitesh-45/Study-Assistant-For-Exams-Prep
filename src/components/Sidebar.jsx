import React from 'react'
import useStore from '../store'
import { LayoutDashboard, Layers, Clock, BookOpen } from 'lucide-react'

function Sidebar() {
    const { currentView, setView } = useStore()

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'flashcards', label: 'Flashcards', icon: Layers },
        { id: 'timer', label: 'Timer', icon: Clock },
    ]

    return (
        <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 glass border-r border-white/10 z-50">
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center glow-primary">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="hidden lg:block text-xl font-bold gradient-text">
                        StudyAI
                    </span>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = currentView === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white glow-primary'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                                <span className="hidden lg:block font-medium">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <div className="glass-card p-4 hidden lg:block">
                    <p className="text-xs text-slate-400 mb-2">Pro Tip</p>
                    <p className="text-sm text-slate-300">
                        Use the Pomodoro timer to stay focused while studying! 🍅
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
