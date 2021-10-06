import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './src/apollo'
import StackNavigator from './src/navigator'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </ApolloProvider>
  )
}
