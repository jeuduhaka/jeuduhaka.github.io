'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { Card } from '@/components/ui'
import { ChooseCardText, DecksContainer } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { cardImageSources, getCardImage } from '@/data/images'
import { CardName } from '@/types'
import { routes } from '@/lib/routes'

export default function ChooseCardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { gameMode, currentDeck, selectCard } = useGameStore()

  // Get cards for current deck and sort (joker at end)
  const deckCards = Object.keys(cardImageSources.front[currentDeck]).sort((a, b) => {
    if (a.includes('joker')) return 1
    if (b.includes('joker')) return -1
    return a.localeCompare(b)
  })

  const handleCardPress = (cardName: string) => {
    selectCard(cardName as CardName)

    if (gameMode === '1move') {
      router.push(routes.game.video)
    } else {
      router.push(routes.game.confirmCard)
    }
  }

  // Split cards into rows of 3
  const rows: string[][] = []
  for (let i = 0; i < deckCards.length; i += 3) {
    rows.push(deckCards.slice(i, i + 3))
  }

  const backHref =
    gameMode === '3moves' && currentDeck === 'red' ? routes.game.deck : undefined

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="relative h-14 flex items-center justify-center">
        <BackButton tintColor="#ffffff" href={backHref} />
        <HomeButton tintColor="#ffffff" />
        <ChooseCardText currentDeck={currentDeck} />
      </div>

      {/* Card Grid */}
      <div className="flex-1 min-h-0 flex flex-col gap-1 p-1 overflow-hidden">
        {rows.map((row, rowIndex) => (
          <DecksContainer key={rowIndex} className="flex-1 min-h-0">
            {row.map((cardName) => (
              <Card
                key={cardName}
                name={t(cardName)}
                imageSrc={getCardImage(currentDeck, cardName)}
                onClick={() => handleCardPress(cardName)}
              />
            ))}
          </DecksContainer>
        ))}
      </div>
    </div>
  )
}
