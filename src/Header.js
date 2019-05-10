import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import ModalSelector from 'react-native-modal-selector'

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text:null,
      screen:props.screen,
      balance:0,
      address:props.address,
      currency:'$',
        openSelector:false
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
    console.log('select currency');
      this.setState({openSelector:true});

  }

  render() {
      const currencyList = [
          { key: 0,label: 'US Dollar' },
          { key: 1,label: 'Singapore Dollar' },
          { key: 2,label: 'Japanese Yen' },
          { key: 3,label: 'Korean Won' },
          { key: 4,label: 'British Sterling Pound' },
          { key: 5,label: 'Chinese Yuan' },
      ];

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
         <ModalSelector
             visible={this.state.openSelector}
             data={currencyList}
             initValue={this.state.currency+this.state.balance}
             initValueTextStyle={{color:'#fff'}}
             style={{borderRadius:100,color:'#fff'}}
             onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />

     </View>

    );
  }
        }


