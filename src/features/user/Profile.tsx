import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Page, Row, TextSmall, FlexWrap } from '../../modules/style'
import { Props } from '../../navigator/types'
import { useAppSelector } from '../../app/hooks'
import { setToken } from '../../apollo/index'
import { useAppDispatch } from '../../app/hooks'
import { fetchUser } from './userSlice'

const Profile = ({ navigation }: Props) => {
  const currentUser = useAppSelector(({ user }) => user)
  const appDispatch = useAppDispatch()

  const logout = () => {
    setToken('')
    appDispatch(fetchUser())
    navigation.goBack()
  }

  const menu = [
    { title: 'Logout', action: () => logout() },
    { title: 'Edit Profile', action: () => navigation.navigate('UpdateUser') },
  ]

  return (
    <Page>
      <FlexWrap>
        <TextSmall>{currentUser?.fullName}</TextSmall>
      </FlexWrap>
      <FlexWrap>
        <TextSmall>{currentUser?.userAttributes.email}</TextSmall>
      </FlexWrap>
      {menu.map(({ title, action }) => (
        <Row
          as={TouchableHighlight}
          onPress={() => action()}
          underlayColor="#f5f5f5"
          key={title}
        >
          <TextSmall>{title}</TextSmall>
        </Row>
      ))}
    </Page>
  )
}

export default Profile
