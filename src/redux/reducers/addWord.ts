const initialState = {
  defWord: '',
}

const addWord = (state = initialState, action) => {
  console.log("Herererererer")
  switch (action.type) {
    case 'GET_WORD':
      return { ...state }
    case 'SET_WORD':
      console.log("reducer", action.defWord)
      return { ...state, defWord: action.defWord }
    default:
      return state
  }
}

export default addWord
