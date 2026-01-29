'use client'

import { use, useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { VideoPlayer } from '@/components/game'
import { Button } from '@/components/ui'
import { useGameStore } from '@/store/gameStore'
import { getYoutubeVideoUrl } from '@/data/youtubeVideos'
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

export default function VideoPage({ params }: Props) {
  const resolved = use(params)
  const deckParam = resolved.deck
  const cardParam = decodeURIComponent(resolved.card)
  const router = useRouter()
  const { t } = useTranslation()
  const {
    gameMode,
    currentDeck,
    selectedCards,
    setCurrentDeck,
    setSelectedCardForDeck,
  } = useGameStore()
  const [showEndOverlay, setShowEndOverlay] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Duration-based fallback: show overlay after video duration + 3s (when YouTube API doesn't fire on mobile).
  const handleDuration = useCallback((seconds: number) => {
    if (gameMode !== '3moves') return
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    fallbackTimerRef.current = setTimeout(() => {
      fallbackTimerRef.current = null
      setShowEndOverlay((prev) => prev || true)
    }, (seconds + 3) * 1000)
  }, [gameMode])

  // Safety: show overlay after 30s in 3-moves so it always appears even if onEnded/onDuration never fire.
  useEffect(() => {
    if (gameMode !== '3moves' || !videoUrl) return
    const safety = setTimeout(() => {
      setShowEndOverlay((prev) => prev || true)
    }, 30 * 1000)
    return () => {
      clearTimeout(safety)
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }
    }
  }, [gameMode, videoUrl, replayKey])

  const advanceToNext = () => {
    setShowEndOverlay(false)
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

  const handleVideoEnded = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    if (gameMode === '1move') {
      router.push(routes.game.final)
      return
    }
    setShowEndOverlay(true)
  }

  const handleReplay = () => {
    setShowEndOverlay(false)
    setReplayKey((k) => k + 1)
  }

  const handleNext = () => advanceToNext()

  const showOverlay = showEndOverlay && gameMode === '3moves'

  if (!videoUrl) {
    return null
  }

  return (
    <div className="flex flex-col h-screen max-h-[100vh] overflow-hidden bg-black relative">
      <div className="relative h-12 z-10 shrink-0">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      {/* Video: 8/10 of screen height; hide when overlay is visible so overlay paints on top. */}
      <div
        className="h-[80vh] relative min-h-0 shrink-0"
        style={
          showOverlay
            ? {
                opacity: 0,
                pointerEvents: 'none',
                position: 'absolute',
                inset: 0,
                zIndex: -1,
              }
            : undefined
        }
      >
        <VideoPlayer
          key={replayKey}
          src={videoUrl}
          onEnded={handleVideoEnded}
          onDuration={gameMode === '3moves' ? handleDuration : undefined}
          className="h-full"
        />
      </div>

      {showOverlay && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-black/80 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          style={{
            pointerEvents: 'auto',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateZ(0)',
          }}
        >
          <div className="flex flex-row gap-3 w-full max-w-sm shrink-0">
            <Button
              variant="outline"
              onClick={handleReplay}
              fullWidth={false}
              className="min-w-[7rem] flex-1 border-white text-haka-green hover:bg-white/10"
            >
              {t('replay')}
            </Button>
            <Button
              onClick={handleNext}
              fullWidth={false}
              className="min-w-[7rem] flex-1 !bg-haka-green hover:!bg-haka-green/90 text-white border-0"
            >
              {t('letsGo')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
