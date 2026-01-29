'use client'

import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { BackButton, HomeButton } from '@/components/navigation'

const games = [
  "Le jeu du Ho'Oponopono",
  "Le Jeu de l'Alchimiste",
  'Le Jeu du Haka',
  "Le Jeu de l'Entraide",
  "Plus malin que le diable - Le jeu",
  "Le Jeu des Vies Antérieures",
  "Horaklès le Jeu du Héros",
  "Le Jeu des Forces Intérieures",
  "Le Jeu de la Paix Intérieure",
  "Je(u) vote !",
  "Le Jeu de l'Humour",
  "Le Jeu de la démanipulation",
  "Le jeu : réfléchissez et devenez riche",
  "Le Jeu des Sept Lois Spirituelles du Succès",
  "Le Jeu des Accords Toltèques",
  "Conversations avec Dieu, le Jeu"
];

export default function GamesListPage() {
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
          {t('gamesListTitle')}
        </h1>

        <div className="bg-white/50 rounded-lg p-4">
          <ul className="space-y-2">
            {games.map((game) => (
              <li key={game} className="text-sm">
                • {game}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BackgroundWave>
  )
}
