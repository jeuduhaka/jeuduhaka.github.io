'use client'

import { use, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BackButton, HomeButton } from '@/components/navigation'
import { VideoPlayer } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { getYoutubeVideoUrl } from '@/data/youtubeVideos'
import { cardImageSources } from '@/data/images'
import { CardDeckName, DECK_ORDER } from '@/types'
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

export default function VideoPage({ params }: Props) {
  const resolved = use(params)
  const deckParam = resolved.deck
  const cardParam = decodeURIComponent(resolved.card)
  const router = useRouter()
  const { setSelectedCardForDeck } = useGameStore()
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasNavigatedRef = useRef(false)

  const deck = isValidDeck(deckParam) ? deckParam : 'red'
  const isValid = isValidDeck(deckParam) && isValidCardForDeck(deck, cardParam)
  const cardName = isValid ? cardParam : ''

  // Sync store from URL so back/refresh restores correct state
  useEffect(() => {
    if (isValid) {
      setSelectedCardForDeck(deck, cardParam)
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
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    router.push(routes.game.videoEnd(deck, cardName))
  }, [deck, cardName, router])

  // Duration-based fallback: go to end screen after video duration + 3s (when YouTube API doesn't fire on mobile).
  const handleDuration = useCallback(
    (seconds: number) => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = setTimeout(() => {
        fallbackTimerRef.current = null
        goToEndScreen()
      }, (seconds + 3) * 1000)
    },
    [goToEndScreen]
  )

  // Safety: go to end screen after 30s so user can continue even if onEnded/onDuration never fire.
  useEffect(() => {
    if (!videoUrl) return
    const safety = setTimeout(goToEndScreen, 30 * 1000)
    return () => {
      clearTimeout(safety)
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }
    }
  }, [videoUrl, goToEndScreen])

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
          onDuration={handleDuration}
          className="h-full"
        />
      </div>
    </div>
  )
}
