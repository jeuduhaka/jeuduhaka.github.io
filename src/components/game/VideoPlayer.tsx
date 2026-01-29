'use client'

import { useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  src: string
  onEnded: () => void
  /** Called with video duration in seconds when known (YouTube). Use for fallback overlay on mobile. */
  onDuration?: (seconds: number) => void
  autoPlay?: boolean
  className?: string
}

const isYoutubeUrl = (url: string) =>
  /youtube\.com\/embed|youtube-nocookie\.com\/embed/.test(url)

function getYoutubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/embed|youtube-nocookie\.com\/embed)\/([^/?]+)/)
  return match ? match[1] : null
}

export function VideoPlayer({ src, onEnded, onDuration, autoPlay = true, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeContainerRef = useRef<HTMLDivElement>(null)
  const youtubePlayerRef = useRef<{ getCurrentTime?: () => number; getDuration?: () => number; destroy?: () => void } | null>(null)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onEndedRef = useRef(onEnded)
  const onDurationRef = useRef(onDuration)
  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])
  useEffect(() => {
    onDurationRef.current = onDuration
  }, [onDuration])

  useEffect(() => {
    const video = videoRef.current
    if (video && autoPlay && !isYoutubeUrl(src)) {
      video.play().catch((error) => {
        console.warn('Autoplay prevented:', error)
      })
    }
  }, [autoPlay, src])

  const handleYoutubeStateChange = useCallback((event: { data: number }) => {
    // YT.PlayerState.ENDED === 0
    if (event.data === 0) {
      onEndedRef.current()
    }
  }, [])

  useEffect(() => {
    if (!src || !isYoutubeUrl(src)) return
    const videoId = getYoutubeVideoId(src)
    if (!videoId || !youtubeContainerRef.current) return

    const YT = (typeof window !== 'undefined' ? (window as any).YT : undefined) as
      | { Player: new (el: HTMLElement, opts: any) => any }
      | undefined

    const loadYoutubeApi = () => {
      const YTGlobal = (window as any).YT
      if (typeof YTGlobal === 'undefined' || !YTGlobal.Player) return
      const container = youtubeContainerRef.current
      if (!container) return
      const player = new YTGlobal.Player(container, {
        videoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          playsinline: 1,
          rel: 0,
          cc_load_policy: 1,
        },
        events: {
          onStateChange: handleYoutubeStateChange,
          onReady: () => {
            youtubePlayerRef.current = player
            try {
              const duration = player?.getDuration?.()
              if (typeof duration === 'number' && duration > 0) {
                onDurationRef.current?.(duration)
              }
            } catch {
              // ignore
            }
            // Poll currentTime vs duration (onStateChange ENDED is unreliable on iOS/Android)
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
            pollIntervalRef.current = setInterval(() => {
              try {
                const current = player?.getCurrentTime?.()
                const duration = player?.getDuration?.()
                if (
                  typeof current === 'number' &&
                  typeof duration === 'number' &&
                  duration > 0 &&
                  current >= duration - 0.5
                ) {
                  if (pollIntervalRef.current) {
                    clearInterval(pollIntervalRef.current)
                    pollIntervalRef.current = null
                  }
                  onEndedRef.current()
                }
              } catch {
                // ignore
              }
            }, 800)
          },
        },
      })
    }

    if (YT?.Player) {
      loadYoutubeApi()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript?.parentNode?.insertBefore(tag, firstScript)
      ;(window as any).onYouTubeIframeAPIReady = loadYoutubeApi
    }

    return () => {
      delete (window as any).onYouTubeIframeAPIReady
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      try {
        youtubePlayerRef.current?.destroy?.()
      } catch {
        // ignore
      }
      youtubePlayerRef.current = null
      // Clear the container to prevent React DOM removal errors
      if (youtubeContainerRef.current) {
        youtubeContainerRef.current.innerHTML = ''
      }
    }
  }, [src, autoPlay, handleYoutubeStateChange])

  const enterFullscreen = async () => {
    const video = videoRef.current
    if (video) {
      try {
        if (video.requestFullscreen) {
          await video.requestFullscreen()
        } else if ((video as any).webkitEnterFullscreen) {
          ;(video as any).webkitEnterFullscreen()
        }
      } catch (e) {
        console.warn('Fullscreen not available:', e)
      }
    }
  }

  if (!src) {
    return (
      <div className={cn('flex items-center justify-center bg-black text-white', className)}>
        <p>Video not configured for this card.</p>
      </div>
    )
  }

  if (isYoutubeUrl(src)) {
    return (
      <div className={cn('relative w-full h-full bg-black', className)}>
        <div ref={youtubeContainerRef} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:object-contain" />
      </div>
    )
  }

  return (
    <div className={cn('relative w-full h-full bg-black', className)}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        playsInline
        controls
        autoPlay={autoPlay}
        onEnded={onEnded}
        onClick={enterFullscreen}
      />
    </div>
  )
}
