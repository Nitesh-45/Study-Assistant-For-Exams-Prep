import React from 'react'
import useStore from '../store'
import StudyHeatmap from './StudyHeatmap'
import { Flame, Layers, Brain, TrendingUp, Plus, Clock, ChevronRight } from 'lucide-react'

function Dashboard() {
    const { decks, totalCardsStudied, streak, setView, studyHistory } = useStore()

    const totalCards = decks.reduce((acc, deck) => acc + deck.cards.length, 0)
    const todayStudied = studyHistory[new Date().toISOString().split('T')[0]] || 0

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">
                    {todayStudied > 0
                        ? `You've studied ${todayStudied} cards today. Great job!`
                        : "Start studying to track your progress!"
                    }
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="stat-card">
                    <div className="flex items-center gap-2 text-orange-400 mb-2">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Streak</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{streak}</p>
                    <p className="text-xs text-slate-500">days</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Layers className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Decks</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{decks.length}</p>
                    <p className="text-xs text-slate-500">total</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Brain className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Cards</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalCards}</p>
                    <p className="text-xs text-slate-500">created</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Studied</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalCardsStudied}</p>
                    <p className="text-xs text-slate-500">cards</p>
                </div>
            </div>

            {/* Activity Heatmap */}
            <div className="card p-4">
                <h2 className="text-sm font-medium text-slate-400 mb-3">Study Activity</h2>
                <StudyHeatmap />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                    onClick={() => setView('flashcards')}
                    className="card p-4 text-left hover:bg-[#253449] transition-colors group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Plus className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white text-sm">Create New Deck</p>
                                <p className="text-xs text-slate-500">Add flashcards to study</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                </button>

                <button
                    onClick={() => setView('timer')}
                    className="card p-4 text-left hover:bg-[#253449] transition-colors group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white text-sm">Focus Timer</p>
                                <p className="text-xs text-slate-500">25 min Pomodoro session</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                </button>
            </div>

            {/* Your Decks */}
            {decks.length > 0 && (
                <div className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-medium text-slate-400">Your Decks</h2>
                        <button
                            onClick={() => setView('flashcards')}
                            className="text-xs text-blue-400 hover:text-blue-300"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-2">
                        {decks.slice(0, 4).map((deck) => (
                            <button
                                key={deck.id}
                                onClick={() => setView('flashcards')}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f172a] transition-colors text-left"
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: deck.color }}
                                />
                                <span className="text-sm font-medium text-white flex-1">{deck.name}</span>
                                <span className="text-xs text-slate-500">{deck.cards.length} cards</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
