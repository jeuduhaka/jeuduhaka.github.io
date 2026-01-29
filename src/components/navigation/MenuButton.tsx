'use client'

import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuButtonProps {
  onClick: () => void
  tintColor?: string
  className?: string
}

export function MenuButton({ onClick, tintColor = '#014DA2', className }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('absolute top-2 left-2 z-20 p-2', className)}
      style={{ color: tintColor }}
    >
      <Menu size={32} strokeWidth={2} />
    </button>
  )
}
