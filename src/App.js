import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import Header from './Header';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      address:'0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
      addressFound:false,
      transactionList:null
    };
  }

  searchAddress=()=>{
    console.log('search address');
    this.setState({addressFound:true});

    const request_url = "http://api.etherscan.io/api?module=account&action=txlistinternal&address="+this.state.address+"&startblock=0&endblock=2702578&sort=asc&apikey="+Constant.ETHERSCAN_API_KEY;
    return fetch(request_url)
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
              transactionList: responseJson.result
            });

            console.log('transaction list '+JSON.stringify(this.state.transactionList));
        })
        .catch((error) => {
          console.error(error);
        });


  }
  render() {
    return (
      <View style={Styles.styles.container}>
        <View style={{width:'100%',height:150,borderBottomWidth:1,borderBottomColor:Constant.LIGHT_GOLD,alignItems:'center',justifyContent:'center'}}>
     <Header addressFound={this.state.addressFound}/>
        </View>

       <View
       style={{flex:1,width:'100%',alignItems:'center',justifyContent:'flex-start'}}>
         <View
             style={{marginTop:20,height: 40,width:'100%',borderColor: Constant.LIGHT_GOLD, borderWidth: 1,alignItems:'center',justifyContent:'center',}}
         >
         <TextInput
             style={{width:'90%',textAlign:'center',color: Constant.LIGHT_GOLD}}
             onChangeText={(text) => this.setState({address:text})}
             value={this.state.address}
             placeholder={'Ethereum address'}
         />
         </View>
         <TouchableOpacity onPress={this.searchAddress}>
           <Text style={Styles.styles.text}>Continue</Text>
         </TouchableOpacity>

       </View>
      </View>
    );
  }
        }


