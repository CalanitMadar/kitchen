import React from 'react';
import { StyleSheet, View, Button, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

//====================================================================
//================================================
var ColorKgCard = function (card) {
    let min = card.QuantityExist;

    let max = card.Quantity;

    let color;
    if (min < (max / 2)) {
        color = '#C41C21';
    }
    
    else if (min >= (max / 2)) {
        color = '#28AA29';
    }

    return color;
}

//====================================================================
const StorageUnitCard = ({ route, ...props }) => {
    const navigation = useNavigation();
    console.log(props.card);
    return (
        <View style={styles.cardContainer} >

            <View style={styles.line1Style}>
                <Text style={styles.nameStyle}>{props.card.Namep + " " }</Text>
                <Text style={[styles.rectangle, { backgroundColor: ColorKgCard(props.card) }]}>{"  " + props.card.QuantityExist+"/"+props.card.Quantity + "  " + "kg  "}</Text>
            </View>

            <AntDesign style={styles.icon} name="pluscircle" size={30} color="black" />

            <View style={styles.line2Style}>
                <Text style={styles.text1Style}>Brand: {props.card.Brand }</Text>
                <Text style={styles.text2Style}>  Expires: {props.card.QuantityExist }</Text>
                <Text style={styles.text3Style}>  Delivered: {props.card.Deliverd}</Text>

            </View>

            

            
        </View>
    )
}
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 50,
        height: 64,
        borderRadius: 15,
        shadowColor: '#00000029',
        shadowRadius: 6,
        top: '50%',

    },
    line1Style:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        left: '5%',
        top: '8%',

    },
    nameStyle:{
        fontFamily: 'GeneralSans-Semibold',
        fontWeight: 'bold',
        fontSize: 14,
    },
    rectangle:{
        backgroundColor: '#C31B20',
        borderRadius: 10,
        color: '#FFFFFF',
        fontSize: 11,
    },
    line2Style:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'GeneralSans-Medium',
        fontSize: 11,
        color: '#000000',
        opacity: '50%',
        position: 'absolute',
        left: '5%',
        top: '40%',
    },
    text1Style:{

    },
    text2Style:{

    },
    text3Style: {

    },
    icon:{
        position: 'absolute',
        left: '88%',
        top: '25%',
    }
});

export default StorageUnitCard;
