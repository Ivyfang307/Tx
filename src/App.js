import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import Header from './Header';
import TransactionList from "./TransactionList";

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
        // address:null,
      address:'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
      transactionList:null,
        screen:'main',
        addressError:false
    };
  }

  searchAddress=()=> {
      console.log('search address');
      if (this.state.address) {
          const request_url = "http://api.etherscan.io/api?module=account&action=txlistinternal&address=" + this.state.address + "&startblock=0&endblock=2702578&sort=asc&apikey=" + Constant.ETHERSCAN_API_KEY;
          return fetch(request_url)
              .then((response) => response.json())
              .then((responseJson) => {
                  console.log('transaction list ' + JSON.stringify(responseJson))

                  if (responseJson.status === "1") {
                      this.setState({
                          transactionList: responseJson.result,
                          screen: 'transactionList',
                          addressError: false
                      });

                  } else {
                      this.setState({addressError: true});
                  }

              })
              .catch((error) => {
                  console.error(error);
                  this.setState({addressError: true});
              });
      } else {
          this.setState({addressError: true});
      }
  }

    goToMain=()=>{
        this.setState({screen:'main'});
    }

  render() {
      let screen=null;
      if(this.state.screen==='main'){
          screen=(
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
                      {this.state.addressError?<Text style={{color:'red'}}>Please Enter a valid address</Text>:null}
                  </View>
                  <TouchableOpacity onPress={this.searchAddress}>
                      <Text style={Styles.styles.text}>Continue</Text>
                  </TouchableOpacity>

              </View>
          );
      }
      else{
          screen=(
              <View
                  style={{flex:1,width:'100%',alignItems:'center',justifyContent:'flex-start'}}>
                <TransactionList
                    transactionList={this.state.transactionList}
                    address={this.state.address}
                    />

              </View>
          );

      }    return (
      <View style={Styles.styles.container}>
        <View style={{width:'100%',height:150,borderBottomWidth:1,borderBottomColor:Constant.LIGHT_GOLD,alignItems:'center',justifyContent:'center'}}>
     <Header screen={this.state.screen}
     address={this.state.address}
             goBack={this.goToMain}/>
        </View>
          {screen}
      </View>
    );
  }
        }


