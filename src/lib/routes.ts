/**
 * Central route paths for the app. Use these for navigation so URLs stay consistent.
 */
export const routes = {
  home: '/',
  // Game flow
  game: {
    instructions: (mode: '1move' | '3moves') => `/game/instructions/${mode}`,
    chooseCard: '/game/choose-card',
    afterCards: '/game/after-cards',
    video: '/game/video',
    final: '/game/final',
  },
  // Info pages
  info: {
    gameGoal: '/info/game-goal',
    advice: '/info/advice',
    giftCards: '/info/gift-cards',
    authors: '/info/authors',
    gamesList: '/info/games-list',
    acknowledgements: '/info/acknowledgements',
  },
} as const
