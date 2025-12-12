import React, { useState } from 'react'
import useStore from '../store'
import FlashcardCard from './FlashcardCard'
import CreateDeckModal from './CreateDeckModal'
import { Plus, Trash2, ArrowLeft, ChevronLeft, ChevronRight, Shuffle, X } from 'lucide-react'

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
            // Recording study when revealing the answer (first flip)
            if (!studiedInSession.has(currentCard.id)) {
                recordStudy()
                setStudiedInSession(prev => new Set([...prev, currentCard.id]))
            }
        }
        setIsFlipped(!isFlipped)
    }

    const handleNextCard = () => {
        setIsFlipped(false)
        setTimeout(() => nextCard(), 200)
    }

    const handlePrevCard = () => {
        setIsFlipped(false)
        setTimeout(() => prevCard(), 200)
    }

    // Deck Selection View
    if (!currentDeckId) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Flashcard Decks</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        New Deck
                    </button>
                </div>

                {decks.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-float">
                            <Plus className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">No decks yet</h2>
                        <p className="text-slate-400 mb-6">Create your first flashcard deck to start studying!</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="btn-primary"
                        >
                            Create Your First Deck
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {decks.map((deck) => (
                            <div
                                key={deck.id}
                                className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                                onClick={() => setCurrentDeck(deck.id)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: deck.color }}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDeleteConfirm({ show: true, type: 'deck', id: deck.id, name: deck.name })
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                                    {deck.name}
                                </h3>
                                <p className="text-slate-400">
                                    {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {showCreateModal && (
                    <CreateDeckModal onClose={() => setShowCreateModal(false)} />
                )}
            </div>
        )
    }

    // Study View
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentDeck(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Decks
                </button>
                <button
                    onClick={() => setShowAddCard(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Card
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentDeck?.color }}
                />
                <h1 className="text-3xl font-bold">{currentDeck?.name}</h1>
            </div>

            {currentDeck?.cards.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <h2 className="text-2xl font-semibold mb-2">No cards yet</h2>
                    <p className="text-slate-400 mb-6">Add your first flashcard to this deck!</p>
                    <button
                        onClick={() => setShowAddCard(true)}
                        className="btn-primary"
                    >
                        Add First Card
                    </button>
                </div>
            ) : (
                <>
                    {/* Flashcard */}
                    <div className="max-w-2xl mx-auto">
                        <FlashcardCard
                            card={currentCard}
                            isFlipped={isFlipped}
                            onFlip={handleFlip}
                        />

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={handlePrevCard}
                                disabled={currentCardIndex === 0}
                                className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <span className="text-slate-400">
                                {currentCardIndex + 1} / {currentDeck?.cards.length}
                            </span>

                            <button
                                onClick={handleNextCard}
                                disabled={currentCardIndex === currentDeck?.cards.length - 1}
                                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Card List */}
                    <div className="glass-card p-6 mt-8">
                        <h3 className="text-lg font-semibold mb-4">All Cards</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {currentDeck?.cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${index === currentCardIndex
                                        ? 'bg-primary-500/20 border border-primary-500/50'
                                        : 'bg-slate-800/50 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{card.front}</p>
                                        <p className="text-sm text-slate-400 truncate">{card.back}</p>
                                    </div>
                                    <button
                                        onClick={() => setDeleteConfirm({ show: true, type: 'card', id: card.id, name: card.front })}
                                        className="ml-4 text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Add Card Modal */}
            {showAddCard && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-6 w-full max-w-md animate-slide-up">
                        <h2 className="text-2xl font-bold mb-6">Add New Card</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Front (Question)</label>
                                <textarea
                                    value={newCardFront}
                                    onChange={(e) => setNewCardFront(e.target.value)}
                                    placeholder="Enter the question or term..."
                                    className="textarea-glass"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Back (Answer)</label>
                                <textarea
                                    value={newCardBack}
                                    onChange={(e) => setNewCardBack(e.target.value)}
                                    placeholder="Enter the answer or definition..."
                                    className="textarea-glass"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowAddCard(false)}
                                className="btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCard}
                                className="btn-primary flex-1"
                                disabled={!newCardFront.trim() || !newCardBack.trim()}
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-6 w-full max-w-sm animate-slide-up">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-red-400">Confirm Delete</h2>
                            <button
                                onClick={() => setDeleteConfirm({ show: false, type: null, id: null })}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-slate-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">"{deleteConfirm.name}"</span>?
                            {deleteConfirm.type === 'deck' && ' All cards in this deck will be deleted.'}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm({ show: false, type: null, id: null })}
                                className="btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-3 px-4 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FlashcardDeck
