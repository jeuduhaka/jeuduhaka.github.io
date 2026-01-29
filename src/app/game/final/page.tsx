'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { Button } from '@/components/ui'
import { BackButton, HomeButton } from '@/components/navigation'
import { useGameStore } from '@/store/gameStore'
import { routes } from '@/lib/routes'

export default function FinalPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const resetGame = useGameStore((state) => state.resetGame)

  const handleThankYou = () => {
    resetGame()
    router.replace(routes.home)
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
        <div className="mb-6">
          <Image
            src="/images/jeu-du-haka-logo-200x200.png"
            alt="Jeu du Haka Logo"
            width={120}
            height={120}
            className="rounded-lg"
          />
        </div>

        <p className="text-center text-lg mb-8 max-w-xs">{t('manaActivated')}</p>

        <div className="w-full max-w-xs">
          <Button onClick={handleThankYou}>{t('thankYou')}</Button>
        </div>
      </div>
    </BackgroundWave>
  )
}
