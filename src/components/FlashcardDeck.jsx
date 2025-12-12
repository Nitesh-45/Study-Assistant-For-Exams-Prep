import React, { useState } from 'react'
import useStore from '../store'
import FlashcardCard from './FlashcardCard'
import CreateDeckModal from './CreateDeckModal'
import { Plus, Trash2, ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'

function FlashcardDeck() {
    const {
        decks,
        currentDeckId,
        currentCardIndex,
        setCurrentDeck,
        addCard,
        deleteCard,
        deleteDeck,
        nextCard,
        prevCard,
        recordStudy
    } = useStore()

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showAddCard, setShowAddCard] = useState(false)
    const [newCardFront, setNewCardFront] = useState('')
    const [newCardBack, setNewCardBack] = useState('')
    const [isFlipped, setIsFlipped] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: null, id: null })
    const [studiedInSession, setStudiedInSession] = useState(new Set())

    const currentDeck = decks.find(d => d.id === currentDeckId)
    const currentCard = currentDeck?.cards[currentCardIndex]

    const handleDelete = () => {
        if (deleteConfirm.type === 'deck') {
            deleteDeck(deleteConfirm.id)
        } else if (deleteConfirm.type === 'card') {
            deleteCard(currentDeckId, deleteConfirm.id)
        }
        setDeleteConfirm({ show: false, type: null, id: null })
    }

    const handleAddCard = () => {
        if (newCardFront.trim() && newCardBack.trim() && currentDeckId) {
            addCard(currentDeckId, newCardFront.trim(), newCardBack.trim())
            setNewCardFront('')
            setNewCardBack('')
            setShowAddCard(false)
        }
    }

    const handleFlip = () => {
        if (!isFlipped && currentCard) {
            if (!studiedInSession.has(currentCard.id)) {
                recordStudy()
                setStudiedInSession(prev => new Set([...prev, currentCard.id]))
            }
        }
        setIsFlipped(!isFlipped)
    }

    const handleNextCard = () => {
        setIsFlipped(false)
        setTimeout(() => nextCard(), 150)
    }

    const handlePrevCard = () => {
        setIsFlipped(false)
        setTimeout(() => prevCard(), 150)
    }

    // Deck Selection View
    if (!currentDeckId) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Flashcards</h1>
                    <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">New Deck</span>
                    </button>
                </div>

                {decks.length === 0 ? (
                    <div className="card p-8 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-white mb-1">No decks yet</h2>
                        <p className="text-slate-500 text-sm mb-4">Create your first deck to start studying</p>
                        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                            Create Deck
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {decks.map((deck) => (
                            <div
                                key={deck.id}
                                className="card p-4 hover:bg-[#253449] cursor-pointer transition-colors group"
                                onClick={() => setCurrentDeck(deck.id)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: deck.color }} />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDeleteConfirm({ show: true, type: 'deck', id: deck.id, name: deck.name })
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="font-medium text-white text-sm">{deck.name}</h3>
                                <p className="text-xs text-slate-500 mt-1">{deck.cards.length} cards</p>
                            </div>
                        ))}
                    </div>
                )}

                {showCreateModal && <CreateDeckModal onClose={() => setShowCreateModal(false)} />}

                {/* Delete Modal */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
                        <div className="card p-5 w-full max-w-sm animate-fade-in">
                            <h2 className="text-lg font-semibold text-white mb-2">Delete {deleteConfirm.type}?</h2>
                            <p className="text-sm text-slate-400 mb-4">
                                "{deleteConfirm.name}" will be permanently deleted.
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => setDeleteConfirm({ show: false, type: null, id: null })} className="btn-secondary flex-1">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-red-500 hover:bg-red-600 text-white transition-colors">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // Study View
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button onClick={() => setCurrentDeck(null)} className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <button onClick={() => setShowAddCard(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Card</span>
                </button>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentDeck?.color }} />
                <h1 className="text-xl font-bold text-white">{currentDeck?.name}</h1>
            </div>

            {currentDeck?.cards.length === 0 ? (
                <div className="card p-8 text-center">
                    <h2 className="text-lg font-semibold text-white mb-1">No cards yet</h2>
                    <p className="text-slate-500 text-sm mb-4">Add your first flashcard</p>
                    <button onClick={() => setShowAddCard(true)} className="btn-primary">Add Card</button>
                </div>
            ) : (
                <>
                    <FlashcardCard card={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={handlePrevCard} disabled={currentCardIndex === 0} className="btn-secondary flex items-center gap-1 disabled:opacity-40">
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="text-sm text-slate-500 min-w-[60px] text-center">
                            {currentCardIndex + 1} / {currentDeck?.cards.length}
                        </span>
                        <button onClick={handleNextCard} disabled={currentCardIndex === currentDeck?.cards.length - 1} className="btn-primary flex items-center gap-1 disabled:opacity-40">
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Card List */}
                    <div className="card p-4">
                        <h3 className="text-sm font-medium text-slate-400 mb-3">All Cards</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {currentDeck?.cards.map((card, index) => (
                                <div key={card.id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${index === currentCardIndex ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-[#0f172a]'
                                    }`}>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">{card.front}</p>
                                    </div>
                                    <button
                                        onClick={() => setDeleteConfirm({ show: true, type: 'card', id: card.id, name: card.front })}
                                        className="text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Add Card Modal */}
            {showAddCard && (
                <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
                    <div className="card p-5 w-full max-w-md animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Add Card</h2>
                            <button onClick={() => setShowAddCard(false)} className="text-slate-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Question</label>
                                <textarea value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} placeholder="Enter question..." className="textarea-field" rows={2} />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Answer</label>
                                <textarea value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} placeholder="Enter answer..." className="textarea-field" rows={2} />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setShowAddCard(false)} className="btn-secondary flex-1">Cancel</button>
                            <button onClick={handleAddCard} className="btn-primary flex-1" disabled={!newCardFront.trim() || !newCardBack.trim()}>Add Card</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
                    <div className="card p-5 w-full max-w-sm animate-fade-in">
                        <h2 className="text-lg font-semibold text-white mb-2">Delete {deleteConfirm.type}?</h2>
                        <p className="text-sm text-slate-400 mb-4">"{deleteConfirm.name}" will be permanently deleted.</p>
                        <div className="flex gap-2">
                            <button onClick={() => setDeleteConfirm({ show: false, type: null, id: null })} className="btn-secondary flex-1">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-red-500 hover:bg-red-600 text-white transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FlashcardDeck
