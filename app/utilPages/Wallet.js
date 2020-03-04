import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, ScrollView, KeyboardAvoidingView, Easing, Image, Clipboard, Alert } from 'react-native';
import Card from '../../components/Card'
import Text from '../../components/Text'
import WalletHeader from '../../components/WalletHeader'
import Row from '../../components/Row'
import LineGradient from '../../components/LineGradient'
import QRCode from 'react-native-qr-generator'
import DeviceInfo from 'react-native-device-info'
import txs from './exampleTxs'

export default class Wallet extends Component {

    constructor(){
        super()
        this.state = {
            isSend: true,
            isReceive: false,
            sendPosition: new Animated.Value(Dimensions.get('window').width / 2),
            receivePostion: new Animated.Value(Dimensions.get('window').width / 2),
        }
    }

    switchToReceive = () => {
        this.setState({isSend: false, isReceive: true})
        Animated.sequence([
            Animated.timing(this.state.sendPosition, { toValue: -Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
            Animated.timing(this.state.receivePostion, { toValue: -Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
          ]).start()
    }

    SwitchToSend = () => {
        this.setState({isSend: true, isReceive: false})
        Animated.sequence([
            Animated.timing(this.state.receivePostion, { toValue: Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
            Animated.timing(this.state.sendPosition, { toValue: Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
          ]).start()
    }

    getClipboardIcon = () => {
        if (this.props.props.args.name == 'BTC'){
            return require('../../assets/BTC-clipboard.png')
        } else if (this.props.props.args.name == 'ILC'){
            return require('../../assets/ILC-clipboard.png')
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
            <WalletHeader coin={this.props.props.args.name}>
              <Row style={styles.toggle}>
                    <TouchableOpacity onPress={this.SwitchToSend} style={{width: 100, alignItems: 'center', marginLeft: 50}}>
                      <Text size={18} bold>WALLET</Text>
                      {
                          this.state.isSend ? (
                            <LineGradient color='white' top={2} width={100}/>
                          ) : (
                            <LineGradient clear top={2} width={1}/>
                          )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchToReceive} style={{width: 100, alignItems: 'center', marginRight: 50}}>
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
            <ScrollView style={{width: Dimensions.get('window').width, marginBottom: 20, height: Dimensions.get('window').height - 210}} contentContainerStyle={{alignItems: 'center'}}>
            <KeyboardAvoidingView behavior="position">
            <View style={{flexDirection: 'row'}}>
                <Animated.View style={{transform: [{translateX: this.state.sendPosition}], width: Dimensions.get('window').width, alignItems: 'center'}}>
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
                <Animated.View style={{transform: [{translateX: this.state.receivePostion}], width: Dimensions.get('window').width, alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.copyAddress}>
                    <Card justifyCenter width={370} height={50} top={30}>
                      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text center color="grey">{this.props.props.keys[`${this.props.props.args.name}address`]}</Text>
                        <Image style={styles.copyIcon} source={this.getClipboardIcon()}/>
                      </View>
                    </Card>
                  </TouchableOpacity>
                  <Card justifyCenter width={370} height={370} top={30}>
                    <QRCode 
                      size={340} 
                      value={this.props.props.keys[`${this.props.props.args.name}address`]}
                      foregroundColor='white'
                      backgroundColor='#363636'
                    />
                  </Card>
                </Animated.View>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
            {
                this.state.isSend ? (
                    <TouchableOpacity style={styles.createWrapper}>
                        <Card justifyCenter width={200} height={50}>
                            <Text bold>Make new transaction</Text>
                        </Card>
                    </TouchableOpacity>
                ) : null
            }
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
        bottom: 30,
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
});