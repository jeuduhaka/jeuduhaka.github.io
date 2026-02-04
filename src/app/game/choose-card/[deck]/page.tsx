import ChooseCardClient from './ChooseCardClient'

export function generateStaticParams() {
  return [{ deck: 'red' }, { deck: 'orange' }, { deck: 'green' }]
}

interface Props {
  params: Promise<{ deck: string }>
}

export default async function ChooseCardPage({ params }: Props) {
  const { deck } = await params
  return <ChooseCardClient deck={deck} />
}
