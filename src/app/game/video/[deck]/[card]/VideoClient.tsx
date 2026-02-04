'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BackButton, HomeButton } from '@/components/navigation'
import { VideoPlayer } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { getYoutubeVideoUrl } from '@/data/youtubeVideos'
import { cardImageSources } from '@/data/images'
import { CardDeckName, CardName, DECK_ORDER } from '@/types'
import { routes } from '@/lib/routes'

const VALID_DECKS: CardDeckName[] = DECK_ORDER

interface Props {
  deck: string
  card: string
}

function isValidDeck(deck: string): deck is CardDeckName {
  return VALID_DECKS.includes(deck as CardDeckName)
}

function isValidCardForDeck(deck: CardDeckName, card: string): boolean {
  const deckCards = cardImageSources.front[deck]
  return deckCards != null && Object.prototype.hasOwnProperty.call(deckCards, card)
}

export default function VideoClient({ deck: deckParam, card: cardParam }: Props) {
  const router = useRouter()
  const { setSelectedCardForDeck } = useGameStore()
  const hasNavigatedRef = useRef(false)

  const deck = isValidDeck(deckParam) ? deckParam : 'red'
  const isValid = isValidDeck(deckParam) && isValidCardForDeck(deck, cardParam)
  const cardName = isValid ? cardParam : ''

  // Sync store from URL so back/refresh restores correct state
  useEffect(() => {
    if (isValid) {
      setSelectedCardForDeck(deck, cardParam as CardName)
    }
  }, [deckParam, cardParam, deck, isValid, setSelectedCardForDeck])

  const videoUrl = cardName ? getYoutubeVideoUrl(deck, cardName) : ''

  // Redirect invalid deck/card to choose-card for that deck
  useEffect(() => {
    if (!isValid) {
      router.replace(routes.game.chooseCard(deck))
    }
  }, [isValid, deck, router])

  const goToEndScreen = useCallback(() => {
    if (hasNavigatedRef.current || !cardName) return
    hasNavigatedRef.current = true
    router.push(routes.game.videoEnd(deck, cardName))
  }, [deck, cardName, router])

  const handleVideoEnded = () => {
    goToEndScreen()
  }

  if (!videoUrl) {
    return null
  }

  return (
    <div className="flex flex-col h-screen max-h-[100vh] overflow-hidden bg-black relative">
      <div className="relative h-12 z-10 shrink-0">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      <div className="h-[80vh] relative min-h-0 shrink-0">
        <VideoPlayer
          src={videoUrl}
          onEnded={handleVideoEnded}
          className="h-full"
        />
      </div>
    </div>
  )
}
