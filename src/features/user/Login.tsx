import React, { useEffect, useState, useReducer } from 'react'
import { View } from 'react-native'
import { FlexColumn } from '../../modules/style'
import LoginMutation from '../../graphql/mutations/login.gql'
import SignupMutation from '../../graphql/mutations/signup.gql'
import { useMutation } from '@apollo/client'
import UserInputFields from './UserInputFields'
import Button from '../../shared/Button'
import TextInputWithTitle from '../../shared/TextInputWithTitle'
import { Props } from '../../navigator/types'
import { fetchUser } from './userSlice'
import { useAppDispatch } from '../../app/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducer from '../../modules/formReducer'
import { setAlert } from '../../shared/alertMessageSlice'
import {setToken} from '../../apollo'

const Login = ({ navigation }: Props) => {
  const [isRegister, setIsRegister] = useState(false)
  const [disable, setDisable] = useState(true)
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [passwordConfirm, SetPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [state, dispatch] = useReducer(reducer, {})

  const [login, { data: { login: loginData } = {} }] =
    useMutation(LoginMutation)
  const [register, { data: { signup: signupData } = {} }] =
    useMutation(SignupMutation)

  const appDispatch = useAppDispatch()

  useEffect(() => {
    const token = loginData?.token || signupData?.token
    const errors = loginData?.errors || signupData?.errors

    if (token) {
      setToken(token)
      appDispatch(fetchUser())
      navigation.goBack()
    } else if (errors) {
      appDispatch(setAlert({ errors: errors, warn: true }))
    }
  }, [loginData, signupData])

  useEffect(() => {
    const { firstName, lastName } = state
    const validateLogin = !(email && password)

    if (isRegister) {
      setDisable(validateLogin || !(firstName && lastName && passwordConfirm))
    } else {
      setDisable(validateLogin)
    }
  }, [state, email, password, isRegister])

  const submit = () => {
    if (isRegister) {
      if (password !== passwordConfirm) {
        return setErrorMessage('Passwords are not matching')
      }
      return register({
        variables: {
          input: { userAttributes: state, email: email, password: password },
        },
      })
    }
    login({ variables: { input: { email: email, password: password } } })
  }

  return (
    <FlexColumn>
      <TextInputWithTitle
        title="Email"
        onChangeText={(value) => SetEmail(value)}
        value={email}
        autoCompleteType="username"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInputWithTitle
        title="Password"
        onChangeText={(value) => SetPassword(value)}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        textContentType="password"
      />
      {isRegister && (
        <>
          <TextInputWithTitle
            title="Password confirm"
            onChangeText={(value) => SetPasswordConfirm(value)}
            value={passwordConfirm}
            autoCompleteType="password"
            secureTextEntry={true}
            textContentType="password"
            errorMessage={errorMessage}
          />
          <UserInputFields state={state} dispatch={dispatch} />
        </>
      )}
      <View>
        <Button
          onPress={() => submit()}
          disabled={disable}
          active={true}
          title={isRegister ? 'Create Account' : 'Login'}
          width={170}
          height={38}
        />
        <Button
          onPress={() => setIsRegister((isRegister) => !isRegister)}
          title={isRegister ? 'login' : 'sign up'}
          background={false}
        />
      </View>
    </FlexColumn>
  )
}

export default Login
