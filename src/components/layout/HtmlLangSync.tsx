'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Syncs document.documentElement.lang with i18n.language so html lang updates when language changes. */
export function HtmlLangSync() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language?.split('-')[0] || 'en'
    document.documentElement.lang = lang
  }, [i18n.language])

  return null
}
