import React, {Component} from 'react';
import { StyleSheet, View, Image, Dimensions, Easing, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Text from './Text'

export default class CoinCard extends Component {

  constructor(){
    super()
    this.state = {
      animation: new Animated.Value(-Dimensions.get('window').width)
    }
  }

  componentDidMount(){
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1.2)
    }).start();
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
      <Animated.View style={{transform: [{translateX: this.state.animation}]}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.getCoinData(this.props.coin).gradient} style={styles.card}>
            <Image style={styles.icon} source={this.getLogo(this.props.coin)}/>
            <View style={styles.cardInfo}>
              <Text size={20} bold>{this.getCoinData(this.props.coin).name}</Text>
              <Text size={13}>0.0000 {this.props.coin} | 0.00 {this.props.unit}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'center'}}>
              <Text bold size={10}>STATUS: </Text>
              <Image style={styles.statusDot} source={require('../assets/status-1.png')}/>
            </View>
        </LinearGradient>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 110, 
    width: Dimensions.get('window').width - 50, 
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
  statusDot: {
    width: 10,
    height: 10,
    marginTop: 2,
    marginLeft: 2
  }
})