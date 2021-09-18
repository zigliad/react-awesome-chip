import { Divider, Typography } from '@material-ui/core'
import React from 'react'
import { Chip, ChipsView, useFilterView } from 'react-awesome-chip'

import { generate } from './generateChips'

import 'react-awesome-chip/dist/index.css'

export type PropsOf<
  TComponentOrTProps
> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps

const chipsProps: PropsOf<typeof Chip>[] = generate(66)

const App = () => {
  const [idsOn, FilterView] = useFilterView(
    [
      { color: '#536dfe', title: 'Option 1', id: 1 },
      { color: '#536dfe', title: 'Option 2', id: 2 },
      { color: '#536dfe', title: 'Option 3', id: 3 },
      { color: '#536dfe', title: 'Option 4', id: 4 }
    ],
    {
      defaultIdsOn: [3]
    }
  )

  return (
    <div style={{ padding: 42 }}>
      <Typography variant='h4'>Awesome Chips</Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        Our stunning, super simple and configurable chips!
      </Typography>
      <Divider style={{ margin: '1rem 0' }} />
      <ChipsView chipsProps={chipsProps} />
      <Typography variant='h4' style={{ marginTop: '4rem' }}>
        Filter View
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        Use our awesome chips to create an amazing, simple and configurable
        filter view.
      </Typography>
      <Divider style={{ margin: '1rem 0' }} />
      <FilterView onClick={() => {}} />
      <Typography
        variant='subtitle1'
        color='textSecondary'
        style={{ margin: '1rem 0' }}
      >
        Chips picked: {idsOn.join(', ')}
      </Typography>
    </div>
  )
}

export default App
