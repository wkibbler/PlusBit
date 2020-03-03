import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class Dashboard extends Component {
  render () {
    return (
        <View style={styles.background}>
          <TouchableOpacity style={[styles.coinWrapper, {marginTop: 70}]}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(233, 122, 22)', 'rgb(247, 156, 74)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/bitcoin.png')}/>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coinWrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(130, 130, 130)', 'rgb(223, 223, 223)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/litecoin.png')}/>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coinWrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(19, 64, 115)', 'rgb(23, 142, 159)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/ilcoin.png')}/>
          </LinearGradient>
          </TouchableOpacity>
        </View>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    logo: {
      position: 'absolute',
      width: 60,
      height: 60,
      left: 20,
      top: 35
    },
    coinWrapper: {
      width: width - 700,
      height: 110,
      marginTop: 30
    },
    card: {
      height: 110, 
      width: width - 70, 
      borderRadius: 10,
      justifyContent: 'center'
    },
    icon: {
      width: 60,
      height: 60,
      marginLeft: 20
    }
})