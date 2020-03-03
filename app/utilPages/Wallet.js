import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, ScrollView, KeyboardAvoidingView, Easing } from 'react-native';
import Card from '../../components/Card'
import Text from '../../components/Text'
import WalletHeader from '../../components/WalletHeader'
import Row from '../../components/Row'
import LineGradient from '../../components/LineGradient'

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

  render() {
    return (
        <View style={styles.background}>
            <WalletHeader back={() => this.props.props.utilToDashboard()} coin={this.props.props.args.name}>
              <Row style={styles.toggle}>
                    <TouchableOpacity onPress={this.SwitchToSend} style={{width: 100, alignItems: 'center', marginLeft: 50}}>
                      <Text size={18} bold>SEND</Text>
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
            <ScrollView style={{width: Dimensions.get('window').width, marginBottom: 10, height: Dimensions.get('window').height - 270, marginTop: 40}} contentContainerStyle={{alignItems: 'center'}}>
            <KeyboardAvoidingView behavior="position">
            <View style={{flexDirection: 'row'}}>
                <Animated.View style={{transform: [{translateX: this.state.sendPosition}], width: Dimensions.get('window').width, alignItems: 'center'}}>
                    <Text top={-20} center padding={50} color="grey">send</Text>
                </Animated.View>
                <Animated.View style={{transform: [{translateX: this.state.receivePostion}], width: Dimensions.get('window').width, alignItems: 'center'}}>
                    <Text top={-20} center padding={50} color="grey">recevie</Text>
                </Animated.View>
            </View>
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
    }
});