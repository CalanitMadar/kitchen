import React from 'react';
import { StyleSheet, View, Button, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState ,useEffect} from "react";
import cards from '../JSON/seafoodFreezerProduct.json'
import Card from './StorageUnitCard';
import { useNavigation } from '@react-navigation/native';

//-------------------------------------------
import {getProductsByNameAndIDUser} from '../axios/accessServer';//Calling a function from another file
//====================================================================


//================================================
var StorageColor = function (storageName) {


    let color;
    if (storageName === 'cold') {
        color = '#0077B7';
    }

    else if (storageName === 'pantry') {
        color = '#79560A';
    }
    return color;
}




//====================================================================
const StorageUnitLowStock = ({ route, ...props }) => {
    const navigation = useNavigation();
    const [selectedVal, setSelectedVal] = useState();
    const [typeF, setTypeF] = useState(route.params.typeFood);
    const [unit, setUnit] = useState(route.params.unit);
    const [temperature, setTemperature] = useState(route.params.temperature)
    const [products, setProducts] = useState([]);


    //====================================
    useEffect(()=>{
        async function fetchData()
        {
            let response = await getProductsByNameAndIDUser(route.params.typeFood, route.params.Inventoryid);
            setProducts(response.data)
        }
        fetchData()
    },[])


    

//=====================================================
    useEffect(() => {
        if (route.params.unit === 'cold')
            setUnit('COLD UNIT')
        else setUnit("PANTRY")
    });

    return (
        <View style={styles.container}>
            <View style={styles.line1Style}>
                <Text style={styles.text1Styles}>{typeF}</Text>
                
                <View style={styles.rectangle1Style}>
                    <MaterialIcons name="settings" size={12} color="white" />
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('EditStorageUnit', { typeFood: typeF, unit: unit, emoji: route.params.emoji , Inventoryid: route.params.Inventoryid, idUser: route.params.idUser}) }}
                        >
                            <Text style={styles.rectangleTextStyle1}> Edit </Text>
                        </TouchableOpacity>

                    </View>
            </View>


            <View style={styles.line2Style}>

                <View style={styles.rectangle2Style}>
                    <MaterialCommunityIcons name="alert-decagram" size={12} color="white" />
                    <Text style={styles.rectangleTextStyle2}> LOW STOCK</Text>
                </View>


                <View style={[styles.rectangle3Style, , { backgroundColor: StorageColor(route.params.unit) }]}>
                    <MaterialCommunityIcons name="snowflake" size={12} color="white" />
                    <Text style={[styles.rectangleTextStyle3, { backgroundColor: StorageColor(route.params.unit) }]}> {unit} </Text>
                </View>


                <View style={styles.rectangle4Style}>
                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>

                        <Text>

                            <Text style={styles.rectangleTextStyle4}>{temperature}° C</Text>

                        </Text>
                    </View>
                </View>



            </View>

            <View style={styles.box}>

                <View style={styles.line3Style}>
                    <Text style={styles.boxTitle}>    Products</Text>

                    <Picker style={styles.picker}
                        selectedValue={selectedVal}
                        onValueChange={(itemValue, itemIndex) => setSelectedVal(itemValue)}
                    >

                        <Picker.Item label="Sort by Name" value="1" />
                        <Picker.Item label="Sort by Stock Level (Quantity - Percentage)" value="2" />
                        <Picker.Item label="Sort by Stock Level (Quantity - Weight)" value="3" />
                        <Picker.Item label="Sort by Delivery Date" value="4" />
                        <Picker.Item label="Sort by Expiration Date" value="5" />
                        <Picker.Item label="Sort by Most Used" value="6" />
                    </Picker>
                </View>

                <ScrollView style={styles.cardContainer}>
                    {products.map((card, key) => {
                        return (
                            <View key={card.pid} style={styles.cardStyle}>
                                <Card style={styles.cardStyle} card={card} />
                            </View>
                        );
                    })}
                </ScrollView>

            </View>

            <View style={styles.buttonStyle}>
                <Button color="#121A29"  title='Add Product' 
                    onPress={() => navigation.navigate('AddProduct',{Inventoryid: route.params.Inventoryid})}
                ></Button>
            </View>
           
        </View>
    );
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: deviceHeight,
        alignItems: 'center',
        gap: 8,
    },
    line1Style:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        top: '5%',
    },
    text1Styles:{
        fontFamily: 'GeneralSans-Bold',
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        
    },
    rectangle1Style:{
        flexDirection: "row",
        backgroundColor: '#000000',
        width: '20%',
        borderRadius:10,
        shadowColor: '#00000029',
        shadowRadius: 30,
        left: '6%',

        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
    },
    rectangleTextStyle1:{
        color: "white", 
        fontFamily: 'GeneralSans-Semibold', 
        fontSize: 11,

    },
    line2Style:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        top: '6%',
    },
    rectangle2Style:{
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor: '#C31B20',
        alignItems: 'center',
        padding:5,
        borderRadius: 10,
        width: '30%',
    },
   
    rectangleTextStyle2: {
        color: "white", 
        fontFamily: 'GeneralSans-Semibold', 
        fontSize: 10,
        left: '4%',

        
    },
    rectangle3Style: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
        backgroundColor: '#0077B7',
        borderRadius: 10,
        width: '30%',
        left: '10%',


       
    },
    rectangleTextStyle3: {
        color: "white",
        fontFamily: 'GeneralSans-Semibold',
        fontSize: 10,
    }, 
    rectangle4Style: {

        backgroundColor: '#EDEDED',
        borderRadius: 10,
        width: '14%',
    },
    rectangleTextStyle4: {
        fontFamily: 'GeneralSans-Medium',
        fontSize: 11

    },
    box:{     
        width: deviceWidth -30,
        height: deviceHeight - 370,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#00000029',
        shadowRadius: 26,
        borderTopColor: '#C31B20',
        borderTopWidth: 15,
        alignItems: 'center',
        gap: 10,
        top: '7%',
        
    },
    line3Style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        top: '7%',
        
    },
    boxTitle:{
        fontSize: 15,
        fontFamily: 'GeneralSans-Bold',
        fontWeight: 'bold',
        
    },
    picker:{
        borderRadius: 11,
        backgroundColor: '#EDEDED',
        shadowColor: '#00000022',
        borderWidth: 0,
        overflow: "hidden",
        shadowRadius: 10,
        fontWeight: 'bold',
        fontFamily: 'General Sans-Bold',
        width: (deviceWidth -30) / 2,
        fontSize: 11,
    },
    cardStyle:{
        marginBottom: 10,
    },



    buttonStyle: {
        fontFamily: 'GeneralSans-Bold',
        fontWeight: 'bold',
        position: 'absolute',
        top: '80%',
        width: deviceWidth - 150,
        borderRadius: 15,

        backgroundColor: '#121A29',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flexGrow: 1,
        paddingBottom: 10,
        maxHeight: deviceHeight * 0.7, // מקטין את גובה תיבת הגלילה
      },

});

export default StorageUnitLowStock;
