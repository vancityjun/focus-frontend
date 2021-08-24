import React from 'react'
import styled from 'styled-components/native'
import { globalVariables, ButtonTitle } from '../modules/style'

interface TouchableType {
  onPress: () => void
  outline?: boolean
  active?: boolean
  disabled?: boolean
  width?: string | number
  height?: string | number
  background?: boolean
  onBlur?: () => void
}

interface ButtonType extends TouchableType {
  title: string
  fontSize?: number
  warn?: boolean
}

const Button = ({
  title,
  onPress,
  outline,
  active,
  fontSize,
  disabled,
  width,
  height,
  warn,
  background = true,
  onBlur = () => {},
}: ButtonType) => {
  if (!title) {
    console.error('title is required!')
  }
  return (
    <Touchable
      onPress={() => onPress()}
      activeOpacity={0.7}
      outline={outline}
      active={active}
      disabled={disabled}
      width={width}
      height={height}
      onBlur={() => onBlur()}
      background={background}
    >
      <ButtonTitle fontSize={fontSize} active={active} warn={warn}>
        {title}
      </ButtonTitle>
    </Touchable>
  )
}

const Touchable = styled.TouchableOpacity<TouchableType>`
  border: ${({ outline }) =>
    outline ? `1px solid ${globalVariables.dark_grey}` : 'none'}
  border-radius: 7px
  background: ${({ active, background }) => {
    if (active) {
      return globalVariables.primary_color
    }
    if (!background) {
      return 'transparent'
    }
    return globalVariables.white_grey
  }}
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  min-width: ${({ width }) => width || '30px'}
  min-height: ${({ width, height }) => (width ? height || '36px' : '30px')}
  padding: 5px 10px
  ${({ disabled }) => disabled && 'opacity: .7'}
`

export default Button
