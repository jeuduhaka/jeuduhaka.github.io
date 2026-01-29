'use client'

import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { BackButton, HomeButton } from '@/components/navigation'

const acknowledgements = [
  'Tehotu Tauraatua',
  'Hinenao Kimitete',
  'Laetitia Monat',
  'Emilie Pariset',
  'Rachel Phelix',
  'Jean-Baptiste Descroix-Vernier',
  'Hervé Marly',
  'Philippe des Pallières',
]

export default function AcknowledgementsPage() {
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
          {t('acknowledgementsMenu')}
        </h1>

        <p className="text-center mb-4">{t('acknowledgementsText')}</p>

        <div className="bg-white/50 rounded-lg p-4">
          <ul className="space-y-2 text-center">
            {acknowledgements.map((name) => (
              <li key={name} className="text-sm font-medium">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BackgroundWave>
  )
}
