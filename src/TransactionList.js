import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import TransactionDetails from './TransactionDetails';
import * as Styles from "./Style";

export default class TransactionList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: props.transactionList,
            address: this.props.address
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps) {
            if (this.state.transactionList !== this.props.transactionList) {
                this.setState({transactionList: this.props.transactionList});
            }
            if (this.state.address !== this.props.address) {
                this.setState({address: this.props.address});
            }
        }
    }

    render() {
        return (
                <FlatList
                    style={{flex:1,width:'100%'}}
                    keyExtractor={(item, index) => 'key' + index}
                    data={this.state.transactionList}
                    renderItem={({item}) =>
                            <TransactionDetails
                                transaction={item}
                                address={this.state.address}/>
                    }
                />
        );
    }
}


