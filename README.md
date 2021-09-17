# react-awesome-chip

> Awesome, beautiful &amp; customizable chips

[![NPM](https://img.shields.io/npm/v/react-awesome-chip.svg)](https://www.npmjs.com/package/react-awesome-chip) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-awesome-chip
```

## Example

[Live demo, go check it out!](https://zigliad.github.io/react-awesome-chip/)

<a href="https://zigliad.github.io/react-awesome-chip/"><img src="https://i.imgur.com/n2XVyHp.png" /></a>

## Usage

### Chip

The most simple usage of the awesome chip will be:

```tsx
import React from 'react'
import { Chip } from 'react-awesome-chip'

export default () => {
  return <Chip title='Awesome' color='#536dfe' />
}
```

But the awesome chip has more to offer! You can configure its color, size and type:

```tsx
<Chip
  title='Awesome'
  color='#536dfe'
  type='outlined'
  size='lg'
  onClick={() => console.log('Very Awesome')}
/>
```

The available options for ther "size" prop are: sm, md, lg.<br />
The available options for ther "type" prop are: filled, outlined, filledOutlined, text, filledBold.

### ChipsView

The ChipsView component accepts one property, which is an array of props of chips.<br />
The component nicely renders all the chips in a single view.

```tsx
<ChipsView
  chipsProps={[
    {
      title: 'Awesome 1',
      color: '#536dfe',
      type: 'filledBold'
    },
    {
      title: 'Awesome 2',
      color: '#38c979',
      size: 'sm',
      onClick: console.log
    },
    {
      title: 'Awesome 3',
      color: '#ffbe51',
      type: 'filledOutlined'
    }
  ]}
/>
```

### useFilterView

This hook is very helpful when using filter chips.<br />
It accepts its chips' props, and a unique id for every one of the chips.<br />
The hook returns a state of the ids that are currently ON, and a FilterView component.<br />
The component can be placed as a JSX element, with an onClick prop which accepts the current ON ids.

```tsx
import React from 'react'
import { useFilterView } from 'react-awesome-chip'

export default () => {
  const [idsOn, FilterView] = useFilterView([
    { color: '#536dfe', title: 'Option 1', size: 'md', id: 1 },
    { color: '#536dfe', title: 'Option 2', size: 'md', id: 2 },
    { color: '#536dfe', title: 'Option 3', size: 'md', id: 3 },
    { color: '#536dfe', title: 'Option 4', size: 'md', id: 4 }
  ])

  return (
    <FilterView
      onClick={(idsOn) => console.log('Chips picked: ' + idsOn.join(', '))}
    />
  )
}
```

The second parameter of this hook is a config object.<br />
You can configure the chips that will start as ON, the type of the ON chips, the type of the OFF chips, and some more.

## License

MIT © [Liad Zigdon](https://github.com/zigliad)
