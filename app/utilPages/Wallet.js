import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Image, Clipboard, Alert, Platform } from 'react-native';
import Card from '../../components/Card'
import Text from '../../components/Text'
import WalletHeader from '../../components/WalletHeader'
import Row from '../../components/Row'
import LineGradient from '../../components/LineGradient'
import QRCode from 'react-native-qr-generator'
import DeviceInfo from 'react-native-device-info'
import txs from './exampleTxs'
import Slider from '@react-native-community/slider';
import GradientButton from '../../components/GradentButton'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Wallet extends Component {

    constructor(){
        super()
        this.state = {
            isActivity: true,
            isReceive: false,
            isSend : false,
            fee: 0.0001
        }
    }

    switchToReceive = () => {
        this.setState({isActivity: false, isReceive: true, isSend: false})
    }

    SwitchToActivity = () => {
        this.setState({isActivity: true, isReceive: false, isSend: false})
    }

    SwitchToSend = () => {
        this.setState({isActivity: false, isReceive: false, isSend: true})
    }

    getCoinInfo = () => {
        if (this.props.props.args.name == 'BTC'){
            return {
                clipboard: require('../../assets/BTC-clipboard.png'),
                color: 'rgb(233, 122, 22)',
                qr: require('../../assets/BTC-qr.png')
            }
        } else if (this.props.props.args.name == 'ILC'){
            return {
                clipboard: require('../../assets/ILC-clipboard.png'),
                color: 'rgb(19, 64, 115)',
                qr: require('../../assets/ILC-qr.png')
            }
        } else if (this.props.props.args.name == 'ZEL'){
            return {
                clipboard: require('../../assets/ZEL-clipboard.png'),
                color: 'rgb(54, 17, 101)',
                qr: require('../../assets/ZEL-qr.png')
            }
        } else if (this.props.props.args.name == 'SAFE'){
            return {
                clipboard: require('../../assets/SAFE-clipboard.png'),
                color: 'rgb(63, 149, 184)',
                qr: require('../../assets/SAFE-qr.png')
            }
        }
    }

    copyAddress = () => {
        Clipboard.setString(this.props.props.keys[`${this.props.props.args.name}address`])
        Alert.alert('Copied to clipboard')
    }

      oddOrEven(x) {
        return ( x & 1 ) ? require('../../assets/receive.png') : require('../../assets/sent.png');
      }

  render() {
    return (
        <View style={styles.background}>
            <WalletHeader fiatUnit={this.props.props.user.fiatUnit} coin={this.props.props.args.name}>
              <Row style={styles.toggle}>
                    <TouchableOpacity onPress={this.SwitchToActivity} style={{width: 100, alignItems: 'center', marginLeft: 20}}>
                      <Text size={18} bold>ACTIVITY</Text>
                      {
                          this.state.isActivity ? (
                            <LineGradient color='white' top={2} width={100}/>
                          ) : (
                            <LineGradient clear top={2} width={1}/>
                          )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.SwitchToSend} style={{width: 100, alignItems: 'center', marginRight: 0}}>
                        <Text size={18} bold>SEND</Text>
                        {
                            this.state.isSend ? (
                                <LineGradient color='white' top={2} width={100}/>
                            ) : (
                                <LineGradient clear top={2} width={100}/>
                            )
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchToReceive} style={{width: 100, alignItems: 'center', marginRight: 20}}>
                        <Text size={18} bold>RECEIVE</Text>
                        {
                            this.state.isReceive ? (
                                <LineGradient color='white' top={2} width={100}/>
                            ) : (
                                <LineGradient clear top={2} width={100}/>
                            )
                        }
                    </TouchableOpacity>                
                </Row>
            </WalletHeader>
            <ScrollView style={{width: Dimensions.get('window').width, marginBottom: 20, height: Dimensions.get('window').height - 210}} contentContainerStyle={{}}>
            <KeyboardAvoidingView behavior="position">
                {
                    this.state.isActivity ? (
                        <Animated.View style={{/*transform: [{translateX: this.state.activityPosition}],*/ width: Dimensions.get('window').width, alignItems: 'center'}}>
                  <View style={{marginTop: 20}}>
                    {
                        txs.map((item, index) => (
                            <TouchableOpacity style={[styles.transaction, {borderTopWidth: index == 0 ? 1 : 0.5, borderBottomWidth: index == txs.length - 1 ? 1 : 0.5}]}>
                                <View style={styles.txIconCard}>
                                  <Image style={styles.txIcon} source={this.oddOrEven(index)}/>
                                </View>
                                <View style={styles.time}>
                                  <Text bold>4 April</Text>
                                  <Text>20:19</Text>
                                </View>
                                <View style={styles.txAmountWrapper}>
                                    <Text size={20}>{Math.random().toFixed(4)}</Text>
                                    <Text size={10}>{this.props.props.args.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                  </View>
                </Animated.View>
                    ) : this.state.isReceive ? (
                        <Animated.View style={{/*transform: [{translateX: this.state.receivePostion}],*/ width: Dimensions.get('window').width, alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.copyAddress}>
                    <Card justifyCenter width={370} height={50} top={30}>
                      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text center color="grey">{this.props.props.keys[`${this.props.props.args.name}address`]}</Text>
                        <Image style={styles.copyIcon} source={this.getCoinInfo().clipboard}/>
                      </View>
                    </Card>
                  </TouchableOpacity>
                  <Card justifyCenter width={370} height={370} top={30}>
                    <QRCode 
                      size={340} 
                      value={this.props.props.keys[`${this.props.props.args.name}address`]}
                      foregroundColor='black'
                      backgroundColor='#363636'
                    />
                  </Card>
                </Animated.View>
                    ) : this.state.isSend ? (
                        <View style={{alignItems: 'center'}}>
                            <Card style={{flexDirection: 'row'}} justifyCenter top={50} width={300} height={50}>
                              <TextInput placeholder='Address' placeholderTextColor="grey" style={styles.input} onChangeText={(loginPassword) => this.setState({loginPassword})} value={this.state.loginPassword}/>
                              <TouchableOpacity style={{position: 'absolute', right: 15}}>
                                <Image style={styles.qr} source={this.getCoinInfo().qr}/>
                              </TouchableOpacity>
                            </Card>
                            <Card justifyCenter top={30} width={300} height={50}>
                              <TextInput placeholder='Amount' placeholderTextColor="grey" style={styles.input} onChangeText={(loginPassword) => this.setState({loginPassword})} value={this.state.loginPassword}/>
                            </Card>
                            <Slider
                              style={{width: 210, height: 40, marginTop: 20}}
                              minimumValue={0.00001}
                              maximumValue={0.001}
                              minimumTrackTintColor={this.getCoinInfo().color}
                              maximumTrackTintColor="grey"
                              onValueChange={(fee) => this.setState({fee: fee.toFixed(5)})}
                             />
                            <Text color="grey">Fee: {this.state.fee}</Text>
                            <GradientButton title="SEND" top={50} color={this.getCoinInfo().color}/>
                        </View>
                    ) : null
                }
            </KeyboardAvoidingView>
            </ScrollView>
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
    },
    deleteTouchable: {
        width: 277,
        height: 87,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggle: {
        position: 'absolute',
        bottom: 20
    },
    copyIcon: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    createWrapper: {
        bottom: Platform.OS == 'ios' ? 30 : 50,
        right: 20,
        position: 'absolute',
    },
    transaction: {
        width: Dimensions.get('window').width - 10,
        height: 65,
        borderColor: 'grey',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        justifyContent: 'center'
    },
    txIcon: {
        width: 35,
        height: 35
      },
    time: {
        marginLeft: 100
      },
      txAmountWrapper: {
        position: 'absolute',
        right: 20,
        marginTop: 15,
        alignItems: 'flex-end',
      },
      txIconCard: {
        position: 'absolute',
        left: 20,
        marginTop: 13,
        justifyContent: 'center',
      },
      logo: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: 0
    },
    qr: {
        width: 25,
        height: 25,
    }
});