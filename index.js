/** @format */

import { AppRegistry } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';

if (!__DEV__) {
  global.console = {
    info: () => { },
    log: () => { },
    warn: () => { },
    error: () => { },
  };
}

AppRegistry.registerComponent(appName, () => App);
