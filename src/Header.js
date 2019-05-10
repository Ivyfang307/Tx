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
      currency:'USD',
        currencyRate:1,
        hideModal:true,
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

  selectCurrency=(option)=>{
    console.log('select currency '+JSON.stringify(option));
      const request_url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms="+option.value+"&api_key="+Constant.CURRENCY_API_KEY;
      return fetch(request_url)
          .then((response) => response.json())
          .then((responseJson) => {
              let calculateBalance=parseInt(this.state.balance)*parseInt(responseJson.ETH[option.value]);

              this.setState({
                  currency:option.value,
                  balance: calculateBalance
              });
          })
          .catch((error) => {
              console.error(error);
          });


  }

  render() {
      const currencyList = [
          { key: 0,value:'USD',label: 'USD Dollar' },
          { key: 1,value:'SGD',label: 'Singapore Dollar' },
          { key: 2,value:'JPN',label: 'Japanese Yen' },
          { key: 3,value:'dd',label: 'Korean Won' },
          { key: 4,value:'ss',label: 'British Sterling Pound' },
          { key: 5,value:'CNY',label: 'Chinese Yuan' },
      ];

      return (
     <View
       style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Text style={Styles.styles.titleText}>My Portfolio</Text>
       {this.state.screen ?
           <View>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
           <Text style={Styles.styles.text}>{this.state.currency+this.state.balance}</Text>
               {this.state.hideModal?
                   <TouchableOpacity onPress={()=>{ this.setState({openSelector: true,hideModal:false}) }}>
                       <Text style={Styles.styles.text}>∨</Text>
                   </TouchableOpacity>
                   :
                   <ModalSelector
                       visible={this.state.openSelector}
                       data={currencyList}
                       initValue={'∨'}
                       selectTextStyle={Styles.styles.text}
                       onChange={(option)=>{this.selectCurrency(option)}}
                       overlayStyle={{ justifyContent: 'flex-end'}}
                       selectStyle={{borderWidth:0,}}
                       cancelText={'Cancel'}
                       cancelTextStyle={{color:'rgba(0,118,255,0.9)',fontWeight: 'bold'}}
                       onModalClose={() => {
                           this.setState({hideModal: true});}
                       }
                   />
               }

           </View>

           </View>


           :
           <Text style={Styles.styles.text}>Enter an Ethereum address to get start</Text>
       }


     </View>

    );
  }
        }


