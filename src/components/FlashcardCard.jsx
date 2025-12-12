import React from 'react'
import { RotateCw } from 'lucide-react'

function FlashcardCard({ card, isFlipped, onFlip }) {
    if (!card) return null

    return (
        <div
            className={`flip-card h-72 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
            onClick={onFlip}
        >
            <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front glass-card p-8 flex flex-col items-center justify-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-4">Question</p>
                    <p className="text-xl lg:text-2xl font-semibold text-center leading-relaxed">
                        {card.front}
                    </p>
                    <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 text-sm">
                        <RotateCw className="w-4 h-4" />
                        Click to flip
                    </div>
                </div>

                {/* Back */}
                <div className="flip-card-back glass-card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary-900/50 to-accent-900/50">
                    <p className="text-xs text-primary-300 uppercase tracking-wider mb-4">Answer</p>
                    <p className="text-xl lg:text-2xl font-semibold text-center leading-relaxed">
                        {card.back}
                    </p>
                    <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 text-sm">
                        <RotateCw className="w-4 h-4" />
                        Click to flip back
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlashcardCard
