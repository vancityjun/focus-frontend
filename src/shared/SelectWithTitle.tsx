import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Inner,
  TextInputTitle,
  TextSmall,
  globalVariables,
} from '../modules/style'
import RNPickerSelect from 'react-native-picker-select'

interface SelectWithTitleType {
  title: string
  value: string
  width?: any
  errorMessage?: string
  editable?: boolean
  items: { label: string; value: string }[]
  placeholder?: any
  onValueChange: (value) => void
  disabled?: boolean
}

const SelectWithTitle = ({
  title,
  width,
  errorMessage,
  items,
  value,
  placeholder,
  onValueChange,
  disabled = false,
}: SelectWithTitleType) => {
  const [focus, toggleFocus] = useState(false)

  return (
    <Inner width={width}>
      <TextInputTitle focus={focus}>{title}</TextInputTitle>
      <RNPickerSelect
        onValueChange={(value) => (value ? onValueChange(value) : null)}
        items={items}
        value={value}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        style={styles}
        onOpen={() => toggleFocus(true)}
        disabled={disabled}
      />
      {!!errorMessage && <TextSmall warn>{errorMessage}</TextSmall>}
    </Inner>
  )
}

const pickerStyle = {
  fontSize: 16,
  color: globalVariables.dark_grey,
  borderWidth: 0,
  borderBottomWidth: 1,
  borderBottomColor: globalVariables.dark_grey,
}

const styles = StyleSheet.create({
  inputIOS: pickerStyle,
  inputAndroid: pickerStyle,
  inputWeb: pickerStyle,
})
export default SelectWithTitle
