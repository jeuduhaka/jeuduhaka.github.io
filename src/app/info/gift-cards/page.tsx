'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { Button } from '@/components/ui'
import { BackButton, HomeButton } from '@/components/navigation'
import { cardImageSources } from '@/data/images'
import { GreenCardName } from '@/types'

const giftCardNames: GreenCardName[] = [
  'love',
  'calm',
  'confidence',
  'energy',
  'self-esteem',
  'strength',
  'joy',
  'peace',
]

export default function GiftCardsPage() {
  const { t, i18n } = useTranslation()
  const [selectedCard, setSelectedCard] = useState<GreenCardName | null>(null)

  const language = i18n.language === 'fr' ? 'fr' : 'en'
  const gifts = cardImageSources.gifts[language] as Record<string, string>

  const handleShare = async () => {
    if (!selectedCard) return

    const shareData = {
      title: t('giftCard'),
      text: t('findManaWithGiftCard'),
      // In a real app, this would be a shareable URL or image
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback for browsers that don't support share API
      alert(t('findManaWithGiftCard'))
    }
  }

  return (
    <BackgroundWave className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="relative h-12 flex-shrink-0">
        <BackButton />
        <HomeButton />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <h1 className="font-charcuterie text-haka-blue text-2xl text-center mb-4">
          {t('sendGiftCard')}
        </h1>

        <p className="text-sm text-center mb-2">{t('sendGiftCardTextPart1')}</p>
        <p className="text-sm text-center mb-4">{t('sendGiftCardTextPart2')}</p>

        <h2 className="font-bold text-center mb-3">{t('howToSendGiftCardTitle')}</h2>
        <p className="text-sm text-center mb-4">{t('howToSendGiftCardText')}</p>

        {/* Gift Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {giftCardNames.map((cardName) => (
            <button
              key={cardName}
              onClick={() => setSelectedCard(cardName)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-4 transition-all ${
                selectedCard === cardName
                  ? 'border-haka-green scale-105'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={gifts[cardName]}
                alt={t(cardName)}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </BackgroundWave>
  )
}
