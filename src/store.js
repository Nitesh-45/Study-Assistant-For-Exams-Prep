import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            // Decks and flashcards
            decks: [],
            currentDeckId: null,
            currentCardIndex: 0,

            // Study stats
            studyHistory: {}, // { 'YYYY-MM-DD': count }
            totalCardsStudied: 0,
            streak: 0,

            // Timer state
            timerMode: 'work', // 'work' or 'break'
            timerSeconds: 25 * 60,
            isTimerRunning: false,
            pomodoroCount: 0,

            // View state
            currentView: 'dashboard',

            // Actions
            setView: (view) => set({ currentView: view }),

            addDeck: (name, color) => {
                const newDeck = {
                    id: Date.now().toString(),
                    name,
                    color: color || '#0ea5e9',
                    cards: [],
                    createdAt: new Date().toISOString()
                }
                set((state) => ({ decks: [...state.decks, newDeck] }))
            },

            deleteDeck: (deckId) => {
                set((state) => ({
                    decks: state.decks.filter(d => d.id !== deckId),
                    currentDeckId: state.currentDeckId === deckId ? null : state.currentDeckId
                }))
            },

            addCard: (deckId, front, back) => {
                set((state) => ({
                    decks: state.decks.map(deck =>
                        deck.id === deckId
                            ? {
                                ...deck,
                                cards: [...deck.cards, {
                                    id: Date.now().toString(),
                                    front,
                                    back,
                                    createdAt: new Date().toISOString()
                                }]
                            }
                            : deck
                    )
                }))
            },

            deleteCard: (deckId, cardId) => {
                const state = get()
                const deck = state.decks.find(d => d.id === deckId)
                if (!deck) return

                const cardIndex = deck.cards.findIndex(c => c.id === cardId)
                const newCards = deck.cards.filter(c => c.id !== cardId)

                // Adjust currentCardIndex if needed
                let newCardIndex = state.currentCardIndex
                if (state.currentDeckId === deckId) {
                    if (cardIndex <= state.currentCardIndex && state.currentCardIndex > 0) {
                        newCardIndex = state.currentCardIndex - 1
                    }
                    // Ensure index doesn't exceed new array length
                    if (newCardIndex >= newCards.length && newCards.length > 0) {
                        newCardIndex = newCards.length - 1
                    }
                }

                set({
                    decks: state.decks.map(d =>
                        d.id === deckId
                            ? { ...d, cards: newCards }
                            : d
                    ),
                    currentCardIndex: newCardIndex
                })
            },

            setCurrentDeck: (deckId) => set({ currentDeckId: deckId, currentCardIndex: 0 }),

            nextCard: () => {
                const state = get()
                const deck = state.decks.find(d => d.id === state.currentDeckId)
                if (deck && state.currentCardIndex < deck.cards.length - 1) {
                    set({ currentCardIndex: state.currentCardIndex + 1 })
                }
            },

            prevCard: () => {
                const state = get()
                if (state.currentCardIndex > 0) {
                    set({ currentCardIndex: state.currentCardIndex - 1 })
                }
            },

            recordStudy: () => {
                const today = new Date().toISOString().split('T')[0]
                set((state) => {
                    const newHistory = { ...state.studyHistory }
                    newHistory[today] = (newHistory[today] || 0) + 1

                    // Calculate streak
                    let streak = 0
                    const date = new Date()
                    while (true) {
                        const dateStr = date.toISOString().split('T')[0]
                        if (newHistory[dateStr]) {
                            streak++
                            date.setDate(date.getDate() - 1)
                        } else {
                            break
                        }
                    }

                    return {
                        studyHistory: newHistory,
                        totalCardsStudied: state.totalCardsStudied + 1,
                        streak
                    }
                })
            },

            // Timer actions
            startTimer: () => set({ isTimerRunning: true }),
            pauseTimer: () => set({ isTimerRunning: false }),
            resetTimer: () => {
                const state = get()
                set({
                    timerSeconds: state.timerMode === 'work' ? 25 * 60 : 5 * 60,
                    isTimerRunning: false
                })
            },
            tickTimer: () => {
                const state = get()
                if (state.timerSeconds > 0) {
                    set({ timerSeconds: state.timerSeconds - 1 })
                } else {
                    // Switch modes
                    const newMode = state.timerMode === 'work' ? 'break' : 'work'
                    set({
                        timerMode: newMode,
                        timerSeconds: newMode === 'work' ? 25 * 60 : 5 * 60,
                        isTimerRunning: false,
                        pomodoroCount: state.timerMode === 'work' ? state.pomodoroCount + 1 : state.pomodoroCount
                    })
                }
            },
            setTimerMode: (mode) => set({
                timerMode: mode,
                timerSeconds: mode === 'work' ? 25 * 60 : 5 * 60,
                isTimerRunning: false
            })
        }),
        {
            name: 'study-assistant-storage'
        }
    )
)

export default useStore
