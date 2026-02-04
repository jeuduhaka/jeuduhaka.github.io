import VideoEndClient from './VideoEndClient'

const RED_CARDS = [
  'abandonment',
  'anger',
  'disgust',
  'doubt',
  'threat',
  'fear',
  'sadness',
  'violence',
  'joker-red',
]

const ORANGE_CARDS = [
  'action',
  'courage',
  'movement',
  'patience',
  'preparation',
  'prevention',
  'protection',
  'unity',
  'joker-orange',
]

const GREEN_CARDS = [
  'love',
  'calm',
  'confidence',
  'energy',
  'self-esteem',
  'strength',
  'joy',
  'peace',
  'joker-green',
]

export function generateStaticParams() {
  const params: { deck: string; card: string }[] = []

  for (const card of RED_CARDS) {
    params.push({ deck: 'red', card })
  }
  for (const card of ORANGE_CARDS) {
    params.push({ deck: 'orange', card })
  }
  for (const card of GREEN_CARDS) {
    params.push({ deck: 'green', card })
  }

  return params
}

interface Props {
  params: Promise<{ deck: string; card: string }>
}

export default async function VideoEndPage({ params }: Props) {
  const { deck, card } = await params
  return <VideoEndClient deck={deck} card={decodeURIComponent(card)} />
}
