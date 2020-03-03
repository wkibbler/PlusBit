import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import Settings from './utilPages/Settings'

export default class Util extends Component {

    constructor(){
        super()
        this.state = {
            imageOpacity: new Animated.Value(0)
        }
    }

  render() {
    return (
        <View style={styles.background}>
            {
                this.props.page == 'settings' ? (
                    <Settings props={this.props}/>
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
    },
});