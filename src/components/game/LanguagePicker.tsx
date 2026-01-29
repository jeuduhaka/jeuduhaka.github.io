'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface LanguagePickerProps {
  className?: string
}

export function LanguagePicker({ className }: LanguagePickerProps) {
  const { i18n } = useTranslation()

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={cn(
        'absolute top-2 right-12 z-20 px-2 py-1 bg-white/90 rounded text-sm font-semibold border border-gray-300',
        className
      )}
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="zh">中文</option>
    </select>
  )
}
