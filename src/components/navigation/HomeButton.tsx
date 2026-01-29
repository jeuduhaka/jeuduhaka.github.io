'use client'

import { useRouter } from 'next/navigation'
import { Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGameStore } from '@/store/gameStore'
import { routes } from '@/lib/routes'

interface HomeButtonProps {
  tintColor?: string
  className?: string
}

export function HomeButton({ tintColor = '#014DA2', className }: HomeButtonProps) {
  const router = useRouter()
  const resetGame = useGameStore((state) => state.resetGame)

  const handleClick = () => {
    resetGame()
    router.push(routes.home)
  }

  return (
    <button
      onClick={handleClick}
      className={cn('absolute top-2 right-2 z-20 p-2', className)}
      style={{ color: tintColor }}
    >
      <Home size={28} strokeWidth={2} />
    </button>
  )
}
