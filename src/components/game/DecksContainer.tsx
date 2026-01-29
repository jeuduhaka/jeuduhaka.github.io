'use client'

import { cn } from '@/lib/utils'

interface DecksContainerProps {
  children: React.ReactNode
  className?: string
}

export function DecksContainer({ children, className }: DecksContainerProps) {
  return (
    <div className={cn('flex flex-row gap-1 min-w-0 min-h-0', className)}>
      {children}
    </div>
  )
}
