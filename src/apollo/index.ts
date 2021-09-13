import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignupMutation from '../graphql/mutations/signup.gql'
import LoginMutation from '../graphql/mutations/login.gql'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
})

const getToken = async () => {
  let token: string | null = await AsyncStorage.getItem('@token')
  if (!token) {
    return ''
  }
  token = token.split('=')[1]
  return `Bearer ${token}`
}

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('@token', `token=${token}`)
}

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken()
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// export const sign = async (mutation, variables) => {
//   const response = await apolloClient.mutate({
//     mutation: mutation,
//     variables: variables,
//   })
//   const { error, token } = response.data
//   if (error) {
//     return error
//   }
//   setToken(token)
// }

// export const signOut = () => {
//   setToken('')
// }

export default apolloClient
