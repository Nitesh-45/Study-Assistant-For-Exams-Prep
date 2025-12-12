import React from 'react'
import { RotateCw } from 'lucide-react'

function FlashcardCard({ card, isFlipped, onFlip }) {
    if (!card) return null

    return (
        <div className={`flip-card h-48 sm:h-56 cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
            <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front card p-6 flex flex-col items-center justify-center bg-[#1e293b]">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Question</span>
                    <p className="text-lg sm:text-xl font-medium text-white text-center leading-relaxed">{card.front}</p>
                    <div className="absolute bottom-4 flex items-center gap-1.5 text-slate-500 text-xs">
                        <RotateCw className="w-3 h-3" />
                        Tap to flip
                    </div>
                </div>

                {/* Back */}
                <div className="flip-card-back card p-6 flex flex-col items-center justify-center bg-[#1e3a5f]">
                    <span className="text-[10px] uppercase tracking-wider text-blue-400 mb-2">Answer</span>
                    <p className="text-lg sm:text-xl font-medium text-white text-center leading-relaxed">{card.back}</p>
                    <div className="absolute bottom-4 flex items-center gap-1.5 text-slate-400 text-xs">
                        <RotateCw className="w-3 h-3" />
                        Tap to flip
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlashcardCard
