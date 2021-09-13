import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Profile, Main, UpdateUser } from './screens'
import { StackParamList } from './types'
import Button from '../shared/Button'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { fetchUser } from '../features/user/userSlice'

const RootStack = createStackNavigator<StackParamList>()

const StackNavigator = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(({ user }) => user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={Main}
          options={({ navigation: { navigate } }) => ({
            headerTitle: 'Home',
            headerRight: () =>
              currentUser?.id ? (
                <Button onPress={() => navigate('Profile')} title="Profile" />
              ) : (
                <Button onPress={() => navigate('Login')} title="Login" />
              ),
          })}
        />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Profile" component={Profile} />
        <RootStack.Screen name="UpdateUser" component={UpdateUser} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
