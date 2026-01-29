'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BackgroundWave } from '@/components/layout'
import { BackButton, HomeButton } from '@/components/navigation'

export default function AuthorsPage() {
  const { t } = useTranslation()

  const authors = [
    { name: 'Tehotu', description: t('tehotuDescription') },
    { name: 'Hinenao', description: t('hinenaoDescription') },
    { name: 'Marc', description: t('marcDescription') },
  ]

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
          {t('authorsTitle')}
        </h1>

        <div className="flex justify-center mb-6">
          <Image
            src="/images/authors.png"
            alt="Authors"
            width={250}
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {authors.map((author) => (
            <div key={author.name} className="bg-white/50 rounded-lg p-4">
              <h3 className="font-bold text-haka-blue text-lg">{author.name}</h3>
              <p className="text-sm">{author.description}</p>
            </div>
          ))}
        </div>
      </div>
    </BackgroundWave>
  )
}
