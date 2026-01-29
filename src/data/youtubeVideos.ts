import { CardDeckName } from '@/types'

// YouTube video IDs per deck/card. Fill in with your video IDs.
export const cardYoutubeSources = {
  red: {
    abandonment: 'n64o9eV9RR4',
    anger: 'CXzr3ZFNjUI',
    disgust: 'T9RiwPopK7w',
    doubt: 'v_jU2LVW684',
    threat: '88nvFX39ZM0',
    fear: 'sefcmAfD-So',
    sadness: '69k4pNW6MFM',
    violence: '08fckI3LQO4',
    'joker-red': 'VReclIXnSUc',
  },
  orange: {
    action: 'Ol2n8UltPv8',
    courage: '83alTKngln8',
    movement: 'URpVTv8TEsg',
    patience: 'cr6JtfND-J0',
    preparation: 'QsiAgsBHMj8',
    prevention: 'eu-reD01_ec',
    protection: 'OIdATY0rG48',
    unity: '69l58TjG2to',
    'joker-orange': '1mWJutM-j7k',
  },
  green: {
    love: 'nA4oA4SRuzE',
    calm: 'QpgBtz8toMU',
    confidence: 'geX32kSh5L0',
    energy: 'LpiHqKSsshg',
    'self-esteem': 'PuaVd4-dO1Y',
    strength: 'hVby8f9Of70',
    joy: 'DnNtC3OuB6o',
    peace: 'yvObJlX3Z1M',
    'joker-green': 'Kv3v95sQLt0',
  },
} as const

const YOUTUBE_EMBED_BASE = 'https://www.youtube-nocookie.com/embed'

export function getYoutubeVideoUrl(deck: CardDeckName, cardName: string): string {
  const deckVideos = cardYoutubeSources[deck] as Record<string, string>
  const videoId = deckVideos[cardName] || ''
  return videoId ? `${YOUTUBE_EMBED_BASE}/${videoId}` : ''
}

export function getYoutubeVideoId(deck: CardDeckName, cardName: string): string {
  const deckVideos = cardYoutubeSources[deck] as Record<string, string>
  return deckVideos[cardName] || ''
}
