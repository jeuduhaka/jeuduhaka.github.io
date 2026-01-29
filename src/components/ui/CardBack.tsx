'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CardDeckName } from '@/types'
import { cardImageSources } from '@/data/images'

interface CardBackProps {
  deck: CardDeckName
  onClick?: () => void
  className?: string
  isActive?: boolean
}

export function CardBack({ deck, onClick, className, isActive = true }: CardBackProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex-1 aspect-[2/3] transition-all',
        isActive ? 'opacity-100' : 'opacity-50',
        onClick && 'active:scale-95',
        className
      )}
      disabled={!onClick}
    >
      <Image
        src={cardImageSources.back[deck]}
        alt={`${deck} deck`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 33vw, 200px"
      />
    </button>
  )
}
