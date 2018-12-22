/**
 * @desc [创建redux辅助函数]
 * @param {*} initialState 
 * @param {*} handlers 
 */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action.payload)
    } else {
      return state
    }
  }
}