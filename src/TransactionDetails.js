import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import * as Styles from './Style';
import moment from 'moment';

export default class TransactionDetails extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            transaction: props.transaction,
            address: props.address
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps) {
            if (this.state.transaction !== this.props.transaction) {
                console.log('different transaction  ');
                this.setState({transaction: this.props.transaction});
            }
            if (this.state.address !== this.props.address) {
                this.setState({address: this.props.address});
            }
        }
    }

    showTransactionDetails = () => {
        console.log('show transaction details ')
    }

    render() {
        return (
            <TouchableOpacity style={Styles.styles.transactionWrapper}
                              onPress={this.showTransactionDetails}>
                    <View style={Styles.styles.circleWrapper}>
                        <Text style={{color: '#fff'}}>ETH</Text>
                    </View>
                <View style={{flex: 1,alignItems: 'flex-start', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: '#fff'}}>
                            {(this.state.transaction.value / 1000000000000000000) + ' ETH'}</Text>
                        <View style={{flex: 1}}></View>
                        <Text style={{color: '#fff'}}>
                            {moment(moment.unix(this.state.transaction.timeStamp).format('L')).fromNow()+' 〉 '}
                        </Text>

                    </View>
                        <Text style={{color: '#fff'}}>
                            {this.state.transaction.from === this.state.address ?
                                'SENT TO' : 'RECEIVED FROM'}
                        </Text>
                    <Text style={{color: '#fff'}} numberOfLines={1} ellipsizeMode={'tail'}>
                        {this.state.transaction.from === this.state.address ?
                            this.state.transaction.to : this.state.transaction.from}

                    </Text>

                </View>
            </TouchableOpacity>

        );
    }
}

