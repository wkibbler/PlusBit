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
    }
  }

  render() {
    return (
      <Animated.View style={{transform: [{translateX: this.state.animation}]}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.getCoinData(this.props.coin).gradient} style={styles.card}>
            <Image style={styles.icon} source={this.getLogo(this.props.coin)}/>
            <View style={styles.cardInfo}>
              <Text size={20} bold>{this.getCoinData(this.props.coin).name}</Text>
              <Text size={13}>0.0000 {this.props.coin} | 0.00 USD</Text>
            </View>
            <Image style={styles.arrow} source={require('../assets/arrow.png')}/>
        </LinearGradient>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 110, 
    width: Dimensions.get('window').width - 70, 
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
})