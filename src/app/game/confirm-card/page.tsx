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
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full max-w-64 aspect-[2/3] max-h-[50vh]">
          <Image
            src={getCardImage(currentDeck, selectedCardName)}
            alt={t(selectedCardName)}
            fill
            className="object-contain"
          />
          <div className="absolute bottom-[7.5%] left-0 right-0 flex justify-center">
            <h2 className="text-white font-charcuterie text-4xl drop-shadow-lg px-2 bg-black/30 rounded">
              {t(selectedCardName)}
            </h2>
          </div>
        </div>
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
