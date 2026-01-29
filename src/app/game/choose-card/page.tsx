'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { Card } from '@/components/ui'
import { ChooseCardText } from '@/components/game'
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
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-3 gap-1 p-1 overflow-hidden">
        {deckCards.map((cardName) => (
          <Card
            key={cardName}
            name={t(cardName)}
            imageSrc={getCardImage(currentDeck, cardName)}
            onClick={() => handleCardPress(cardName)}
          />
        ))}
      </div>
    </div>
  )
}
