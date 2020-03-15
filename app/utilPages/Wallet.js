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
import transaction from '../../components/Transactions'
import Spinner from 'react-native-loading-spinner-overlay'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Wallet extends Component {

    constructor(){
        super()
        this.state = {
            isActivity: true,
            isReceive: false,
            isSend : false,
            fee: 0.0000452,
            address: '',
            amount: 0,
            spinner: false,
            feeButtons: {
                left: 'white',
                middle: 'grey',
                right: 'grey'
            }
        }
    }

    changeFee = (type) => {
        if (type == 'economy'){
            this.setState({feeButtons: {left: 'white', middle: 'grey', right: 'grey'}, fee: 0.0000452})
            if ((Number(this.state.amount) + Number(this.state.fee)).toFixed(4) == this.getCoinInfo().balance){
                this.setState({amount: String(Number(this.getCoinInfo().balance - 0.0000452).toFixed(8))})
            }
        } else if (type == 'standard'){
            this.setState({feeButtons: {left: 'grey', middle: 'white', right: 'grey'}, fee: 0.0002265})
            if ((Number(this.state.amount) + Number(this.state.fee)).toFixed(4) == this.getCoinInfo().balance){
                this.setState({amount: String(Number(this.getCoinInfo().balance - 0.0002265).toFixed(8))})
            }
        } else if (type == 'fast'){
            this.setState({feeButtons: {left: 'grey', middle: 'grey', right: 'white'}, fee: 0.0004068})
            if ((Number(this.state.amount) + Number(this.state.fee)).toFixed(4) == this.getCoinInfo().balance){
                this.setState({amount: String(Number(this.getCoinInfo().balance - 0.0004068).toFixed(8))})
            }
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
                qr: require('../../assets/BTC-qr.png'),
                paste: require('../../assets/BTC-paste.png'),
                balance: this.props.props.balanceData.BTC.balance
            }
        } else if (this.props.props.args.name == 'ILC'){
            return {
                clipboard: require('../../assets/ILC-clipboard.png'),
                color: 'rgb(19, 64, 115)',
                qr: require('../../assets/ILC-qr.png'),
                paste: require('../../assets/ILC-paste.png'),
                balance: this.props.props.balanceData.ILC.balance
            }
        } else if (this.props.props.args.name == 'ZEL'){
            return {
                clipboard: require('../../assets/ZEL-clipboard.png'),
                color: 'rgb(54, 17, 101)',
                qr: require('../../assets/ZEL-qr.png'),
                paste: require('../../assets/ZEL-paste.png'),
                balance: this.props.props.balanceData.ZEL.balance
            }
        } else if (this.props.props.args.name == 'SAFE'){
            return {
                clipboard: require('../../assets/SAFE-clipboard.png'),
                color: 'rgb(63, 149, 184)',
                qr: require('../../assets/SAFE-qr.png'),
                paste: require('../../assets/SAFE-paste.png'),
                balance: this.props.props.balanceData.SAFE.balance
            }
        }
    }

    copyAddress = () => {
        Clipboard.setString(this.props.props.keys[`${this.props.props.args.name}address`])
        Alert.alert('Copied to clipboard')
    }

    sendTx = async () => {
        let self = this
        this.setState({spinner: true})
        transaction(this.state.address, 
            Number(this.state.amount), 
            Number(this.state.fee), 
            this.props.props.keys[`${this.props.props.args.name}address`], 
            this.props.props.keys[`${this.props.props.args.name}privatekey`],
            this.props.props.balanceData,
            this.props.props.args.name, 
            function(result){
            self.setState({spinner: false})
            if (result == 'sent'){
                self.SwitchToActivity()
            }
        }).catch(function (error) {
            self.setState({spinner: false})
        })
    }

    max = () => {
        this.setState({amount: String((Number(this.getCoinInfo().balance) - Number(this.state.fee)).toFixed(8))})
    }

    disMount = () => {
        this.setState({address: '', amount: 0})
        this.changeFee('economy')
    }

  render() {
    return (
        <View style={styles.background}>
        <Spinner
          visible={this.state.spinner}
          overlayColor={'rgba(0,0,0,0.8)'}
        />
        <KeyboardAvoidingView behavior="padding">
            <WalletHeader balance={this.props.props.balanceData} fiatUnit={this.props.props.user.fiatUnit} coin={this.props.props.args.name}>
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
                {
                    this.state.isActivity ? (
                  <View>
                      {
                          this.props.props.balanceData[this.props.props.args.name].transactions.length == 0 ? (
                              <View style={{textAlign: 'center', padding: 20}}>
                                <Text center color="grey">No Transactions</Text>
                                <Text center color="grey">Go to the RECEIVE page to get your wallet address</Text>
                              </View>
                          ) : (
                            <View style={{width: width, height: '100%'}}>
                                <ScrollView style={{width: Dimensions.get('window').width, marginBottom: 10}} contentContainerStyle={{alignItems: 'center'}}>
                                {
                                    this.props.props.balanceData[this.props.props.args.name].transactions.map((item, index) => (
                                      <TouchableOpacity style={[styles.transaction, {borderTopWidth: index == 0 ? 1 : 0.5, borderBottomWidth: index == txs.length - 1 ? 1 : 0.5}]}>
                                        <View style={styles.txIconCard}>
                                          <Image style={styles.txIcon} source={item.direction == 'SENT' ? require('../../assets/sent.png') : require('../../assets/receive.png')}/>
                                        </View>
                                        <View style={styles.time}>
                                          <Text bold>{item.date}</Text>
                                          <Text>{item.time}</Text>
                                        </View>
                                        <View style={styles.txAmountWrapper}>
                                          <Text size={20}>{item.value.toFixed(4)}</Text>
                                          <Text size={10}>{this.props.props.args.name}</Text>
                                        </View>
                                      </TouchableOpacity>
                                    ))
                                   }
                                </ScrollView>
                              </View>
                          )
                      }
                  </View>
                    ) : this.state.isReceive ? (
              <View style={{width: width, height: '100%'}}>
                <ScrollView style={{width: Dimensions.get('window').width}} contentContainerStyle={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.copyAddress}>
                    <Card justifyCenter width={width - 50} height={50} top={30}>
                      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text size={10} center color="grey">{this.props.props.keys[`${this.props.props.args.name}address`]}</Text>
                        <Image style={styles.copyIcon} source={this.getCoinInfo().clipboard}/>
                      </View>
                    </Card>
                  </TouchableOpacity>
                  <Card justifyCenter width={width - 50} height={width - 50} top={30}>
                    <QRCode 
                      size={width - 80} 
                      value={this.props.props.keys[`${this.props.props.args.name}address`]}
                      foregroundColor='black'
                      backgroundColor='#363636'
                    />
                  </Card>
                  </ScrollView>
                  </View>
                    ) : this.state.isSend ? (
                        <View style={{width: width, height: '100%'}}>
                          <ScrollView style={{width: Dimensions.get('window').width}} contentContainerStyle={{alignItems: 'center'}}>
                            <Card style={{flexDirection: 'row'}} justifyCenter top={50} width={300} height={50}>
                              <TextInput placeholder='Address' placeholderTextColor="grey" style={styles.input} onChangeText={(address) => this.setState({address})} value={this.state.address}/>
                              <TouchableOpacity style={{position: 'absolute', right: 15}}>
                                <Image style={styles.qr} source={this.getCoinInfo().qr}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={async () => this.setState({address: await Clipboard.getString()})} style={{position: 'absolute', right: 50}}>
                                <Image style={styles.qr} source={this.getCoinInfo().paste}/>
                              </TouchableOpacity>
                            </Card>
                            <Card style={{flexDirection: 'row'}} justifyCenter top={30} width={300} height={50}>
                              <TextInput keyboardType='numeric' placeholder='Amount' placeholderTextColor="grey" style={styles.input} onChangeText={(amount) => this.setState({amount})} value={this.state.amount}/>
                              <TouchableOpacity onPress={this.max} style={[{borderColor: this.getCoinInfo().color}, styles.sendAll]}>
                                  <Text bold size={10}>MAX</Text>
                              </TouchableOpacity>
                            </Card>
                            <View style={{flexDirection: 'row', marginTop: 25}}>
                                <TouchableOpacity onPress={() => this.changeFee('economy')} style={[styles.feeButton, {borderTopLeftRadius: 15, borderBottomLeftRadius: 15}]}>
                                    <Text size={12} color={this.state.feeButtons.left}>Economy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeFee('standard')} style={[styles.feeButton]}>
                                    <Text size={12} color={this.state.feeButtons.middle}>Standard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeFee('fast')} style={[styles.feeButton, {borderTopRightRadius: 15, borderBottomRightRadius: 15}]}>
                                    <Text size={12} color={this.state.feeButtons.right}>Fast</Text>
                                </TouchableOpacity>
                            </View>
                            <Text top={20} color="grey">Fee: {this.state.fee}</Text>
                            <GradientButton onPress={this.sendTx} title="SEND" top={50} color={this.getCoinInfo().color}/>
                        </ScrollView>
                      </View>
                    ) : null
                }
            </KeyboardAvoidingView>
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
    },
    input: {
        height: 35,
        width: 200,
        marginLeft: -80,
        color: 'white'
    },
    sendAll: {
        width:  70,
        height: 25,
        borderRadius: 20,
        borderWidth: 2,
        position: 'absolute',
        right: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    feeButton: {
        width: width / 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636'
    }
});