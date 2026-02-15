import type { CardDeckName } from '@/types'

/**
 * Central route paths for the app. Use these for navigation so URLs stay consistent.
 * choose-card and video include deck/card so state can be restored from URL.
 */
export const routes = {
  home: '/',
  // Game flow
  game: {
    instructions: (mode: '1move' | '3moves') => `/game/instructions/${mode}`,
    chooseCard: (deck: CardDeckName) => `/game/choose-card/${deck}`,
    afterCards: '/game/after-cards',
    video: (deck: CardDeckName, card: string) => `/game/video/${deck}/${encodeURIComponent(card)}`,
    videoEnd: (deck: CardDeckName, card: string) =>
      `/game/video/${deck}/${encodeURIComponent(card)}/end`,
    final: '/game/final',
  },
  // Info pages
  info: {
    gameGoal: '/info/game-goal',
    advice: '/info/advice',
    giftCards: '/info/gift-cards',
    authors: '/info/authors',
    gamesList: '/info/games-list',
  },
} as const
