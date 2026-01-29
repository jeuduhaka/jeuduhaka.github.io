'use client'

import { useRouter } from 'next/navigation'
import { BackButton, HomeButton } from '@/components/navigation'
import { CardBack } from '@/components/ui'
import { DecksContainer } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { CardDeckName, DECK_ORDER } from '@/types'
import { routes } from '@/lib/routes'

export default function DeckPage() {
  const router = useRouter()
  const { gameMode, currentDeck, setCurrentDeck, selectedCards } = useGameStore()
  const instructionsBackHref =
    gameMode === '1move'
      ? routes.game.instructions('1move')
      : routes.game.instructions('3moves')

  const handleDeckPress = (deck: CardDeckName) => {
    // Can only select the current deck or decks that have cards selected
    if (deck === currentDeck || selectedCards[deck]) {
      setCurrentDeck(deck)

      if (selectedCards[deck]) {
        router.push(routes.game.video)
      } else {
        router.push(routes.game.chooseCard)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="relative h-12">
        <BackButton tintColor="#ffffff" href={instructionsBackHref} />
        <HomeButton tintColor="#ffffff" />
      </div>

      {/* Decks */}
      <div className="flex-1 flex items-center justify-center p-4">
        <DecksContainer className="w-full max-w-sm h-72 gap-2">
          {DECK_ORDER.map((deck) => (
            <CardBack
              key={deck}
              deck={deck}
              isActive={deck === currentDeck}
              onClick={() => handleDeckPress(deck)}
            />
          ))}
        </DecksContainer>
      </div>
    </div>
  )
}
