'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { VideoPlayer } from '@/components/game'
import { Button } from '@/components/ui'
import { useGameStore } from '@/store/gameStore'
import { getYoutubeVideoUrl } from '@/data/youtubeVideos'
import { nextDeck } from '@/types'
import { routes } from '@/lib/routes'

export default function VideoPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { gameMode, currentDeck, selectedCards, setCurrentDeck } = useGameStore()
  const [showEndOverlay, setShowEndOverlay] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cardName = selectedCards[currentDeck]
  const videoUrl = cardName ? getYoutubeVideoUrl(currentDeck, cardName) : ''

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
      setCurrentDeck(next)
      router.refresh()
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
    // 3-moves: show overlay with Replay and Next
    setShowEndOverlay(true)
  }

  const handleReplay = () => {
    setShowEndOverlay(false)
    setReplayKey((k) => k + 1)
  }

  const handleNext = () => advanceToNext()

  const showOverlay = showEndOverlay && gameMode === '3moves'

  return (
    <div className="flex flex-col h-screen bg-black relative">
      <div className="relative h-12 z-10 shrink-0">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      {/* Video: hide when overlay is visible so overlay paints on top. */}
      <div
        className="flex-1 relative min-h-0"
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

      {/* Overlay in-place (no portal) so it always renders when showOverlay is true. */}
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
