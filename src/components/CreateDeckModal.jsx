import React, { useState } from 'react'
import useStore from '../store'
import { X } from 'lucide-react'

function CreateDeckModal({ onClose }) {
    const addDeck = useStore((state) => state.addDeck)
    const [name, setName] = useState('')
    const [color, setColor] = useState('#3b82f6')

    const colors = ['#3b82f6', '#8b5cf6', '#22c55e', '#f97316', '#ef4444', '#eab308', '#06b6d4', '#ec4899']

    const handleCreate = () => {
        if (name.trim()) {
            addDeck(name.trim(), color)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
            <div className="card p-5 w-full max-w-sm animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">New Deck</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-slate-500 mb-1">Deck Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Spanish Vocabulary"
                            className="input-field"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-slate-500 mb-2">Color</label>
                        <div className="flex gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-7 h-7 rounded-lg transition-transform ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1e293b] scale-110' : 'hover:scale-110'
                                        }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-5">
                    <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                    <button onClick={handleCreate} className="btn-primary flex-1" disabled={!name.trim()}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateDeckModal
