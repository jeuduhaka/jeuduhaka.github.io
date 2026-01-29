'use client'

import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { BackButton, HomeButton } from '@/components/navigation'

export default function AdvicePage() {
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
          {t('adviceMenuTitle')}
        </h1>

        <div className="space-y-6">
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-center">{t('firstAdvice')}</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-center">{t('secondAdvice')}</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-center mb-2">{t('thirdAdvice')}</p>
            <p className="text-center font-bold text-haka-blue text-xl">
              {t('adviceFormula')}
            </p>
          </div>

          <p className="text-center">
            {t('adviceFormulaExplanationPart1')}{' '}
            <span className="font-bold text-haka-blue">MANA</span>{' '}
            {t('adviceFormulaExplanationPart2')}
          </p>
        </div>
      </div>
    </BackgroundWave>
  )
}
