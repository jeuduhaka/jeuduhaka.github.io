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
      <div className="relative">
        <BackButton tintColor="#ffffff" />
        <HomeButton tintColor="#ffffff" />
      </div>

      {/* Card Display - 3/5 of screen */}
      <div className="flex-[3] min-h-0 flex flex-col items-center justify-end p-4 overflow-hidden max-[375px]:flex-[3] max-[375px]:mt-10">
        <div className="relative w-full max-w-64 aspect-[2/3] max-h-full">
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

      {/* Buttons - 2/5 of screen */}
      <div className="flex-[2] min-h-0 flex flex-col justify-start p-4 space-y-3 max-[375px]:p-1">
        <Button onClick={handleConfirm}>{t('iChooseThisCard')}</Button>
        <Button variant="outline" onClick={handleChooseAnother}>
          {t('chooseAnotherCard')}
        </Button>
      </div>
    </div>
  )
}
