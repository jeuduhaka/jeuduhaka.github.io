'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { Button } from '@/components/ui'
import { BackButton, HomeButton } from '@/components/navigation'
import { getDeckColor } from '@/types'
import { routes } from '@/lib/routes'

interface Props {
  mode: string
}

export default function InstructionsClient({ mode }: Props) {
  const router = useRouter()
  const { t } = useTranslation()

  const is3Moves = mode === '3moves'

  const handlePlay = () => {
    // 3moves: start with red deck; 1move: green deck only
    router.push(routes.game.chooseCard(is3Moves ? 'red' : 'green'))
  }

  return (
    <BackgroundWave className="flex flex-col h-screen">
      {/* Header */}
      <div className="relative h-12">
        <BackButton href={routes.home} />
        <HomeButton />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {is3Moves ? (
          <>
            <p className="text-center text-lg mb-6">{t('chooseCards')}</p>
            <div className="space-y-2 mb-8">
              <p className="text-center">
                <span className="font-bold" style={{ color: getDeckColor('red') }}>
                  1. {t('having')}
                </span>
              </p>
              <p className="text-center">
                <span className="font-bold" style={{ color: getDeckColor('orange') }}>
                  2. {t('doing')}
                </span>
              </p>
              <p className="text-center">
                <span className="font-bold" style={{ color: getDeckColor('green') }}>
                  3. {t('being')}
                </span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-center text-lg mb-8">{t('oneMoveDescription')}</p>
        )}

        <div className="w-full max-w-xs">
          <Button onClick={handlePlay}>{t('play')}</Button>
        </div>
      </div>
    </BackgroundWave>
  )
}
