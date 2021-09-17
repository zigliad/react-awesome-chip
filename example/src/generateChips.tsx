import { Chip, ChipSize, ChipType } from '../../dist'
import { PropsOf } from './App'

const random = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const generate: (amount: number) => PropsOf<typeof Chip>[] = (
  amount: number
) => {
  const sizes: ChipSize[] = ['sm', 'md', 'lg']
  const types: ChipType[] = [
    'filled',
    'outlined',
    'filledOutlined',
    'text',
    'filledBold'
  ]

  const colors = ['#536dfe', '#38c979', '#ffbe51', '#ff5677', '#16cae6']

  let props: PropsOf<typeof Chip>[] = []

  for (let i = 0; i < amount; i++) {
    const size = random(sizes)
    const type = random(types)
    const color = random(colors)
    props.push({
      title: 'Awesome',
      size,
      type,
      color
    })
  }

  return props
}
