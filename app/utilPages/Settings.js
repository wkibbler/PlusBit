import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Alert } from 'react-native';
import Card from '../../components/Card'
import Text from '../../components/Text'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

export default class Settings extends Component {

    constructor(){
        super()
        this.state = {
            //imageOpacity: new Animated.Value(0)
        }
    }

    deleteWallet = () => {
        RNSecureKeyStore.remove("userData")
        .then((res) => {
          Alert.alert('Done')
          this.props.props.utilToLogin()
        }, (err) => {
          Alert.alert('Error deleting wallet')
        });
    }

  render() {
    return (
        <View style={styles.background}>
            <Card height={90} top={60} width={280}>
                <TouchableOpacity onPress={this.deleteWallet} style={styles.deleteTouchable}>
                    <Text size={25} bold>Delete Wallet</Text>
                </TouchableOpacity>
            </Card>
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
    }
});