import React from 'react'
import useStore from '../store'
import StudyHeatmap from './StudyHeatmap'
import { Flame, Layers, Brain, TrendingUp, Plus, Clock, ArrowRight } from 'lucide-react'

function Dashboard() {
    const { decks, totalCardsStudied, streak, setView, studyHistory } = useStore()

    const totalCards = decks.reduce((acc, deck) => acc + deck.cards.length, 0)
    const todayStudied = studyHistory[new Date().toISOString().split('T')[0]] || 0

    const stats = [
        { label: 'Study Streak', value: `${streak} days`, icon: Flame, color: 'from-orange-500 to-red-500' },
        { label: 'Total Decks', value: decks.length, icon: Layers, color: 'from-primary-500 to-cyan-500' },
        { label: 'Total Cards', value: totalCards, icon: Brain, color: 'from-accent-500 to-pink-500' },
        { label: 'Cards Studied', value: totalCardsStudied, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        Welcome back! <span className="animate-float inline-block">👋</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        You've studied <span className="text-primary-400 font-semibold">{todayStudied} cards</span> today. Keep it up!
                    </p>
                </div>
                <button
                    onClick={() => setView('flashcards')}
                    className="btn-primary flex items-center gap-2 w-fit"
                >
                    <Plus className="w-5 h-5" />
                    New Deck
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className="glass-card p-5 hover:scale-105 transition-transform duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                        </div>
                    )
                })}
            </div>

            {/* Heatmap */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-400" />
                    Study Activity
                </h2>
                <StudyHeatmap />
            </div>

            {/* Recent Decks */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Layers className="w-5 h-5 text-accent-400" />
                        Your Decks
                    </h2>
                    <button
                        onClick={() => setView('flashcards')}
                        className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {decks.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                            <Layers className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-slate-400 mb-4">No decks yet. Create your first one!</p>
                        <button
                            onClick={() => setView('flashcards')}
                            className="btn-primary"
                        >
                            Create Deck
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {decks.slice(0, 6).map((deck) => (
                            <div
                                key={deck.id}
                                className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group"
                                onClick={() => setView('flashcards')}
                            >
                                <div
                                    className="w-3 h-3 rounded-full mb-3"
                                    style={{ backgroundColor: deck.color }}
                                />
                                <h3 className="font-semibold group-hover:text-primary-400 transition-colors">
                                    {deck.name}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    {deck.cards.length} cards
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setView('timer')}
                    className="glass-card p-6 text-left hover:border-primary-500/50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Start Focus Session</h3>
                            <p className="text-slate-400 text-sm">25 min Pomodoro timer</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setView('flashcards')}
                    className="glass-card p-6 text-left hover:border-accent-500/50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Brain className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Study Flashcards</h3>
                            <p className="text-slate-400 text-sm">Review your cards</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Dashboard
