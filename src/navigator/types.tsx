import { StackScreenProps } from '@react-navigation/stack'

export type StackParamList = {
  Main: undefined
  Login: undefined
  Profile: undefined
  UpdateUser: undefined
}

export type Props = StackScreenProps<StackParamList, 'Main'>
