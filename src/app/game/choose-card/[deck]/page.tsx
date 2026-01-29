'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { Card } from '@/components/ui'
import { ChooseCardText } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { cardImageSources, getCardImage } from '@/data/images'
import { CardName, CardDeckName, DECK_ORDER, nextDeck } from '@/types'
import { routes } from '@/lib/routes'

const VALID_DECKS: CardDeckName[] = DECK_ORDER

interface Props {
  params: Promise<{ deck: string }>
}

function isValidDeck(deck: string): deck is CardDeckName {
  return VALID_DECKS.includes(deck as CardDeckName)
}

export default function ChooseCardPage({ params }: Props) {
  const { deck: deckParam } = use(params)
  const router = useRouter()
  const { t } = useTranslation()
  const { gameMode, currentDeck, setCurrentDeck, selectCard, confirmCard, goToNextDeck } =
    useGameStore()

  const deck = isValidDeck(deckParam) ? deckParam : 'red'

  // Sync store from URL so back/refresh restores correct state
  useEffect(() => {
    if (deck !== currentDeck) {
      setCurrentDeck(deck)
    }
  }, [deck, currentDeck, setCurrentDeck])

  // Redirect invalid deck to red
  useEffect(() => {
    if (!isValidDeck(deckParam)) {
      router.replace(routes.game.chooseCard('red'))
    }
  }, [deckParam, router])

  const deckCards = Object.keys(cardImageSources.front[deck] || {}).sort((a, b) => {
    if (a.includes('joker')) return 1
    if (b.includes('joker')) return -1
    return a.localeCompare(b)
  })

  const handleCardPress = (cardName: string) => {
    selectCard(cardName as CardName)

    if (gameMode === '1move') {
      router.push(routes.game.video('green', cardName))
    } else {
      confirmCard()
      if (deck === 'green') {
        router.push(routes.game.afterCards)
      } else {
        goToNextDeck()
        router.push(routes.game.chooseCard(nextDeck(deck)))
      }
    }
  }

  const backHref =
    gameMode === '3moves' && deck === 'red'
      ? routes.game.instructions('3moves')
      : undefined

  if (!isValidDeck(deckParam)) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="relative h-14 flex items-center justify-center">
        <BackButton tintColor="#ffffff" href={backHref} />
        <HomeButton tintColor="#ffffff" />
        <ChooseCardText currentDeck={deck} />
      </div>

      {/* Card Grid */}
      <div className="flex-1 min-h-0 flex flex-wrap content-start justify-center gap-x-1 gap-y-0 p-1 overflow-hidden">
        {deckCards.map((cardName) => (
          <Card
            key={cardName}
            name={t(cardName)}
            imageSrc={getCardImage(deck, cardName)}
            onClick={() => handleCardPress(cardName)}
          />
        ))}
      </div>
    </div>
  )
}
