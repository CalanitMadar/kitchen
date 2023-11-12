import React from 'react';
import { StyleSheet, View, Button, Text, Dimensions, TextInput, Picker ,TouchableOpacity, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import {createProduct} from '../axios/accessServer';

const AddProduct = ({ route }) => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [brand, setBrand] = useState('');


    const [isChecked, setIsChecked] = useState(false);
    const [alertValue, setAlertValue] = useState('');
//-------------------useState of error validation-------------------------------
    const [productNameError, setProductNameError] = useState(null);
    const [quantityError, setQuantityError] = useState(null);
    const [unitError, setUnitError] = useState(null);
    const [expirationDateError, setExpirationDateError] = useState(null);
    const [deliveryDateError, setDeliveryDateError] = useState(null);
    const [ubrandError, setBrandError] = useState(null);

    const errors = [productNameError, quantityError, unitError, expirationDateError, deliveryDateError, ubrandError];
    //**************************************************************
  const validateForm = () => {
    let valid = true;

    if (productName.trim() === "") {
      setProductNameError("*Please enter a");
      valid = false;
    } else {
      setProductNameError(null);
    }//1

    if (quantity.trim() === "") {
        setQuantityError("*Please enter a");
        valid = false;
      } else {
        setQuantityError(null);
      }//2

      if (unit.trim() === "") {
        setUnitError("*Please enter a");
        valid = false;
      } else {
        setUnitError(null);
      }//3

      if (expirationDate.trim() === "") {
        setExpirationDateError("*Please enter a");
        valid = false;
      } else {
        setExpirationDateError(null);
      }//4

      if (deliveryDate.trim() === "") {
        setDeliveryDateError("*Please enter a");
        valid = false;
      } else {
        setDeliveryDateError(null);
      }//5

      if (brand.trim() === "") {
        setBrandError("*Please enter a");
        valid = false;
      } else {
        setBrandError(null);
      }//6

   

    return valid;
  };
  //**************************************************************
    //===========================================================
    const sendData = async ()=>{
        let json = {
            Inventoryid: route.params.Inventoryid,
            productName: productName,
            quantity: quantity,
            brand: brand,
            unit: unit,
            expirationDate: expirationDate,
            deliveryDate: deliveryDate,
            isChecked: isChecked,
            alertValue: alertValue

        };
        await createProduct(json);
    }
//================================================
    return (
        <View style={styles.container}>

            <Text style={styles.tytle}>Add a product</Text>

            <View style={styles.show}>

                <View style={styles.line}>
                    <Row label="Product Name:">
                        <TextInput style={styles.input} onChangeText={text => setProductName(text)} />
                    </Row>
                    <Row label="Quantity:">
                        <TextInput style={styles.input} onChangeText={text => setQuantity(text)} />
                    </Row>
                </View>

                <View style={styles.line}>
                    <Row label="Unit:">
                        <TextInput style={styles.input} onChangeText={text => setUnit(text)} />
                    </Row>
                    <Row label="Expiration Date:">
                        <TextInput style={styles.input} onChangeText={text => setExpirationDate(text)} />
                    </Row>
                </View>
                
                <View style={styles.line}>
                    <Row label="Delivery Date:">
                        <TextInput style={styles.input} onChangeText={text => setDeliveryDate(text)} />
                    </Row>
                    <Row label="Alert when below:">
                        <TextInput
                            style={styles.input}
                            value={alertValue}
                            onChangeText={text => setAlertValue(text)}
                        />
                    </Row>
                </View>
                <View style={styles.line}>
                    <Row label="Brand:">
                        <TextInput style={styles.input} onChangeText={text => setBrand(text)} />
                    </Row>
                </View>
            </View>

            <FlatList
                data={errors}
                style={styles.errorsList}
                contentContainerStyle={styles.errorsListContent}
                renderItem={({ item }) => <Text style={styles.error}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            
            <TouchableOpacity
            style={styles.button}
            onPress={() => {if (validateForm()) navigation.navigate("Inventory", sendData());}}
        >
            <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        </View>
    );
}

const Row = ({ label, children }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>{children}</View>
  </View>
);


const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowRadius: 30,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tytle:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 23,
    },
    show:{
        width: deviceWidth,

        
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        fontFamily: 'GeneralSans-Semibold',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10, // רווח מימין בין האינפוטים בשורה

    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
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
        backgroundColor: '#121A29',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
});

export default AddProduct;
