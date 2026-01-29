'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { Button } from '@/components/ui'
import { useGameStore } from '@/store/gameStore'
import { cardImageSources } from '@/data/images'
import { CardDeckName, DECK_ORDER, nextDeck } from '@/types'
import { routes } from '@/lib/routes'

const VALID_DECKS: CardDeckName[] = DECK_ORDER

interface Props {
  params: Promise<{ deck: string; card: string }>
}

function isValidDeck(deck: string): deck is CardDeckName {
  return VALID_DECKS.includes(deck as CardDeckName)
}

function isValidCardForDeck(deck: CardDeckName, card: string): boolean {
  const deckCards = cardImageSources.front[deck]
  return deckCards != null && Object.prototype.hasOwnProperty.call(deckCards, card)
}

export default function VideoEndPage({ params }: Props) {
  const resolved = use(params)
  const deckParam = resolved.deck
  const cardParam = decodeURIComponent(resolved.card)
  const router = useRouter()
  const { t } = useTranslation()
  const { gameMode, currentDeck, selectedCards, setCurrentDeck } = useGameStore()

  const deck = isValidDeck(deckParam) ? deckParam : 'red'
  const isValid = isValidDeck(deckParam) && isValidCardForDeck(deck, cardParam)

  // Redirect invalid deck/card back to choose-card for that deck
  useEffect(() => {
    if (!isValid) {
      router.replace(routes.game.chooseCard(deck))
    }
  }, [isValid, deck, router])

  const handleReplay = () => {
    // Push video screen so we get a fresh mount and the video restarts
    router.push(routes.game.video(deck, cardParam))
  }

  const handleContinue = () => {
    if (gameMode === '1move') {
      router.push(routes.game.final)
      return
    }
    if (currentDeck !== 'green') {
      const next = nextDeck(currentDeck)
      const nextCard = selectedCards[next]
      if (nextCard) {
        router.push(routes.game.video(next, nextCard))
      } else {
        setCurrentDeck(next)
        router.replace(routes.game.chooseCard(next))
      }
    } else {
      router.push(routes.game.final)
    }
  }

  if (!isValid) {
    return null
  }

  return (
    <div className="flex flex-col h-screen max-h-[100vh] overflow-hidden bg-black">
      <div className="relative h-12 z-10 shrink-0">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-row gap-3 w-full max-w-sm">
          <Button
            variant="outline"
            onClick={handleReplay}
            fullWidth={false}
            className="min-w-[7rem] flex-1 border-white text-haka-green hover:bg-white/10"
          >
            {t('replay')}
          </Button>
          <Button
            onClick={handleContinue}
            fullWidth={false}
            className="min-w-[7rem] flex-1 !bg-haka-green hover:!bg-haka-green/90 text-white border-0"
          >
            {t('letsGo')}
          </Button>
        </div>
      </div>
    </div>
  )
}
