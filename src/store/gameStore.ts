import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CardDeckName, CardName, GameMode, SelectedCards, DECK_ORDER } from '@/types'

interface GameState {
  // Language (persisted)
  language: string
  setLanguage: (lang: string) => void

  // Game Mode
  gameMode: GameMode | null
  setGameMode: (mode: GameMode) => void

  // Card Selection
  currentDeck: CardDeckName
  selectedCards: SelectedCards
  allCardsChosen: boolean

  // Actions
  selectCard: (cardName: CardName) => void
  confirmCard: () => void
  goToNextDeck: () => void
  setCurrentDeck: (deck: CardDeckName) => void
  resetGame: () => void

  // History for undo
  history: SelectedCards[]
  undo: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      language: 'en',
      gameMode: null,
      currentDeck: 'red',
      selectedCards: { red: '', orange: '', green: '' },
      allCardsChosen: false,
      history: [],

      // Language
      setLanguage: (lang) => set({ language: lang }),

      // Game mode
      setGameMode: (mode) =>
        set({
          gameMode: mode,
          currentDeck: mode === '1move' ? 'green' : 'red',
          selectedCards: { red: '', orange: '', green: '' },
          allCardsChosen: false,
          history: [],
        }),

      // Card selection
      selectCard: (cardName) => {
        const { selectedCards, currentDeck, history } = get()
        set({
          history: [...history, { ...selectedCards }],
          selectedCards: { ...selectedCards, [currentDeck]: cardName },
        })
      },

      // Confirm and check if all cards chosen
      confirmCard: () => {
        const { currentDeck, gameMode } = get()
        if (currentDeck === 'green' || gameMode === '1move') {
          set({ allCardsChosen: true })
        }
      },

      // Move to next deck
      goToNextDeck: () => {
        const { currentDeck } = get()
        const currentIndex = DECK_ORDER.indexOf(currentDeck)
        if (currentIndex < 2) {
          set({ currentDeck: DECK_ORDER[currentIndex + 1] })
        }
      },

      // Set current deck directly
      setCurrentDeck: (deck) => set({ currentDeck: deck }),

      // Reset game
      resetGame: () =>
        set({
          gameMode: null,
          currentDeck: 'red',
          selectedCards: { red: '', orange: '', green: '' },
          allCardsChosen: false,
          history: [],
        }),

      // Undo last card selection
      undo: () => {
        const { history } = get()
        if (history.length > 0) {
          const previousState = history[history.length - 1]
          set({
            selectedCards: previousState,
            history: history.slice(0, -1),
          })
        }
      },
    }),
    {
      name: 'haka-game-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
)
