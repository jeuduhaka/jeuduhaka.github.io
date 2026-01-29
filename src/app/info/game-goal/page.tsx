'use client'

import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { BackButton, HomeButton } from '@/components/navigation'
import { getDeckColor } from '@/types'

export default function GameGoalPage() {
  const { t } = useTranslation()

  return (
    <BackgroundWave className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="relative h-12 flex-shrink-0">
        <BackButton />
        <HomeButton />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <h1 className="font-charcuterie text-haka-blue text-2xl text-center mb-6">
          {t('gameGoalTitle')}
        </h1>

        <p className="text-center text-base mb-6">{t('transformYourEnergy')}</p>

        <div className="mb-6">
          <p className="text-center mb-4">
            {t('gameGoalParagraph1Part1')}
            <span className="font-bold">{t('limitingEmotion')}</span>
            {t('gameGoalParagraph1Part2')}
            {t('gameGoalParagraph1Part3')}
          </p>

          <div className="space-y-1 text-center">
            <p>
              <span className="font-bold" style={{ color: getDeckColor('red') }}>
                1. {t('having')}
              </span>
            </p>
            <p>
              <span className="font-bold" style={{ color: getDeckColor('orange') }}>
                2. {t('doing')}
              </span>
            </p>
            <p>
              <span className="font-bold" style={{ color: getDeckColor('green') }}>
                3. {t('being')}
              </span>
            </p>
          </div>
        </div>

        <p className="text-center">
          {t('gameGoalParagraph2Part1')} {t('gameGoalParagraph2Part2')}{' '}
          {t('gameGoalParagraph2Part3')}{' '}
          <span className="font-bold text-haka-blue">MANA</span>{' '}
          {t('powerParenthesis')}
        </p>
      </div>
    </BackgroundWave>
  )
}
