'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { Button } from '@/components/ui'
import { BackButton, HomeButton } from '@/components/navigation'
import { useGameStore } from '@/store/gameStore'
import { getDeckColor, DECK_ORDER } from '@/types'
import { routes } from '@/lib/routes'

export default function AfterCardsPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { selectedCards, setCurrentDeck } = useGameStore()

  const handleLetsGo = () => {
    setCurrentDeck('red')
    router.push(routes.game.video)
  }

  return (
    <BackgroundWave className="flex flex-col h-screen">
      {/* Header */}
      <div className="relative h-12">
        <BackButton />
        <HomeButton />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <p className="text-center text-lg mb-4">{t('youHaveChosen')}</p>

        <div className="space-y-2 mb-4">
          {DECK_ORDER.map((deck) => {
            const cardName = selectedCards[deck]
            if (!cardName) return null
            return (
              <p key={deck} className="text-center">
                <span
                  className="font-bold text-xl"
                  style={{ color: getDeckColor(deck) }}
                >
                  {t(cardName)}
                </span>
              </p>
            )
          })}
        </div>

        <p className="text-center text-base mb-8">{t('placeYourself')}</p>

        <div className="w-full max-w-xs">
          <Button onClick={handleLetsGo}>{t('letsGo')}</Button>
        </div>
      </div>
    </BackgroundWave>
  )
}
