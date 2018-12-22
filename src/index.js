'use strict';

import React, { Component } from 'react';
import { BackHandler, } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router, Actions } from 'react-native-router-flux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import Stack from './redux/Stack';
import store from './redux/store';

const ReduxNavigator = reduxifyNavigator(Stack, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const ReduxRouter = connect(mapStateToProps)(Router);

export default class Root extends Component {

  onBackPress = () => {
    if (Actions.state.index === 0) {
      if (Actions.state.routes[0].isDrawerOpen) {
        Actions.drawerClose();
        return true;
      }
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
      }
      this.lastBackPressed = Date.now();
      // Toast.info('再按一次退出应用');
      return true;
    }
    Actions.pop()
    return true
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxRouter
          navigator={ReduxNavigator}
          backAndroidHandler={this.onBackPress} />
      </Provider>
    )
  }
}