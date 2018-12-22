import { combineReducers } from 'redux';
import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import AppNavigator from '../Stack';
import user from './user';



const navReducer = createNavigationReducer(AppNavigator);

export default combineReducers({
  nav: navReducer,
  user,
})