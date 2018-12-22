import React from 'react';
import { Scene, Actions, Router, Drawer } from 'react-native-router-flux';

import HomeScreen from '../pages/home';
import LoginPage from '../pages/login';


// 需要拦截的路由
// const needLoginRoute = ['home'];
const needLoginRoute = [];

const AppNavigator = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="login" component={LoginPage} />
    <Scene key="home" hideNavBar component={HomeScreen} />
  </Scene>,
);

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {
  let routeName = dealMsgDeal(action.routeName);
  // 拦截需要登录的页面
  if (action.routeName === routeName && !authInterceptor()) {
    this.routes = [
      ...state.routes,
      { key: 'id-' + Date.now(), routeName: 'login', params: { name: routeName, params: action.params } },
    ];
    return {
      ...state,
      routes,
      index: this.routes.length - 1,
    };
  }
  return defaultGetStateForAction(action, state);
};

// 需要拦截登录的页面
function dealMsgDeal(routeName) {
  let theRouteName = '';
  if (routeName) {
    for (let i in needLoginRoute) {
      if (needLoginRoute[i] == routeName) {
        theRouteName = routeName;
        break;
      }
    }
  }
  return theRouteName;
}

function authInterceptor() {
  const user = global.userInfo;
  if (user) {
    const { authed, deposited } = user;
    return (authed === 1 && deposited === 1);
  } else {
    return false;
  }
}

export default AppNavigator;


