import React, { useState } from 'react'
import useStore from '../store'

function CreateDeckModal({ onClose }) {
    const addDeck = useStore((state) => state.addDeck)
    const [name, setName] = useState('')
    const [color, setColor] = useState('#0ea5e9')

    const colors = [
        '#0ea5e9', // primary blue
        '#d946ef', // accent purple
        '#22c55e', // green
        '#f97316', // orange
        '#ef4444', // red
        '#eab308', // yellow
        '#06b6d4', // cyan
        '#8b5cf6', // violet
    ]

    const handleCreate = () => {
        if (name.trim()) {
            addDeck(name.trim(), color)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 w-full max-w-md animate-slide-up">
                <h2 className="text-2xl font-bold mb-6">Create New Deck</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Deck Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Spanish Vocabulary"
                            className="input-glass"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-3">Color</label>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-10 h-10 rounded-xl transition-all ${color === c
                                            ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110'
                                            : 'hover:scale-110'
                                        }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="btn-primary flex-1"
                        disabled={!name.trim()}
                    >
                        Create Deck
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateDeckModal
