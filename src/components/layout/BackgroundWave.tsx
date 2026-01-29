'use client'

import { cn } from '@/lib/utils'

interface BackgroundWaveProps {
  children: React.ReactNode
  className?: string
}

export function BackgroundWave({ children, className }: BackgroundWaveProps) {
  return (
    <div
      className={cn('min-h-screen bg-cover bg-center bg-no-repeat', className)}
      style={{
        backgroundImage: "url('/images/fond-bleu-vague-1980x1980.jpg')",
      }}
    >
      {children}
    </div>
  )
}
