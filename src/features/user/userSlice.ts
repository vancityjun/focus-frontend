import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import apolloClient from '../../apollo'
import CurrentUser from '../../graphql/queries/currentUser.gql'
import UpdateUser from '../../graphql/mutations/updateUser.gql'

interface userType {
  id: string
  fullName: string
  userAttributes: {
    email: string
    firstName: string
    lastName: string
    country: string
    region: string
    city: string
  }
}

const userState: userType | null = null

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await apolloClient.query({
    query: CurrentUser,
    fetchPolicy: 'no-cache',
  })
  return response.data.currentUser
})

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (variables) => {
    const response = await apolloClient.mutate({
      mutation: UpdateUser,
      variables: { input: variables },
    })
    return response.data.updateUser.user
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        return payload
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        return payload
      })
  },
})

export default userSlice.reducer
