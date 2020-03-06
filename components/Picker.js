import React, {Component} from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'

export default class Picker extends Component {
  render() {
    return (
        <RNPickerSelect useNativeAndroidPickerStyle={false} 
        style={{inputIOS:{
            color: 'grey', 
            borderWidth: 2, 
            borderColor: 'grey', 
            marginTop: this.props.top || 0, 
            height: this.props.height || 40, 
            width: this.props.width || 230, 
            borderRadius: 20,
            textAlign: 'center'
        }, inputAndroid: {
          color: 'grey', 
          borderWidth: 2, 
          borderColor: 'grey', 
          marginTop: this.props.top || 0, 
          height: this.props.height || 40, 
          width: this.props.width || 230, 
          borderRadius: 20,
          textAlign: 'center'
        },
        placeholder: {
          color: 'grey'
        }
          }}
          placeholder={{label: 'Select a different currency'}}
          onValueChange={(value) => this.props.onChange(value)}
          items={this.props.items}/>
    );
  }
}