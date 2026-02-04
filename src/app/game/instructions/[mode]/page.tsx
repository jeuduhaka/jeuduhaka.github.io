import InstructionsClient from './InstructionsClient'

export function generateStaticParams() {
  return [{ mode: '3moves' }, { mode: '1move' }]
}

interface Props {
  params: Promise<{ mode: string }>
}

export default async function InstructionsPage({ params }: Props) {
  const { mode } = await params
  return <InstructionsClient mode={mode} />
}
