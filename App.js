import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  Dimensions,
  Easing
} from 'react-native';

import Root from './app/Root'
import Login from './app/Login'
import Dashboard from './app/Dashboard'
import Util from './app/Util'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      root: new Animated.Value(0),
      main: new Animated.Value(0),
      dashboard: new Animated.Value(0),
      util: new Animated.Value(0),
      hashSplash: false,
      utilArg: '',
      user: {activeCoins: []},
      secondaryUtilArg: ''
    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.login()
    }, 1800);
  }

  login = () => {
    Animated.timing(this.state.main, {
      toValue: -height,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
  }

  dashboard = () => {
    this.updateUser()
    Animated.timing(this.state.main, {
      toValue: 0,
      duration: 1000,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.root, {
        toValue: -width,
        duration: 1000,
        easing: Easing.elastic(1.2)
      }).start();
      Animated.timing(this.state.dashboard, {
        toValue: -width,
        duration: 1000,
        easing: Easing.elastic(1.2)
      }).start();
    }, 1000);
  }

  util = (arg, secondary) => {
    this.setState({utilArg: arg, secondaryUtilArg: secondary || ''})
    Animated.timing(this.state.dashboard, {
      toValue: -width * 2,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
    Animated.timing(this.state.util, {
      toValue: -width * 2,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
  }

  utilToLogin = () => {
    Animated.timing(this.state.dashboard, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
    Animated.timing(this.state.util, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
    Animated.timing(this.state.root, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
    setTimeout(() => {
      this.login()
    }, 1000)
    this.setState({user: {}})
  }

  updateUser = () => {
    RNSecureKeyStore.get("userData").then((res) => {
      console.log(JSON.parse(res))
      this.setState({user: JSON.parse(res)})
    })
  }

  utilToDashboard = () => {
    Animated.timing(this.state.dashboard, {
      toValue: -width,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
    Animated.timing(this.state.util, {
      toValue: -width,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
  }

  render() {
    return (
      <View style={{backgroundColor: '#222222'}}>
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.main}]}]}>
        <Animated.View style={{transform: [{translateX: this.state.root}]}}>
          <Root
            hashSplash={this.state.hashSplash}
          />
        </Animated.View>
        <Animated.View style={{transform: [{translateX: this.state.dashboard}]}}>
          <Dashboard
            util={(arg, secondary) => this.util(arg, secondary)}
            user={this.state.user}
            updateUser={() => this.updateUser()}
          />
        </Animated.View>
        <Animated.View style={{transform: [{translateX: this.state.util}]}}>
          <Util
            page={this.state.utilArg}
            utilToLogin={() => this.utilToLogin()}
            utilToDashboard={() => this.utilToDashboard()}
            args={this.state.secondaryUtilArg}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.main}]}]}>
        <Animated.View>
          <Login
            dashboard={this.dashboard}
          />
        </Animated.View>
      </Animated.View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222222',
    height: height
  }
});