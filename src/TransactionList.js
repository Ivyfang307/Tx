import React, {Component} from 'react';
import {Platform, TextInput, Text, View, StyleSheet,FlatList} from 'react-native';
import TransactionDetails from './TransactionDetails';
import * as Constant from "./Constant";

export default class TransactionList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      transactionList:props.transactionList,
        address:this.props.address
    };
  }

    componentDidUpdate(prevProps, prevState){
        if(prevProps){
            if(this.state.transactionList !== this.props.transactionList){
                this.setState({transactionList:this.props.transactionList});
            }
            if(this.state.address !== this.props.address){
                this.setState({address:this.props.address});
            }
        }

    }

  render() {
    return (
       <View
       style={{flex:1,width:'100%',alignItems:'center',justifyContent:'flex-start'}}>
           <FlatList
               keyExtractor={(item, index) => 'key' + index}
               data={this.state.transactionList}
               renderItem={({item}) =>
                  <View style={{height:80,width:'100%',borderBottomWidth:1,borderBottomColor:'#d8d470'}}>
                       <TransactionDetails
                           transaction={item}
                           address={this.state.address}/>
                   </View>
                  }
           />

       </View>
    );
  }
        }


