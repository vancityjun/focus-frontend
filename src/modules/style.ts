import styled from 'styled-components/native'

interface globalVariablesType {
  primary_color: string
  dark_grey: string
  medium_grey: string
  light_grey: string
  white_grey: string
  warn_red: string
  font_small: string
  font_medium: string
  font_large: string
}

export const globalVariables: globalVariablesType = {
  primary_color: '#FFBB00',
  dark_grey: '#3E3E3E',
  medium_grey: '#676767',
  light_grey: '#DDDDDD',
  white_grey: '#f5f5f5',
  warn_red: '#e81717',
  font_small: '16px',
  font_medium: '18px',
  font_large: '20px',
}

const {
  primary_color,
  dark_grey,
  medium_grey,
  light_grey,
  warn_red,
  font_small,
  font_medium,
  font_large,
} = globalVariables

export const Page = styled.View`
  background: #fff
  height: 100%
`

export const FlexWrap = styled.View`
  display: flex
  flex-flow: row-wrap
  align-items: baseline
  justify-content: ${({ justifyContent }: { justifyContent?: string }) =>
    justifyContent || 'flex-start'}
`

export const FlexColumn = styled(Page)`
  display: flex
  flex-direction: column
  align-items: center
`

export const Row = styled(FlexWrap)`
  justify-content: space-between
  padding: 15px 20px
  border-bottom-width: 1px
  border-bottom-color: ${light_grey}
  align-items: center
`

interface Activable {
  active?: boolean
}

interface Editable {
  editable?: boolean
  focus: boolean
}

interface TextMediumType {
  light?: boolean
  warn?: boolean
  marginRight?: number
}

interface TextInputTitleType extends TextMediumType, Editable {}

interface buttonTitleType extends TextMediumType, Activable {
  fontSize?: number
}

interface ButtonType extends Activable {
  outline?: boolean
}

interface TextInputType extends Editable {
  isDesktop: boolean
}

export const TextMedium = styled.Text<TextMediumType>`
  font-size: ${font_medium}
  color: ${({ light = false, warn = false }) => {
    if (light) {
      return medium_grey
    } else if (warn) {
      return warn_red
    }
    return dark_grey
  }}
  margin-right: ${({ marginRight = 0 }) => marginRight}px
  line-height: 26px
`

export const TextLarge = styled(TextMedium)<TextMediumType>`
  font-size: ${font_large}
  line-height: 30px
`

export const TextSmall = styled(TextMedium)<TextMediumType>`
  font-size: ${font_small}
  line-height: 22px
`

export const TextInputTitle = styled(TextSmall)<TextInputTitleType>`
  color: ${({ focus, editable }) =>
    focus && editable ? primary_color : medium_grey};
`

export const ButtonTitle = styled(TextSmall)<buttonTitleType>`
  color: ${({ active, warn }) => {
    if (active) {
      return '#fff'
    }
    if (warn) {
      return warn_red
    }
    return dark_grey
  }}
  font-size: ${({ fontSize = 16 }) => fontSize}px
`

export const Button = styled.TouchableOpacity<ButtonType>`
  border: ${({ outline }) => (outline ? `1px solid ${dark_grey}` : 'none')}
  padding: 2px 10px
  border-radius: 7px
  background: ${({ active }) => (active ? primary_color : 'transparent')}
`

export const Inner = styled.View`
  width: ${({ width }: { width: any }) => width || '100%'}
  margin-bottom: 20px
`
export const ModalStyle = styled.View`
  shadow-opacity: 0.24
  shadow-radius: 7px
  shadow-color: #757575
  shadow-offset: 0px 2px
  position: absolute
  z-index: 1000
  background: #fff
`

export const TextInput = styled.TextInput`
  border-bottom-width: 1px
  border-bottom-color: ${({ focus, editable }: TextInputType) =>
    focus && editable ? primary_color : dark_grey}
  font-size: 16px
  background: #fff
  ${({ isDesktop }: TextInputType) => isDesktop && 'outline-width: 0'}
`
