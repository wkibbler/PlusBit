import React, {Component} from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Text from './Text'

export default class CoinCard extends Component {

  constructor(){
    super()
    this.state = {
    }
  }

  getLogo = (coin) => {
    if (coin == 'BTC'){
      return require('../assets/BTC.png')
    } else if (coin == 'ILC'){
      return require('../assets/ILC.png')
    } else if (coin == 'ZEL'){
      return require('../assets/ZEL.png')
    } else if (coin == 'SAFE'){
      return require('../assets/SAFE.png')
    }
  }


  getCoinData = (coin) => {
    if (coin == 'BTC'){
      return {
        gradient: ['rgb(233, 122, 22)', 'rgb(247, 156, 74)'],
        name: 'Bitcoin'
      }
    } else if (coin == 'ILC'){
      return {
        gradient: ['rgb(19, 64, 115)', 'rgb(23, 142, 159)'],
        name: 'ILCoin'
      }
    } else if (coin == 'ZEL'){
      return {
        gradient: ['rgb(64, 31, 122)', 'rgb(173, 36, 117)'],
        name: 'ZelCash'
      }
    } else if (coin == 'SAFE'){
      return {
        gradient: ['rgb(77, 166, 197)', 'rgb(121, 204, 232)'],
        name: 'SafeCoin'
      }
    }
  }

  render() {
    return (
      <View style={styles.shadow}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.getCoinData(this.props.coin).gradient} style={styles.card}>
          <TouchableOpacity onPress={() => this.props.back()} style={styles.arrowWrapper}>
            <Image style={styles.arrow} source={require('../assets/backArrow.png')}/>
          </TouchableOpacity>
          <Image style={styles.logo} source={this.getLogo(this.props.coin)}/>
          <View style={styles.hexagon}>
        <View style={styles.hexagonInner} />
        <View style={styles.hexagonBefore} />
        <View style={styles.hexagonAfter} />
      </View>
            {this.props.children}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 190, 
    width: Dimensions.get('window').width, 
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  shadow: {
    shadowColor: "#181818",
    shadowOffset: {
  	width: 7,
  	height: 7,
  },
  shadowOpacity: 1,
  shadowRadius: 7,

  elevation: 30,
  
  },
  arrow: {
    width: 40,
    height: 40
  },
  arrowWrapper: {
    position: 'absolute',
    left: 10,
    top: 10
  },
  logo: {
    width: 70, 
    height: 80,
    shadowColor: "#181818",
    shadowOffset: {
  	width: 7,
  	height: 7,
  },
  shadowOpacity: 1,
  shadowRadius: 7,

  elevation: 30,
  marginTop: 25
  },
})