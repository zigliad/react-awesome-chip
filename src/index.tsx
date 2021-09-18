import { ButtonBase, Grid, GridSpacing } from '@material-ui/core'
import React, { DispatchWithoutAction, FC, PropsWithChildren, useState } from 'react'

export type PropsOf<
  TComponentOrTProps
> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps

export type Function<T, U> = (a: T) => U
export type Action1<T> = (a: T) => void

export type ChipSize = 'sm' | 'md' | 'lg'
export type ChipType =
  | 'filled'
  | 'outlined'
  | 'filledOutlined'
  | 'text'
  | 'filledBold'

const useTypeToStyles: Function<
  string,
  Record<ChipType, React.CSSProperties>
> = (color: string) => {
  return {
    text: { color: color },
    filled: {
      backgroundColor: `${color}26`,
      color: color
    },
    outlined: {
      boxShadow: `inset 0 0 0 1px ${color}`,
      color: color
    },
    filledOutlined: {
      backgroundColor: `${color}26`,
      boxShadow: `inset 0 0 0 1px ${color}`,
      color: color
    },
    filledBold: {
      backgroundColor: color,
      color: '#fff'
    }
  }
}

const sizeToSpacing: Record<ChipSize, { padding: string; fontSize: number }> = {
  sm: { padding: '0.25rem 0.75rem', fontSize: 12 },
  md: { padding: '0.25rem 1rem', fontSize: 13 },
  lg: { padding: '0.375rem 1.25rem', fontSize: 14 }
}

const DivWrapper = ({ children, ...props }: PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>
}

export const Chip = ({
  color,
  title,
  size = 'md',
  type = 'filled',
  onClick
}: {
  color: string
  title: string
  size?: ChipSize
  type?: ChipType
  onClick?: DispatchWithoutAction
}) => {
  const styles = useTypeToStyles(color)
  const Wrapper = onClick ? ButtonBase : DivWrapper
  return (
    <div style={{ display: 'flex' }}>
      <Wrapper
        style={{ ...styles[type], ...sizeToSpacing[size], borderRadius: 999 }}
        onClick={onClick}
      >
        <span style={{}}>{title}</span>
      </Wrapper>
    </div>
  )
}

export const ChipsView = ({
  chipsProps,
  spacing = 2
}: {
  chipsProps: PropsOf<typeof Chip>[]
  spacing?: GridSpacing
}) => {
  return (
    <Grid container spacing={spacing} justifyContent='center'>
      {chipsProps.map((props, index) => (
        <Grid
          item
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Chip {...props} />
        </Grid>
      ))}
    </Grid>
  )
}

export const useFilterView = <T,>(
  chipsData: {
    color: string
    title: string
    size?: ChipSize
    id: T
  }[],
  config?: {
    defaultAllOn?: boolean
    defaultIdsOn?: T[]
    typeOn?: ChipType
    typeOff?: ChipType
    spacing?: GridSpacing
  }
) => {
  const isConfig = config !== undefined
  const defaultAllOn = (isConfig && config!.defaultAllOn) || false
  const defaultIdsOn = (isConfig && config!.defaultIdsOn) || false
  const typeOn = (isConfig && config!.typeOn) || 'filledBold'
  const typeOff = (isConfig && config!.typeOff) || 'outlined'
  const spacing = (isConfig && config!.spacing) || 1

  let on: T[] = []
  if (defaultIdsOn) {
    on = defaultIdsOn
  } else if (defaultAllOn) {
    on = chipsData.map((data) => data.id)
  }

  const [idsOn, setIdsOn] = useState<T[]>(on)

  const onChipClick = (id: T) => {
    let cloned = [...idsOn]
    const index = idsOn.indexOf(id)
    if (index > -1) {
      setIdsOn((prev) => {
        const next = [...prev]
        next.splice(index, 1)
        return next
      })
      cloned.splice(index, 1)
    } else {
      setIdsOn((prev) => [...prev, id])
      cloned.push(id)
    }
    return cloned
  }

  const FilterView = ({
    onClick,
    className = ''
  }: {
    onClick?: Action1<T[]>
    className?: string
  }) => {
    return (
      <Grid container spacing={spacing} className={className}>
        {chipsData.map((data, index) => (
          <Grid item key={index}>
            <Chip
              color={data.color}
              title={data.title}
              size={data.size || 'md'}
              type={idsOn.indexOf(data.id) > -1 ? typeOn : typeOff}
              onClick={() => {
                const newOn = onChipClick(data.id)
                onClick?.(newOn)
              }}
            />
          </Grid>
        ))}
      </Grid>
    )
  }

  return [idsOn, FilterView] as [
    T[],
    FC<{ onClick?: Action1<T[]>; className?: string }>
  ]
}
