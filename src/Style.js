import {StyleSheet} from "react-native"
import * as Constant from './Constant';

export const styles = StyleSheet.create({
    appWrapper: {
        flex:1,
        backgroundColor: '#000',
    },
    headerWrapper:{
        height:150,
        borderBottomWidth:1,
        borderBottomColor:Constant.LIGHT_GOLD,
        alignItems:'center',
        justifyContent:'center'
    },
    addressTextInput:{
        marginTop: 20,
        height: 40,
        borderWidth:1,
        backgroundColor:'rgba(225,225,209,0.3)',
        borderColor: Constant.LIGHT_GOLD,
        textAlign: 'center',
        color: Constant.LIGHT_GOLD
    },
    warningText:{
        fontSize:15,
        textAlign:'center',
        color: 'red'

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

    profileWrapper:{
        flex:1,
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'

    },
    transactionWrapper:{
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor:Constant.LIGHT_GOLD,
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    circleWrapper:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#b0ac5d',
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    }
});