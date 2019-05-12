import React, {Component} from 'react';
import {TextInput, Text, View,TouchableOpacity} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import Header from './Header';
import TransactionList from "./TransactionList";

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
             address:null,
            // address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
            transactionList: null,
            screen: 'main',
            addressError: false
        };
    }

    searchAddress = () => {
        console.log('search address');
        if (this.state.address) {
            const transaction_url = "http://api.etherscan.io/api?module=account&action=txlistinternal&address=" + this.state.address + "&startblock=0&endblock=2702578&sort=asc&apikey=" + Constant.ETHERSCAN_API_KEY;
            return fetch(transaction_url)
                .then((response) => response.json())
                .then((responseJson) => {
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

    goToMain = () => {
        this.setState({screen: 'main'});
    }

    render() {
        let screen = null;
        if (this.state.screen === 'main') {
            screen = (
                <View style={{flex:1,width:'100%'}}>
                        <TextInput
                            style={Styles.styles.addressTextInput}
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}
                            placeholder={'Ethereum address'}
                        />
                        {this.state.addressError ?
                            <Text style={Styles.styles.warningText}>Please Enter a valid address</Text> : null}
                    <TouchableOpacity onPress={this.searchAddress}>
                        <Text style={Styles.styles.text}>Continue</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            screen = (
                <TransactionList
                    transactionList={this.state.transactionList}
                    address={this.state.address}
                />
            );
        }
        return (
            <View style={Styles.styles.appWrapper}>
                <View style={Styles.styles.headerWrapper}>
                    <Header screen={this.state.screen}
                            address={this.state.address}
                            goBack={this.goToMain}/>
                </View>
                <View
                    style={{flex:1,width:'100%',alignItems: 'center', justifyContent: 'flex-start'}}>
                    {screen}
                </View>
            </View>
        );
    }
}


