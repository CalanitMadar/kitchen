import React from 'react';
import { StyleSheet, View, Button, Text ,Dimensions, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {getProducts, updatePercentData} from '../axios/accessServer';//Calling a function from another file
import { useState, useEffect } from 'react';
//================================================
//update percent on database and background color according percent
const backgroundColorCard = async function  (card) {
    let response = await getProducts(card.Inventoryid);
    let product = response.data;

    let sumMax = 0;
    let sumMin = 0;
    for (let i = 0; i < product.length; i++)
    {
        sumMax += product[i].Quantity;
        sumMin += product[i].QuantityExist;
    }
    


    let percent = sumMin / sumMax * 100;

    await updatePercentData(percent, card.Inventoryid);
    
    //----------------------------------------
    let color;

        if (percent <= 30) {
            color = '#C41C21';
        }
        if (percent > 30 && percent <= 70) {
            color = '#EF9300';
        }
        if (percent > 70) {
            color = '#28AA29';
        }
    return color;
}

//================================================
//A function that returns the component to which we will need to render
var checkGoComponent = function (percent) {
    let component;
    
    if (percent <= 30) {
        component = "StorageUnitLowStock";//מלאי נמוך
    }
    else if (percent > 30 && percent <= 70) {
        component = "StorageUnitLimitedStock";//מלאי מוגבל
    }
    else if (percent > 70) {
        component = "StorageUnitSufficientStock";//מלאי מספיק
    }
    return component;
}
//=================================================
const amount = (card) =>{
    let txt = "";
    if (card.AmountPercent <= 30) {
        txt = "Low stock";//מלאי נמוך
    }
    else if (card.AmountPercent > 30 && card.AmountPercent <= 70) {
        txt = "Limited stock";//מלאי מוגבל
    }
    else if (card.AmountPercent > 70) {
        txt = "Sufficient Stock";//מלאי מספיק
    }
    return txt;
}
//=================================================
const amountInSentence = (card) =>{
    let txt = "";
    if (card.AmountPercent <= 30) {
        txt = "Low on 2/3 product types";//מלאי נמוך
    }
    else if (card.AmountPercent > 30 && card.AmountPercent <= 70) {
        txt = "Low on 1/3 product types";//מלאי מוגבל
    }
    else if (card.AmountPercent > 70) {
        txt = "All product types stocked";//מלאי מספיק
    }
    return txt;
}
//=================================================
const radiusCard = (percent) =>{
    let radius = 0;
    if(percent >= 98)
    {
        radius = 30
    }
    return radius;
}
//================================================
const InventoryCard = ({ route, ...props })  =>{
    
    const navigation = useNavigation();
    const [backgroundColor, setBackgroundColor] = useState('');



    useEffect(() => {
        const fetchBackgroundColor = async () => {
          const color = await backgroundColorCard(props.card);
          setBackgroundColor(color);
        };
        fetchBackgroundColor();
      }, [props.card]);



    return(
        
        <View style={[styles.cardContainer]} >
            <View style={[styles.color, 
            { backgroundColor: backgroundColor }, 
            { width: props.card.AmountPercent + '%' }, 
            {borderTopRightRadius: radiusCard(props.card.AmountPercent)},
            {borderBottomRightRadius: radiusCard(props.card.AmountPercent)}
            ]}
            ></View>

            <Text style={styles.imageStyle}>{props.card.Emoji}</Text>

            <View style={styles.textStyle}>
                <Text style={styles.textStyle1}>{props.card.UnitName}</Text>
                <Text style={styles.textStyle2}>{amount(props.card)}</Text>
                <Text style={styles.textStyle3}>{amountInSentence(props.card)}</Text>
            </View>

            <AntDesign style={styles.iconStyle} name="arrowright" size={24} color="black" 
                onPress={() =>
                    navigation.navigate(checkGoComponent(props.card.AmountPercent), { typeFood: props.card.UnitName, unit: props.card.UnitType, temperature: props.card.Temperature, emoji: props.card.Emoji ,Inventoryid:props.card.Inventoryid, idUser:props.card.IDUser})}
            />
        </View>
        
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        width: deviceWidth - 30,
        height: 90,
        borderRadius: 30,
        shadowColor: '#00000029',
        shadowRadius: 30,
        flexDirection: 'row',
        top: '30%',
    },
    color:{
        opacity: 0.26,
        borderTopLeftRadius:30,
        borderBottomLeftRadius: 30,


    },
    imageStyle:{
        position: 'absolute',
        left: '8%',
        top: '25%',
        flex: 1,
        fontSize:38
    },
    textStyle:{
        flex: 2,
        position: 'absolute',
        left: '30%',
        top: '20%'
    },
    textStyle1:{
        fontFamily: 'GeneralSans',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    textStyle2: {
        fontFamily: 'GeneralSans-Semibold',
        fontSize: 14,
        color: '#A2142C',
        fontWeight: 'bold',

    },
    textStyle3: {
        fontFamily: 'GeneralSans-Medium',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',

    },
    iconStyle:{
        flex: 3,
        position: 'absolute',
        left: '90%',
        top: '30%'
    }
});



export default InventoryCard;