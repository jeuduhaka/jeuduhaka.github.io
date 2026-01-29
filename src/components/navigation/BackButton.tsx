'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrawerOptional } from '@/contexts/DrawerContext'

interface BackButtonProps {
  tintColor?: string
  className?: string
  /** When set, back navigates to this URL instead of history */
  href?: string
}

export function BackButton({ tintColor = '#014DA2', className, href }: BackButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const drawer = useDrawerOptional()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else if (pathname?.startsWith('/info') && drawer) {
      drawer.openDrawer()
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn('absolute top-2 left-2 z-20 p-2', className)}
      style={{ color: tintColor }}
    >
      <ChevronLeft size={32} strokeWidth={2.5} />
    </button>
  )
}
