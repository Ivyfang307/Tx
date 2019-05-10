import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Image, View,TextInput,TouchableOpacity,FlatList} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import moment from 'moment';

export default class TransactionDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
        transaction:props.transaction,
        address:props.address

    };
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps, prevState){
      if(prevProps){
          if(this.state.transaction !== this.props.transaction){
              console.log('different transaction  ');
              this.setState({transaction:this.props.transaction});
          }
          if(this.state.address !== this.props.address){
              this.setState({address:this.props.address});
          }
      }

  }


    render() {
         console.log('address '+this.state.address)
        // console.log('transaction '+JSON.stringify(this.state.transaction))
    return(
      <View style={{flex:1,width:400,flexDirection:'row'}}>
         <View style={{height:'100%',width:80,alignItems:'center',justifyContent:'center'}}>
             <View style={{width:60,height:60,borderRadius:30,backgroundColor:Constant.LIGHT_GOLD,alignItems:'center',justifyContent:'center'}}>
                 <Text style={{color:'#fff'}}>ETH</Text>
             </View>
         </View>
      <View style={{flex:1,width:200,alignItems:'flex-start',justifyContent:'flex-start'}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'#fff'}}>
                      {this.state.transaction.value}</Text>
              <View style={{flex:1}}></View>
                  <Text style={{color:'#fff'}}>
                      { moment(moment.unix(this.state.transaction.timeStamp).format('L')).fromNow()}
                  </Text>

          </View>
          <View>
              <Text style={{color:'#fff'}}>
              {this.state.transaction.from===this.state.address?
              'SENT TO':'RECEIVED FROM'}
              </Text>
          </View>
          <Text style={{color:'#fff'}} numberOfLines={1} ellipsizeMode={'tail'} >
              {this.state.transaction.from===this.state.address?
                  this.state.transaction.to:this.state.transaction.from}

          </Text>

      </View>
      <View style={{width:20}}>
          <Text style={{color:'#fff'}}>〉</Text>
      </View>
        </View>

    );
  }
}

