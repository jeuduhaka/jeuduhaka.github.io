import { CardDeckName } from '@/types'

type CardImages = {
  [key in CardDeckName]: {
    [key: string]: string
  }
}

export const cardImageSources = {
  logo: '/images/jeu-du-haka-logo-200x200.png',
  wave: '/images/fond-bleu-vague-1980x1980.jpg',
  back: {
    red: '/images/cards/back/red/back-card-red.png',
    orange: '/images/cards/back/orange/back-card-orange.png',
    green: '/images/cards/back/green/back-card-green.png',
  },
  front: {
    red: {
      abandonment: '/images/cards/front/red/abandonment/card-red-abandonment-no-text.png',
      anger: '/images/cards/front/red/anger/card-red-anger-no-text.png',
      disgust: '/images/cards/front/red/disgust/card-red-disgust-no-text.png',
      doubt: '/images/cards/front/red/doubt/card-red-doubt-no-text.png',
      threat: '/images/cards/front/red/threat/card-red-threat-no-text.png',
      fear: '/images/cards/front/red/fear/card-red-fear-no-text.png',
      sadness: '/images/cards/front/red/sadness/card-red-sadness-no-text.png',
      violence: '/images/cards/front/red/violence/card-red-violence-no-text.png',
      'joker-red': '/images/cards/front/red/joker/card-red-joker-no-text.png',
    },
    orange: {
      action: '/images/cards/front/orange/action/card-orange-action-no-text.png',
      courage: '/images/cards/front/orange/courage/card-orange-courage-no-text.png',
      movement: '/images/cards/front/orange/movement/card-orange-movement-no-text.png',
      patience: '/images/cards/front/orange/patience/card-orange-patience-no-text.png',
      preparation: '/images/cards/front/orange/preparation/card-orange-preparation-no-text.png',
      prevention: '/images/cards/front/orange/prevention/card-orange-prevention-no-text.png',
      protection: '/images/cards/front/orange/protection/card-orange-protection-no-text.png',
      unity: '/images/cards/front/orange/unity/card-orange-unity-no-text.png',
      'joker-orange': '/images/cards/front/orange/joker/card-orange-joker-no-text.png',
    },
    green: {
      love: '/images/cards/front/green/love/card-green-love-no-text.png',
      calm: '/images/cards/front/green/calm/card-green-calm-no-text.png',
      confidence: '/images/cards/front/green/confidence/card-green-confidence-no-text.png',
      energy: '/images/cards/front/green/energy/card-green-energy-no-text.png',
      'self-esteem': '/images/cards/front/green/self-esteem/card-green-self-esteem-no-text.png',
      strength: '/images/cards/front/green/strength/card-green-strength-no-text.png',
      joy: '/images/cards/front/green/joy/card-green-joy-no-text.png',
      peace: '/images/cards/front/green/peace/card-green-peace-no-text.png',
      'joker-green': '/images/cards/front/green/joker/card-green-joker-no-text.png',
    },
  } as CardImages,
  gifts: {
    en: {
      love: '/images/giftcards/en/gift-card-love-en.jpg',
      calm: '/images/giftcards/en/gift-card-calm-en.jpg',
      confidence: '/images/giftcards/en/gift-card-confidence-en.jpg',
      energy: '/images/giftcards/en/gift-card-energy-en.jpg',
      'self-esteem': '/images/giftcards/en/gift-card-self-esteem-en.jpg',
      strength: '/images/giftcards/en/gift-card-strength-en.jpg',
      joy: '/images/giftcards/en/gift-card-joy-en.jpg',
      peace: '/images/giftcards/en/gift-card-peace-en.jpg',
    },
    fr: {
      love: '/images/giftcards/fr/gift-card-love-fr.jpg',
      calm: '/images/giftcards/fr/gift-card-calm-fr.jpg',
      confidence: '/images/giftcards/fr/gift-card-confidence-fr.jpg',
      energy: '/images/giftcards/fr/gift-card-energy-fr.jpg',
      'self-esteem': '/images/giftcards/fr/gift-card-self-esteem-fr.jpg',
      strength: '/images/giftcards/fr/gift-card-strength-fr.jpg',
      joy: '/images/giftcards/fr/gift-card-joy-fr.jpg',
      peace: '/images/giftcards/fr/gift-card-peace-fr.jpg',
    },
  },
}

export function getCardImage(deck: CardDeckName, cardName: string): string {
  return cardImageSources.front[deck][cardName] || ''
}

export function getBackImage(deck: CardDeckName): string {
  return cardImageSources.back[deck]
}
