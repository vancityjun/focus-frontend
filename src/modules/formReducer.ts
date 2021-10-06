const reducer = (state: any, { target }: any) => {
  return { ...state, ...target }
}

export default reducer
