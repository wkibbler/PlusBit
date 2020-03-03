import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Text from '../components/Text'
import Row from '../components/Row'
import CoinCard from '../components/CoinCard'
import DeviceInfo from 'react-native-device-info'
import Modal from 'react-native-modal'
import Card from '../components/Card'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class Dashboard extends Component {

  constructor(){
    super()
    this.state = {
      addModal: false,
      removeModal: false
    }
  }

  addAsset = (sym) => {
    this.setState({addModal: false})
    this.props.user.activeCoins.push(sym)
    RNSecureKeyStore.set("userData", JSON.stringify(this.props.user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res) => {
            this.props.updateUser()
        }, (err) => {
            Alert.alert('There was an error updating user state')
        });
  }

  removeAsset = (sym) => {
    this.setState({removeModal: false})
    let i = this.props.user.activeCoins.indexOf(sym)
    this.props.user.activeCoins.splice(i, 1)
    RNSecureKeyStore.set("userData", JSON.stringify(this.props.user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res) => {
            this.props.updateUser()
        }, (err) => {
            Alert.alert('There was an error updating user state')
        });
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
          <ScrollView style={{width: Dimensions.get('window').width}} contentContainerStyle={{alignItems: 'center', height: Dimensions.get('window').height - 270}}>
          {
            this.props.user.activeCoins.map((item, index) => (
              <TouchableOpacity onPress={() => this.props.util('wallet', {name: item})} style={styles.coinWrapper}>
                 <CoinCard coin={item}/>
              </TouchableOpacity>
            ))
          }
          </ScrollView>
          <View style={styles.navBar}>
            <Row>
              <TouchableOpacity onPress={() => this.setState({addModal: true})}>
                <Image style={styles.navIcon} source={require('../assets/add.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({removeModal: true})}>
                <Image style={styles.navIcon} source={require('../assets/minus.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.util('settings')}>
                <Image style={styles.navIcon} source={require('../assets/gear.png')}/>
              </TouchableOpacity>
            </Row>
          </View>

          <Modal style={styles.modal} isVisible={this.state.addModal} onBackdropPress={() => this.setState({addModal: false})}>
            <Card width={200} height={300}>
              <Text bold size={20} top={20}>Add an asset</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.addAsset('BTC')} disabled={this.props.user.activeCoins.indexOf('BTC') == -1 ? false : true} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('BTC') == -1 ? null : {opacity: 0.5}]}>
                  <Image style={styles.addIcon} source={require('../assets/BTC.png')}/>
                  <Text>Bitcoin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAsset('ILC')} disabled={this.props.user.activeCoins.indexOf('ILC') == -1 ? false : true} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('ILC') == -1 ? null : {opacity: 0.5}]}>
                  <Image style={styles.addIcon} source={require('../assets/ILC.png')}/>
                  <Text>ILCoin</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.addAsset('ZEL')} disabled={this.props.user.activeCoins.indexOf('ZEL') == -1 ? false : true} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('ZEL') == -1 ? null : {opacity: 0.5}]}>
                  <Image style={styles.addIcon} source={require('../assets/ZEL.png')}/>
                  <Text>ZelCash</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAsset('SAFE')} disabled={this.props.user.activeCoins.indexOf('SAFE') == -1 ? false : true} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('SAFE') == -1 ? null : {opacity: 0.5}]}>
                  <Image style={styles.addIcon} source={require('../assets/SAFE.png')}/>
                  <Text>SafeCoin</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Modal>

          <Modal style={styles.modal} isVisible={this.state.removeModal} onBackdropPress={() => this.setState({removeModal: false})}>
            <Card width={200} height={300}>
              <Text bold size={20} top={20}>Remove an asset</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.removeAsset('BTC')} disabled={this.props.user.activeCoins.indexOf('BTC') == -1 ? true : false} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('BTC') == -1 ? {opacity: 0.5} : null]}>
                  <Image style={styles.addIcon} source={require('../assets/BTC.png')}/>
                  <Text>Bitcoin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.removeAsset('ILC')} disabled={this.props.user.activeCoins.indexOf('ILC') == -1 ? true : false} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('ILC') == -1 ? {opacity: 0.5} : null]}>
                  <Image style={styles.addIcon} source={require('../assets/ILC.png')}/>
                  <Text>ILCoin</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.removeAsset('ZEL')} disabled={this.props.user.activeCoins.indexOf('ZEL') == -1 ? true : false} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('ZEL') == -1 ? {opacity: 0.5} : null]}>
                  <Image style={styles.addIcon} source={require('../assets/ZEL.png')}/>
                  <Text>ZelCash</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.removeAsset('SAFE')} disabled={this.props.user.activeCoins.indexOf('SAFE') == -1 ? true : false} style={[{alignItems: 'center'}, this.props.user.activeCoins.indexOf('SAFE') == -1 ? {opacity: 0.5} : null]}>
                  <Image style={styles.addIcon} source={require('../assets/SAFE.png')}/>
                  <Text>SafeCoin</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Modal>
        </View>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 0 : -35,
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
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: DeviceInfo.hasNotch() == 1 ? 70 : 30
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
    },
    modal: {
      flex: 1,
      alignItems: 'center',
    },
    addIcon: {
      width: 80,
      height: 80,
    },
})