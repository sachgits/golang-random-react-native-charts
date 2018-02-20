const X_LIMIT = 300

export const graphReducer = (state = [], action) => {
  if (action.type === "APPEND_DATA"){
    if (state.length > X_LIMIT) {
      return [...state, JSON.parse(action.value)].slice(state.length - X_LIMIT, state.length)
    } else {
      return [...state, JSON.parse(action.value)]
    }
  }
  return state;
}
