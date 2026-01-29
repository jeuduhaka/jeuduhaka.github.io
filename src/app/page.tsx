'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { Button } from '@/components/ui'
import { MenuButton } from '@/components/navigation'
import { LanguagePicker } from '@/components/game'
import { useGameStore } from '@/store/gameStore'
import { useDrawer } from '@/contexts/DrawerContext'
import { routes } from '@/lib/routes'

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const setGameMode = useGameStore((state) => state.setGameMode)
  const { openDrawer } = useDrawer()

  const handlePlay3Moves = () => {
    setGameMode('3moves')
    router.push(routes.game.instructions('3moves'))
  }

  const handlePlay1Move = () => {
    setGameMode('1move')
    router.push(routes.game.instructions('1move'))
  }

  return (
    <BackgroundWave className="flex flex-col h-screen">
      {/* Header */}
      <div className="relative h-12">
        <MenuButton onClick={openDrawer} />
        <LanguagePicker />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        {/* Title */}
        <h1 className="font-charcuterie text-haka-blue text-4xl text-center mb-2">
          {t('hakaGame')}
        </h1>

        {/* Subtitle */}
        <p className="text-haka-blue text-center text-sm mb-4">
          {t('guidedByLudocoach')}
        </p>

        {/* Logo */}
        <div className="my-4">
          <Image
            src="/images/jeu-du-haka-logo-200x200.png"
            alt="Jeu du Haka Logo"
            width={150}
            height={150}
            className="rounded-lg"
            priority
          />
        </div>

        {/* Mantra */}
        <p className="text-haka-blue text-center text-lg font-semibold italic mb-6">
          {t('powerIsInYou')}
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-3">
          <Button onClick={handlePlay3Moves}>{t('play3Moves')}</Button>
          <Button onClick={handlePlay1Move}>{t('play1Move')}</Button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-gray-700">
        <p>Hinenao Kimitete - Tehotu Tauraatua</p>
        <p>Marc Kucharz</p>
        <p className="mt-2">© Le Jeu du Haka - {t('allRightsReserved')}</p>
      </div>
    </BackgroundWave>
  )
}
