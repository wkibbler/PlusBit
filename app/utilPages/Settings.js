import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, Animated, Image, Clipboard, Linking } from 'react-native';
import Card from '../../components/Card'
import Text from '../../components/Text'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Picker from '../../components/Picker'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Settings extends Component {

    constructor(){
        super()
        this.state = {
            privKeyHeight: new Animated.Value(90),
            showPrivKeys: false
        }
    }

    deleteWallet = () => {
        Alert.alert(
            'Are you sure',
            'This will remove add wallet data from your device',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Delete wallet canceled Pressed'),
                style: 'cancel',
              },
              {text: 'Delete Wallet', onPress: () => {
                RNSecureKeyStore.remove("userData")
                .then((res) => {
                  Alert.alert('Done')
                  this.props.props.utilToLogin()
                }, (err) => {
                  Alert.alert('Error deleting wallet')
                })
              }},
            ],
            {cancelable: false},
          );
    }

    privKey = () => {
        if (!this.state.showPrivKeys){
            this.setState({showPrivKeys: true})
            Animated.timing(this.state.privKeyHeight, {
                toValue: 200,
                duration: 800,
              }).start();
        } else {
            this.setState({showPrivKeys: false})
            Animated.timing(this.state.privKeyHeight, {
                toValue: 90,
                duration: 800,
              }).start();
        }
    }

    copyPrivateKey = (sym) => {
        Clipboard.setString(this.props.props.keys[`${sym}address`])
        Alert.alert('Copied to clipboard')
    }

  render() {
    return (
        <View style={styles.background}>
          <ScrollView style={{width: width}} contentContainerStyle={{alignItems: 'center', height: height}}>
            <Card height={90} top={60} width={width - 50}>
                <TouchableOpacity onPress={this.deleteWallet} style={styles.deleteTouchable}>
                    <Text size={25} bold>Delete Wallet</Text>
                </TouchableOpacity>
            </Card>
            <Card height={this.state.privKeyHeight} top={30} width={width - 50}>
                <TouchableOpacity onPress={this.privKey} style={styles.deleteTouchable}>
                    <Text size={25} bold>Private Keys</Text>
                </TouchableOpacity>
                {
                    this.state.showPrivKeys ? (
                        <View style={{alignItems: 'flex-start', width: width - 60}}>
                          <Text left={20}>Click to copy</Text>
                          <View style={styles.iconWrapper}>
                              <TouchableOpacity onPress={() => this.copyPrivateKey('BTC')}>
                                  <Image style={styles.icon} source={require('../../assets/BTC.png')}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => this.copyPrivateKey('ILC')}>
                                  <Image style={styles.icon} source={require('../../assets/ILC.png')}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => this.copyPrivateKey('ZEL')}>
                                  <Image style={styles.icon} source={require('../../assets/ZEL.png')}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => this.copyPrivateKey('SAFE')}>
                                  <Image style={styles.icon} source={require('../../assets/SAFE.png')}/>
                              </TouchableOpacity>
                          </View>
                        </View>
                    ) : null
                }
            </Card>
            <Card top={30} width={width - 50} height={160}>
                  <Text top={15} size={20} bold>Change fiat currency</Text>
                  <Text size={12} color='grey' top={10}>Current: {this.props.props.user.fiatUnit}</Text>
                  <View><Picker top={15} onChange={(res) => this.props.props.updateFiatUnit(res)} items={[
                      {label: 'USD', value: 'USD'},
                      {label: 'GBP', value: 'GBP'},
                      {label: 'EUR', value: 'EUR'},
                      {label: 'JPY', value: 'JPY'}
                  ]} /></View>
                </Card>
                <Card top={30} width={width - 50} height={80}>
                  <View style={{flexDirection: 'row', marginTop: 12}}>
                  <Text size={12}>From </Text>
                  <TouchableOpacity onPress={() => Linking.openURL('https://plusbit.tech')}><Text color='#00cbb3' size={12}>PlusBit </Text></TouchableOpacity>
                  <Text size={12}>© 2020 All rights reserved</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text size={12}>By </Text>
                  <TouchableOpacity onPress={() => Linking.openURL('https://libtechnologies.io')}><Text color='#00cbb3' size={12}>L.I.B. Technologies </Text></TouchableOpacity>
                  </View>
                </Card>
          </ScrollView>
        </View>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: width,
        alignItems: 'center',
    },
    deleteTouchable: {
        width: 277,
        height: 87,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 60,
        width: 60,
        marginLeft: 22
    },
    iconWrapper: {
        width: width - 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
});