import React, {Component} from 'react';
import {Text, View, TouchableOpacity,ActivityIndicator} from 'react-native';
import * as Constant from './Constant';
import * as Styles from './Style';
import ModalSelector from 'react-native-modal-selector'

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            screen: props.screen,
            balance: 0,
            address: props.address,
            currency: 'USD',
            currencyRate: 1,
            hideModal: true,
            openSelector: false,
            exchangedBalance: 0,
            dollarSign: '$',
            loadBalance:false,
        };

    }

    componentDidMount = () => {
        this.getBalance();
    }

    getBalance=()=>{
        this.setState({loadBalance:true});
        const balance_url = "https://api.etherscan.io/api?module=account&action=balance&address=" + this.props.address + "&tag=latest&apikey=" + Constant.ETHERSCAN_API_KEY;
        return fetch(balance_url)
            .then((response) => response.json())
            .then((responseJson) => {
                let balance = parseInt(responseJson.result) / (1000000000000000000);
        const currency_url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=" + Constant.CURRENCY_API_KEY;
        return fetch(currency_url)
            .then((response) => response.json())
            .then((responseJson) => {
                let exchangedBalance = parseInt(balance) * parseInt(responseJson.ETH['USD']);
                this.setState({
                    balance: balance,
                    exchangedBalance: exchangedBalance,
                    loadBalance:false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
            console.error(error);
        });

    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps){
            if (this.state.screen !== this.props.screen) {
                this.setState({screen: this.props.screen});
            }
            if (this.state.address !== this.props.address) {
                console.log('change address')
                this.setState({address: this.props.address});
                this.getBalance();
            }
        }

    }

    selectCurrency = (option) => {
        this.setState({loadBalance:true});
        const currency_url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=" + option.value + "&api_key=" + Constant.CURRENCY_API_KEY;
        return fetch(currency_url)
            .then((response) => response.json())
            .then((responseJson) => {
                let exchangedBalance = parseInt(this.state.balance) * parseInt(responseJson.ETH[option.value]);

                this.setState({
                    dollarSign: option.dollarSign,
                    currency: option.value,
                    exchangedBalance: exchangedBalance,
                    loadBalance:false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    dollarFormat = (str) => {
        if (str.toString().length >= 4) {
            return (str + '').replace(/.(?=(?:.{3})+$)/g, '$&,');
        } else {
            return str
        }
    }

    goBack = () => {
        this.props.goBack();
    }

    render() {
        const currencyList = [
            {key: 0, dollarSign: '$', value: 'USD', label: 'USD Dollar'},
            {key: 1, dollarSign: '$', value: 'SGD', label: 'Singapore Dollar'},
            {key: 2, dollarSign: '¥', value: 'JPY', label: 'Japanese Yen'},
            {key: 3, dollarSign: '₩', value: 'KRW', label: 'Korean Won'},
            {key: 4, dollarSign: '£', value: 'GBP', label: 'British Sterling Pound'},
            {key: 5, dollarSign: '¥', value: 'CNY', label: 'Chinese Yuan'},
        ];

        console.log('exchanaged balace '+this.state.exchangedBalance)

        return (
            <View style={{flex: 1,width:'100%',alignItems: 'center', justifyContent: 'center',}}>
                {this.state.screen === 'transactionList' ?
                    <View style={Styles.styles.profileWrapper}>
                        <TouchableOpacity onPress={this.goBack} style={{height:30}}>
                            <Text style={Styles.styles.text}>{'<Back'}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1,width:'100%',alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={Styles.styles.titleText}>My Portfolio</Text>
                        </View>
                    </View>
                    :
                    <Text style={Styles.styles.titleText}>My Portfolio</Text>
                }

                {this.state.screen === 'transactionList'?
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {this.state.loadBalance?
                                <ActivityIndicator size="large" color={Constant.LIGHT_GOLD}/>
                            :
                            <Text style={Styles.styles.text}>
                            {this.state.dollarSign + this.dollarFormat(this.state.exchangedBalance)}
                                </Text>}

                            {this.state.hideModal ?
                                <TouchableOpacity onPress={() => {
                                    this.setState({openSelector: true, hideModal: false})
                                }}>
                                    <Text style={Styles.styles.text}>∨</Text>
                                </TouchableOpacity>
                                :
                                <ModalSelector
                                    visible={this.state.openSelector}
                                    data={currencyList}
                                    initValue={'∨'}
                                    selectTextStyle={Styles.styles.text}
                                    onChange={(option) => {
                                        this.selectCurrency(option)
                                    }}
                                    overlayStyle={{justifyContent: 'flex-end'}}
                                    selectStyle={{borderWidth: 0,}}
                                    cancelText={'Cancel'}
                                    cancelTextStyle={{color: 'rgba(0,118,255,0.9)', fontWeight: 'bold'}}
                                    onModalClose={() => {
                                        this.setState({hideModal: true});
                                    }
                                    }
                                />
                            }

                        </View>
                    :
                    <Text style={Styles.styles.text}>Enter an Ethereum address to get start</Text>
                }
            </View>

        );
    }
}


