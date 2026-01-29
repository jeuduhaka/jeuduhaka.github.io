'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BackButton, HomeButton } from '@/components/navigation'
import { Button } from '@/components/ui'
import { useGameStore } from '@/store/gameStore'
import { getCardImage } from '@/data/images'
import { routes } from '@/lib/routes'

export default function ConfirmCardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentDeck, selectedCards, confirmCard, goToNextDeck, undo } = useGameStore()

  const selectedCardName = selectedCards[currentDeck]

  useEffect(() => {
    if (!selectedCardName) {
      router.replace(routes.game.chooseCard)
    }
  }, [selectedCardName, router])

  const handleConfirm = () => {
    confirmCard()

    if (currentDeck === 'green') {
      router.push(routes.game.afterCards)
    } else {
      goToNextDeck()
      router.push(routes.game.chooseCard)
    }
  }

  const handleChooseAnother = () => {
    undo()
    router.back()
  }

  if (!selectedCardName) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="relative h-12">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      {/* Card Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-64 h-96 mb-4">
          <Image
            src={getCardImage(currentDeck, selectedCardName)}
            alt={t(selectedCardName)}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-white font-charcuterie text-2xl mb-6">
          {t(selectedCardName)}
        </h2>
      </div>

      {/* Buttons */}
      <div className="p-4 space-y-3">
        <Button onClick={handleConfirm}>{t('iChooseThisCard')}</Button>
        <Button variant="outline" onClick={handleChooseAnother}>
          {t('chooseAnotherCard')}
        </Button>
      </div>
    </div>
  )
}
