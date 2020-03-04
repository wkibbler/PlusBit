import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, Alert } from 'react-native';
import Settings from './utilPages/Settings'
import Wallet from './utilPages/Wallet'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default class Util extends Component {

    constructor(){
        super()
        this.state = {
            imageOpacity: new Animated.Value(0),
        }
    }

  render() {
    return (
        <GestureRecognizer config={{velocityThreshold: 0.000001, directionalOffsetThreshold: 80}} onSwipeRight={() => this.props.utilToDashboard()} style={styles.background}>
            {
                this.props.page == 'settings' ? (
                    <Settings props={this.props}/>
                ) : this.props.page == 'wallet' ? (
                    <Wallet props={this.props}/>
                ) : null
            }
        </GestureRecognizer>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});