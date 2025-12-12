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
        <aside className="fixed left-0 top-0 h-full w-56 bg-[#1e293b] border-r border-[#334155] z-50">
            <div className="p-5">
                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-white">StudyAI</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`nav-item w-full ${currentView === item.id ? 'active' : ''}`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
