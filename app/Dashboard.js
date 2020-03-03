import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Text from '../components/Text'
import Row from '../components/Row'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import CoinCard from '../components/CoinCard'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class Dashboard extends Component {

  constructor(){
    super()
    this.state = {
      user: {activeCoins: []}
    }
  }

  componentDidMount(){
    RNSecureKeyStore.get("userData").then((res) => {
      console.log(JSON.parse(res))
      this.setState({user: JSON.parse(res)})
    })
  }


  render () {
    return (
        <View style={styles.background}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#363535', '#4a4949']} style={[styles.headerCard]}>
            <Image source={require('../assets/vertical-4.png')} style={styles.title}/>
            <View style={styles.balanceWrapper}>
              <Text size={28} bold>Balance</Text>
              <Text size={20}>0.00 USD</Text>
            </View>
          </LinearGradient>
          <ScrollView style={{width: Dimensions.get('window').width, marginTop: 20}} contentContainerStyle={{alignItems: 'center', height: Dimensions.get('window').height - 270}}>
          {
            this.state.user.activeCoins.map((item, index) => (
              <TouchableOpacity style={styles.coinWrapper}>
                 <CoinCard coin={item}/>
              </TouchableOpacity>
            ))
          }
          </ScrollView>
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
      height: 150, 
      width: width, 
      //borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      //marginTop: 70
    },
    balanceWrapper: {
      position: 'absolute',
      top: 50,
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
      bottom: 0,
      backgroundColor: '#363535'
    },
    title: {
      position: 'absolute',
      left: 20,
      top: 53,
      width: 70,
      height: 70
    }
})