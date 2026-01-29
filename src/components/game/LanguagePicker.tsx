'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const SUPPORTED_LANGS = ['en', 'fr', 'zh'] as const
type SupportedLang = (typeof SUPPORTED_LANGS)[number]

function normalizeLang(lang: string | undefined): SupportedLang {
  const base = lang?.split('-')[0]?.toLowerCase() || 'en'
  return SUPPORTED_LANGS.includes(base as SupportedLang) ? (base as SupportedLang) : 'en'
}

interface LanguagePickerProps {
  className?: string
}

export function LanguagePicker({ className }: LanguagePickerProps) {
  const { i18n } = useTranslation()
  const currentLang = normalizeLang(i18n.language || i18n.resolvedLanguage)

  return (
    <select
      value={currentLang}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={cn(
        'absolute top-2 right-12 z-20 px-2 py-1 bg-white/90 rounded text-sm font-semibold border border-gray-300',
        className
      )}
    >
      <option value="en">🇺🇸 English</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  )
}
