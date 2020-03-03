import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Text from '../components/Text'
import Row from '../components/Row'
import DeviceInfo from 'react-native-device-info'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class Dashboard extends Component {
  render () {
    return (
        <View style={styles.background}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#363535', '#4a4949']} style={[styles.headerCard]}>
            <Text style={styles.title} size={20} bold>PlusBit</Text>
            <View style={styles.balanceWrapper}>
              <Text size={28} bold>Balance</Text>
              <Text size={20}>0.00 USD</Text>
            </View>
          </LinearGradient>
          <TouchableOpacity style={styles.coinWrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(233, 122, 22)', 'rgb(247, 156, 74)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/bitcoin.png')}/>
            <View style={styles.cardInfo}>
              <Text size={20} bold>Bitcoin</Text>
              <Text size={13}>0.0000 BTC | 0.00 USD</Text>
            </View>
            <Image style={styles.arrow} source={require('../assets/arrow.png')}/>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coinWrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(130, 130, 130)', 'rgb(223, 223, 223)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/litecoin.png')}/>
            <View style={styles.cardInfo}>
              <Text size={20} bold>Litecoin</Text>
              <Text size={13}>0.0000 LTC | 0.00 USD</Text>
            </View>
            <Image style={styles.arrow} source={require('../assets/arrow.png')}/>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coinWrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(19, 64, 115)', 'rgb(23, 142, 159)']} style={styles.card}>
            <Image style={styles.icon} source={require('../assets/ilcoin.png')}/>
            <View style={styles.cardInfo}>
              <Text size={20} bold>ILCoin</Text>
              <Text size={13}>0.0000 ILC | 0.00 USD</Text>
            </View>
            <Image style={styles.arrow} source={require('../assets/arrow.png')}/>
          </LinearGradient>
          </TouchableOpacity>
          <View style={styles.navBar}>
            <Row>
              <TouchableOpacity>
                <Image style={styles.navIcon} source={require('../assets/add.png')}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.navIcon} source={require('../assets/minus.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.util('settings')}>
                <Image style={styles.navIcon} source={require('../assets/gear.png')}/>
              </TouchableOpacity>
            </Row>
          </View>
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
      marginTop: 20
    },
    card: {
      height: 110, 
      width: width - 70, 
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    icon: {
      width: 60,
      height: 60,
      marginTop: 25
    },
    cardInfo: {
      width: 200,
      height: 80,
      marginTop: 15,
      justifyContent: 'center',
      paddingLeft: 20
    },
    arrow: {
      width: 60,
      height: 30,
      marginTop: 40
    },
    headerCard: {
      height: 100, 
      width: width - 70, 
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: DeviceInfo.hasNotch() == 1 ? 70 : 30
    },
    balanceWrapper: {
      position: 'absolute',
      top: 10,
      right: 20,
      alignItems: 'flex-end'
    },
    navIcon: {
      width: 30,
      height: 30
    }, 
    profileWrapper: {
      position: 'absolute',
      right: 10,
      top: 10
    },
    navBar: {
      width: width,
      height: 70,
      position: 'absolute',
      bottom: Platform.OS == 'ios' ? 0 : 35,
      backgroundColor: '#363535'
    },
    title: {
      position: 'absolute',
      left: 20,
      top: 15
    }
})