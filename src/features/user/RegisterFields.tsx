import React from 'react'
import TextInputWithTitle from '../../shared/TextInputWithTitle'

interface RegisterFieldsTypes {
  state: any
  dispatch: any
  errorMessage: string
  passwordConfirm: string
  SetPasswordConfirm: (value: string) => void
}

const RegisterFields = ({
  state,
  dispatch,
  errorMessage,
  passwordConfirm,
  SetPasswordConfirm,
}: RegisterFieldsTypes) => {
  return (
    <>
      {/* <TextInputWithTitle
        title="Password confirm"
        onChangeText={(value) => SetPasswordConfirm(value)}
        value={passwordConfirm}
        secureTextEntry={true}
      /> */}
      <TextInputWithTitle
        title="First name"
        onChangeText={(value: string) =>
          dispatch({ target: { firstName: value } })
        }
        value={state.firstName}
        textContentType="givenName"
      />
      <TextInputWithTitle
        title="Last name"
        onChangeText={(value: string) =>
          dispatch({ target: { lastName: value } })
        }
        value={state.lastName}
        errorMessage={errorMessage}
        textContentType="familyName"
      />
      {/* gender, country, region, city dropdown */}
    </>
  )
}

export default RegisterFields
