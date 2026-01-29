import { CardDeckName } from '@/types'

// Video base URL: CDN from env, or local videos-540x960 folder
const VIDEO_CDN_BASE =
  process.env.NEXT_PUBLIC_VIDEO_CDN_URL || '/videos-540x960'

export const cardVideoSources = {
  red: {
    abandonment: `${VIDEO_CDN_BASE}/abandonment-fr.mp4`,
    anger: `${VIDEO_CDN_BASE}/anger-fr.mp4`,
    disgust: `${VIDEO_CDN_BASE}/disgust-fr.mp4`,
    doubt: `${VIDEO_CDN_BASE}/doubt-fr.mp4`,
    threat: `${VIDEO_CDN_BASE}/threat-fr.mp4`,
    fear: `${VIDEO_CDN_BASE}/fear-fr.mp4`,
    sadness: `${VIDEO_CDN_BASE}/sadness-fr.mp4`,
    violence: `${VIDEO_CDN_BASE}/violence-fr.mp4`,
    'joker-red': `${VIDEO_CDN_BASE}/joker-red-fr.mp4`,
  },
  orange: {
    action: `${VIDEO_CDN_BASE}/action-fr.mp4`,
    courage: `${VIDEO_CDN_BASE}/courage-fr.mp4`,
    movement: `${VIDEO_CDN_BASE}/movement-fr.mp4`,
    patience: `${VIDEO_CDN_BASE}/patience-fr.mp4`,
    preparation: `${VIDEO_CDN_BASE}/preparation-fr.mp4`,
    prevention: `${VIDEO_CDN_BASE}/prevention-fr.mp4`,
    protection: `${VIDEO_CDN_BASE}/protection-fr.mp4`,
    unity: `${VIDEO_CDN_BASE}/unity-fr.mp4`,
    'joker-orange': `${VIDEO_CDN_BASE}/joker-orange-fr.mp4`,
  },
  green: {
    love: `${VIDEO_CDN_BASE}/love-fr.mp4`,
    calm: `${VIDEO_CDN_BASE}/calm-fr.mp4`,
    confidence: `${VIDEO_CDN_BASE}/confidence-fr.mp4`,
    energy: `${VIDEO_CDN_BASE}/energy-fr.mp4`,
    'self-esteem': `${VIDEO_CDN_BASE}/self-esteem-fr.mp4`,
    strength: `${VIDEO_CDN_BASE}/strength-fr.mp4`,
    joy: `${VIDEO_CDN_BASE}/joy-fr.mp4`,
    peace: `${VIDEO_CDN_BASE}/peace-fr.mp4`,
    'joker-green': `${VIDEO_CDN_BASE}/joker-green-fr.mp4`,
  },
} as const

export function getVideoUrl(deck: CardDeckName, cardName: string): string {
  const deckVideos = cardVideoSources[deck] as Record<string, string>
  return deckVideos[cardName] || ''
}
