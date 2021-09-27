import React, { useEffect, useState, useReducer } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateUser } from './userSlice'
import UserInputFields from './userInputFields'
import { Page } from '../../modules/style'
import Button from '../../shared/Button'
import TextInputWithTitle from '../../shared/TextInputWithTitle'
import reducer from '../../modules/formReducer'

const UpdateUser = () => {
  const currentUser = useAppSelector(({ user }) => user)
  const { id, userAttributes } = currentUser
  const [email, setEmail] = useState(currentUser.email)
  const [state, dispatch] = useReducer(reducer, userAttributes)
  const [disable, toggleDisable] = useState(true)
  const appDispatch = useAppDispatch()

  const update = () => {
    const variables = {
      id: id,
      userAttributes: state,
    }
    appDispatch(updateUser(variables))
  }

  useEffect(() => {
    toggleDisable(JSON.stringify(state) === JSON.stringify(userAttributes))
  }, [state, userAttributes])

  return (
    <Page>
      <TextInputWithTitle
        title="Email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        autoCompleteType="email"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
        editable={false}
      />
      <UserInputFields state={state} dispatch={dispatch} />
      <Button
        onPress={() => update()}
        disabled={disable}
        active={true}
        title={'Submit'}
        width={170}
        height={38}
      />
    </Page>
  )
}

export default UpdateUser
