import {StyleSheet} from "react-native"
import * as Constant from './Constant';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    titleText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color:Constant.LIGHT_GOLD,
        fontWeight:'bold'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:Constant.LIGHT_GOLD

    },
    instructions: {
        textAlign: 'center',
        color: '#e2dfb9',
        marginBottom: 5,
    },
});