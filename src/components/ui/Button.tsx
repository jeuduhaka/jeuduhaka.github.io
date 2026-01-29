'use client'

import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
}

export function Button({
  children,
  className,
  variant = 'primary',
  fullWidth = true,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'py-3 px-6 rounded-md text-base font-semibold transition-all active:scale-95',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-haka-blue text-white hover:bg-blue-800',
        variant === 'outline' && 'bg-white text-black border-2 border-black hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
