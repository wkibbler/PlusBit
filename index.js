/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true
global.Buffer = global.Buffer || require('buffer').Buffer

AppRegistry.registerComponent(appName, () => App);
