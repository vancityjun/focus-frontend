//import liraries
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAppDispatch } from '../../app/hooks'
import { setCurrentUser } from '../user/userSlice'
import fetchUser from '../user/user'
// create a component
const Main = () => {
  // const dispatch = useAppDispatch()
  // const currentUser = fetchUser()
  // dispatch(setCurrentUser(currentUser))
  return (
    <View style={styles.container}>
      <Text>Main</Text>
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
})

//make this component available to the app
export default Main
