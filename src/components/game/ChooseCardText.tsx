'use client'

import { useTranslation } from 'react-i18next'
import { CardDeckName, getDeckColor } from '@/types'

interface ChooseCardTextProps {
  currentDeck: CardDeckName
}

export function ChooseCardText({ currentDeck }: ChooseCardTextProps) {
  const { t } = useTranslation()

  const getStepInfo = () => {
    switch (currentDeck) {
      case 'red':
        return { step: '1', label: t('having') }
      case 'orange':
        return { step: '2', label: t('doing') }
      case 'green':
        return { step: '3', label: t('being') }
    }
  }

  const { step, label } = getStepInfo()
  const color = getDeckColor(currentDeck)

  return (
    <div className="flex justify-center items-center py-2">
      <span
        className="font-charcuterie text-xl tracking-wide"
        style={{ color }}
      >
        {step}. {label}
      </span>
    </div>
  )
}
