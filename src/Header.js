import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';


export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text:null,
      screen:props.screen,
      balance:0,
      address:props.address,
      currency:'$'
    };

  }

  componentDidMount =()=>{
    console.log('search balance');
    const request_url = "https://api.etherscan.io/api?module=account&action=balance&address="+this.state.address+"&tag=latest&apikey="+Constant.ETHERSCAN_API_KEY;
    return fetch(request_url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            balance: responseJson.result,
          });
        })
        .catch((error) => {
          console.error(error);
        });


  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps){
      if(this.state.screen !== this.props.screen){
        this.setState({screen:this.props.screen});
      }
      if(this.state.address !== this.props.address){
        this.setState({address:this.props.address});
      }
    }

  }

  selectCurrency=()=>{
    console.log('select currency')
  }

  render() {
    return (
     <View
       style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Text style={Styles.styles.titleText}>My Portfolio</Text>
       {this.state.screen ?
           <TouchableOpacity onPress={this.selectCurrency}>
             <Text style={Styles.styles.text}>
               {this.state.currency+this.state.balance}</Text>
           </TouchableOpacity>

       :
           <Text style={Styles.styles.text}>Enter an Ethereum address to get start</Text>
       }

     </View>

    );
  }
        }


