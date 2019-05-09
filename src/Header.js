import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';


export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text:null,
      addressFound:props.addressFound};
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps){
      if(this.state.addressFound !== this.props.addressFound){
        this.setState({addressFound:this.props.addressFound});
      }
    }

  }

  render() {
    return (
     <View
       style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Text style={Styles.styles.titleText}>My Portfolio</Text>
       {this.state.addressFound ?
           <Text style={Styles.styles.text}>found</Text>
       :
           <Text style={Styles.styles.text}>Enter an Ethereum address to get start</Text>
       }

     </View>

    );
  }
        }


