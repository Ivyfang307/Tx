import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';


export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  render() {
    return (
      <View style={Styles.styles.container}>
     <View
       style={{width:'100%',height:150,borderBottomWidth:1,borderBottomColor:Constant.LIGHT_GOLD,alignItems:'center',justifyContent:'center'}}>
       <Text style={Styles.styles.titleText}>My Portfolio</Text>
       <Text style={Styles.styles.text}>Enter an Ethereum address to get start</Text>
     </View>

       <View
       style={{flex:1,width:'100%',alignItems:'center',justifyContent:'flex-start'}}>
         <TextInput
             style={{height: 40,width:'100%',borderColor: Constant.LIGHT_GOLD, borderWidth: 1,backgroundColor:Constant.LIGHTER_GOLD,}}
             onChangeText={(text) => this.setState({text})}
             value={this.state.text}
         />

       </View>
      </View>
    );
  }
        }


