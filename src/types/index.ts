export type RedCardName =
  | 'abandonment'
  | 'anger'
  | 'disgust'
  | 'doubt'
  | 'threat'
  | 'fear'
  | 'sadness'
  | 'violence'
  | 'joker-red'

export type OrangeCardName =
  | 'action'
  | 'courage'
  | 'movement'
  | 'patience'
  | 'preparation'
  | 'prevention'
  | 'protection'
  | 'unity'
  | 'joker-orange'

export type GreenCardName =
  | 'love'
  | 'calm'
  | 'confidence'
  | 'energy'
  | 'self-esteem'
  | 'strength'
  | 'joy'
  | 'peace'
  | 'joker-green'

export type CardName = RedCardName | OrangeCardName | GreenCardName

export type CardDeckName = 'red' | 'orange' | 'green'

export type GameMode = '3moves' | '1move'

export type SelectedCards = {
  [key in CardDeckName]: CardName | ''
}

export const DECK_ORDER: CardDeckName[] = ['red', 'orange', 'green']

export function nextDeck(currentDeck: CardDeckName): CardDeckName {
  const index = DECK_ORDER.indexOf(currentDeck)
  return index < 2 ? DECK_ORDER[index + 1] : 'green'
}

export function getDeckColor(deck: CardDeckName): string {
  switch (deck) {
    case 'red':
      return '#B8282E'
    case 'orange':
      return '#F7941C'
    case 'green':
      return '#39B549'
  }
}
