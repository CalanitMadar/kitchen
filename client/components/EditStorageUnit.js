import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import EmojiComp from './EmojiComp';
import {editStorageUnit} from '../axios/accessServer';
import { useNavigation } from '@react-navigation/native';


//==========================================================================


export default function EditStorageUnit({route}) {
    const navigation = useNavigation();

    const [title, setTitle] = useState("Edit Storage Unit");
    const [typeFood, setTypeFood] = useState(route.params.typeFood);
    const [temperature, setTemperature] = useState(0);
    const [selectedValue1, setSelectedValue1] = useState();
    const [selectedValue2, setSelectedValue2] = useState("Choose Type");
    const [selectedValue3, setSelectedValue3] = useState("Choose Type");
    const [selectEmoji, setSelectEmoji] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(route.params.emoji);

    const [unitNameError, setUnitNameError] = useState(null);
    const [temperatureError, setTemperatureError] = useState(null);
    const [emojiError, setEmojiError] = useState(null);

    const errors = [unitNameError, temperatureError, emojiError];

    //**************************************************************
  const validateForm = () => {
    let valid = true;

    // Validation for the first field (Unit Name)
    if (typeFood.trim() === "") {
      setUnitNameError("*Please enter a unit name");
      valid = false;
    } else {
      setUnitNameError(null);
    }

    // Validation for the second field (Temperature)
    if (temperature === null) {
      setTemperatureError("*Please enter a temperature");
      valid = false;
    } else {
      if (!isNaN(temperature)) {
        const parsedTemperature = parseInt(temperature);
        setTemperature(parsedTemperature);
      }
      if (isNaN(temperature)) {
        setTemperatureError("*The temperature field must contain only a number");
      } else {
        setTemperatureError(null);
      }
    }

    // Validation for the third field (emoji)
    if (currentEmoji === null) {
      setEmojiError("*Please select an emoji");
      valid = false;
    } else {
      setEmojiError(null);
    }

    // Additional field validations as desired

    return valid;
  };
  //**************************************************************
    //============================================================
const CallbackFunction = (emoji) => {
    useEffect(()=>{
        setCurrentEmoji(emoji);
    })
  };
  //-----------------------------------------
  useEffect(() => {
    setSelectEmoji(false);
  },[currentEmoji]);


  //===========================================================
  const sendData = async ()=>{
    //console.log( route.params.Inventoryid );
    let val1;
    if(selectedValue1 === '1')
        val1 ="cold";
        if(selectedValue1 === '2')
        val1 ="pantry";


        let val2;
        if(selectedValue2 === '1')
            val2 ="no";
        if(selectedValue2 === '2')
        val2 ="yes";

        Number(temperature);
    let json = {
        idUser: route.params.idUser,
        inventoryId: route.params.Inventoryid,
        emoji: currentEmoji,
        typeUnit: val1,
        temperature: temperature,
        allergyInformation: val2,
        alertWhenStockIs: selectedValue3,
        unitName: typeFood,
    };
    //console.log(json);
    let response = await editStorageUnit(json);
    //console.log(response);
    return "Inventory";
}
//===========================================================

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.emoji}>{currentEmoji}</Text>
            <Text style={styles.txt} onPress={() => setSelectEmoji(!selectEmoji)}>Change Emoji</Text>
            <View style={styles.emojis}>{selectEmoji? <EmojiComp CallbackFunction={CallbackFunction} lastEmoji={currentEmoji}/> : null}</View>


            <Text style={styles.txt1}>Unit Name</Text>
            <TextInput style={styles.input1} value={typeFood}
            onChangeText={text => setTypeFood(text)}
            ></TextInput>

            <Text style={styles.txt2}>Unit Type</Text>
            <Picker selectedValue={selectedValue1} style={styles.input2}
                onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
            >
                <Picker.Item label="Choose Type" requierd/>
                <Picker.Item label="Cold Unit" value="1" />
                <Picker.Item label="Pantry Unit" value="2" />
            </Picker>

            <Text style={styles.txt3}>Temperature</Text>
            <TextInput value={temperature} style={styles.input3}
             onChangeText={text => setTemperature(text)} />

            <Text style={styles.txt4}>Allergy Information</Text>
            <Picker selectedValue={selectedValue2} style={styles.input4}
                onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
            >
                <Picker.Item label={selectedValue2} value="0" requierd/>
                <Picker.Item label="No" value="1" />
                <Picker.Item label="Yes" value="2" />
            </Picker>

            <Text style={styles.txt5}>Alert when stock is</Text>
            <Picker selectedValue={selectedValue3} style={styles.input5}
                onValueChange={(itemValue, itemIndex) => setSelectedValue3(itemValue)}
            >
                 <Picker.Item label={selectedValue3} value="0" requierd/>
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Limited" value="Limited" />
            </Picker>

            <FlatList
                data={errors}
                style={styles.errorsList}
                contentContainerStyle={styles.errorsListContent}
                renderItem={({ item }) => <Text style={styles.error}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />


            <View style={styles.button}>
                <AntDesign name="check" size={24} color="#FFFFFF" />
                <Button
                    title="Save"
                    color={'#C31B20'}
                    onPress={() => {
                        if (validateForm()) navigation.navigate("Inventory", sendData());
                    }}
                />
            </View>

            <StatusBar style="auto" />
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
    title: {
        
        color: '#000000',
        fontSize: 17,
        fontFamily: 'GeneralSans-Semibold',
        fontWeight: 'bold',
        position: 'absolute',
        left: '5%',
        top: '5%',

    },
    txt: {
        
        color: '#000000',
        fontSize: 14,
        textDecorationLine: 'underline',
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '15%',
        top: '10%',
    },
    emoji:{
        fontSize: 35,
        position: 'absolute',
        left: '3%',
        top: '8%',
    },
    emojis:{
        zIndex: 1,
        top: deviceHeight/2,
    },
    txt1: {
        
        color: '#000000',
        fontSize: 14,
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '5%',
        top: '15%',
    },
    input1: {
        height: 42,
        width: '92%',
        maxWidth: '92%',
        borderColor: '#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        fontFamily: 'GeneralSans-Medium',
        position: 'absolute',
        left: '5%',
        top: '18%',

    },
    txt2: {
        
        color: '#000000',
        fontSize: 14,
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '5%',
        top: '26%',
        
    },
    input2: {
        height: 42,
        borderColor: '#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        fontFamily: 'GeneralSans-Medium',
        position: 'absolute',
        left: '5%',
        top: '29%',
        width: '55%',
        maxWidth: '55%',
        //minWidth: 300,
        alignItems: 'center'
    },
    txt3: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '65%',
        top: '26%',
    },
    input3: {
        height: 42,
        borderColor: '#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        fontFamily: 'GeneralSans-Medium',
        position: 'absolute',
        left: '65%',
        top: '29%',
        width: '32%',
        maxWidth: '32%',
        //minWidth: 300,
        alignItems: 'center'
    },
    txt4: {
        
        color: '#000000',
        fontSize: 14,
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '5%',
        top: '37%',
    },
    input4: {
        width: '92%',
        maxWidth: '92%',
        height: 42,
        borderColor: '#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        fontFamily: 'GeneralSans-Medium',
        position: 'absolute',
        left: '5%',
        top: '40%',
    },
    txt5: {
        
        color: '#000000',
        fontSize: 14,
        fontFamily: 'GeneralSans-Semibold',
        position: 'absolute',
        left: '5%',
        top: '48%',
    },
    input5: {
        width: '92%',
        maxWidth: '92%',
        height: 42,
        borderColor: '#000000',
        borderWidth: 0.7,
        borderRadius: 10,
        fontFamily: 'GeneralSans-Medium',
        position: 'absolute',
        left: '5%',
        top: '51%',
    },
    error: {
        color: 'red',
      },
      errorsList: {
        alignSelf: 'flex-start',
        marginTop: '5%',
        marginBottom: '20%',
      },
      errorsListContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
      },
    button: {
        backgroundColor: '#C31B20',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: '65%',
        top: '80%',
        width: '32%',

    },


});