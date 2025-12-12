import React from 'react'
import useStore from './store'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import FlashcardDeck from './components/FlashcardDeck'
import PomodoroTimer from './components/PomodoroTimer'
import { LayoutDashboard, Layers, Clock } from 'lucide-react'

function App() {
    const { currentView, setView } = useStore()

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />
            case 'flashcards':
                return <FlashcardDeck />
            case 'timer':
                return <PomodoroTimer />
            default:
                return <Dashboard />
        }
    }

    const navItems = [
        { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
        { id: 'flashcards', label: 'Cards', icon: Layers },
        { id: 'timer', label: 'Timer', icon: Clock },
    ]

    return (
        <div className="min-h-screen pb-20 md:pb-0">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="md:ml-56 p-4 md:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto animate-fade-in">
                    {renderView()}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-nav md:hidden">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}

export default App
