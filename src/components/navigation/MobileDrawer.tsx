'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Home, Target, Lightbulb, Gift, Mail, Users, List, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { MenuButton } from './MenuButton'
import { routes } from '@/lib/routes'
import { useDrawer } from '@/contexts/DrawerContext'

interface MobileDrawerProps {
  tintColor?: string
  /** When false, only the drawer panel is rendered (e.g. in layout); trigger is elsewhere */
  showMenuButton?: boolean
}

export function MobileDrawer({ tintColor = '#014DA2', showMenuButton = true }: MobileDrawerProps) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const menuItems = [
    { href: routes.home, icon: Home, label: t('backToGame') },
    { href: routes.info.gameGoal, icon: Target, label: t('gameGoalTitle') },
    { href: routes.info.advice, icon: Lightbulb, label: t('adviceMenuTitle') },
    ...(language !== 'zh'
      ? [{ href: routes.info.giftCards, icon: Gift, label: t('sendGiftCardLabel') }]
      : []),
    {
      href: 'https://marckucharz.com/contact/',
      icon: Mail,
      label: t('contactUs'),
      external: true,
    },
    { href: routes.info.authors, icon: Users, label: t('authorsTitle') },
    { href: routes.info.gamesList, icon: List, label: t('gamesListTitle') },
    { href: routes.info.acknowledgements, icon: Heart, label: t('acknowledgementsMenu') },
  ]

  return (
    <>
      {showMenuButton && (
        <MenuButton onClick={openDrawer} tintColor={tintColor} />
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-orange-100 z-40 transform transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={closeDrawer}
          className="absolute top-3 right-3 p-2 text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="pt-12 px-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/jeu-du-haka-logo-200x200.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 py-3 px-4 font-semibold text-gray-800 hover:bg-orange-200 rounded-lg transition-colors"
                  onClick={closeDrawer}
                >
                  <item.icon size={20} className="opacity-70" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 py-3 px-4 font-semibold text-gray-800 hover:bg-orange-200 rounded-lg transition-colors"
                  onClick={closeDrawer}
                >
                  <item.icon size={20} className="opacity-70" />
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-8 pt-4 border-t border-orange-300 text-center text-sm text-gray-600">
            <p>{t('developedBy')}</p>
            <p className="font-semibold">Marc Kucharz</p>
          </div>
        </div>
      </div>
    </>
  )
}
