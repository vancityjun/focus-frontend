import React, { useState } from 'react'
import { Inner, TextInput, TextInputTitle, TextSmall } from '../modules/style'
import { isDesktop } from '../modules/device'
import Content from './Content'

interface TextInputWithTitleType {
  title: string
  onChangeText: (value: any) => void
  value: string
  maxLength?: number
  secureTextEntry?: boolean
  multiline?: boolean
  autoFocus?: boolean
  autoFucus?: boolean
  width?: any
  errorMessage?: string
  numberOfLines?: number
  autoCompleteType?: any
  editable?: boolean
  keyboardType?: any
  textContentType?: any
}

const TextInputWithTitle = ({
  title,
  onChangeText,
  value = '',
  maxLength,
  secureTextEntry = false,
  multiline,
  autoFocus,
  width,
  errorMessage,
  numberOfLines,
  autoCompleteType = null,
  editable = true,
  keyboardType = 'default',
  textContentType = 'none',
}: TextInputWithTitleType) => {
  const [focus, setFocus] = useState(false)

  return (
    <Inner width={width}>
      <TextInputTitle focus={focus}>{title}</TextInputTitle>
      <Content
        as="TextInput"
        onChangeText={(value: string) => onChangeText(value)}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        focus={focus}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        multiline={multiline}
        autoFocus={autoFocus}
        isDesktop={isDesktop}
        numberOfLines={numberOfLines}
        autoCompleteType={autoCompleteType}
        editable={editable}
        keyboardType={keyboardType}
        textContentType={textContentType}
        blurOnSubmit
      />
      {!!errorMessage && <TextSmall warn>{errorMessage}</TextSmall>}
    </Inner>
  )
}

export default TextInputWithTitle
