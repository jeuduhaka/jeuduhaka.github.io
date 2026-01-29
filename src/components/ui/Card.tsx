'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CardProps {
  name: string
  imageSrc: string
  onClick?: () => void
  className?: string
}

export function Card({ name, imageSrc, onClick, className }: CardProps) {
  // Never pass empty src to Image (can trigger CORS/data URL errors in some browsers)
  const safeSrc = imageSrc || '/images/jeu-du-haka-logo-200x200.png'

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-[calc(33.333%-4px)] aspect-[2/3] bg-transparent transition-transform active:scale-95',
        className
      )}
    >
      <Image
        src={safeSrc}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 33vw, 200px"
      />
      <div className="absolute bottom-[5%] left-0 right-0 flex justify-center">
        <span className="text-white font-charcuterie text-lg tracking-wide drop-shadow-lg px-1 bg-black/30 rounded">
          {name}
        </span>
      </div>
    </button>
  )
}
