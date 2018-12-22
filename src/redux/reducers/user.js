import * as Types from '../actions/user';
import createReducer from '@/utils/createReducer';

const initialState = {
  pending: false,
  userInfo: null,
}

const reducer = createReducer(initialState, {
  [Types.LOGIN]: (state) => ({ ...state, userInfo: null, pending: true, }),
  [Types.LOGIN_FAIL]: (state) => ({ ...state, pending: false, }),
  [Types.LOGIN_SUCCESS]: (state, payload) => ({ ...state, pending: false, userInfo: payload }),
});

export default reducer;
