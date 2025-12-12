import React from 'react'
import useStore from './store'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import FlashcardDeck from './components/FlashcardDeck'
import PomodoroTimer from './components/PomodoroTimer'

function App() {
    const currentView = useStore((state) => state.currentView)

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

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-8">
                <div className="max-w-6xl mx-auto animate-fade-in">
                    {renderView()}
                </div>
            </main>
        </div>
    )
}

export default App
