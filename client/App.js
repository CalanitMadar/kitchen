import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inventory from "./components/Inventory";
import { StyleSheet } from 'react-native';
import StorageUnitLowStock from "./components/StorageUnitLowStock";
import StorageUnitSufficientStock from "./components/StorageUnitSufficientStock";
import StorageUnitLimitedStock from "./components/StorageUnitLimitedStock";
import EditStorageUnit from "./components/EditStorageUnit";
import AddStorageUnit from "./components/AddStorageUnit";
import AddProduct from "./components/AddProduct";


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen style={styles.titleStile}
          name="Inventory"
          component={Inventory}
          options={{ title: 'masooda' }}
        />

        <Stack.Screen style={styles.titleStile} 
          name="AddStorageUnit" 
          component={AddStorageUnit}
          options={{ title: 'masooda' }} />

        <Stack.Screen style={styles.titleStile}
          name="StorageUnitLowStock"
          component={StorageUnitLowStock}
          options={{ title: 'masooda' }} />

        <Stack.Screen style={styles.titleStile}
          name="StorageUnitSufficientStock"
          component={StorageUnitSufficientStock}
          options={{ title: 'masooda' }} />


        <Stack.Screen style={styles.titleStile}
          name="StorageUnitLimitedStock"
          component={StorageUnitLimitedStock}
          options={{ title: 'masooda' }} />

        <Stack.Screen style={styles.titleStile}
          name="EditStorageUnit"
          component={EditStorageUnit}
          options={{ title: 'masooda' }} />

        <Stack.Screen style={styles.titleStile}
          name="AddProduct"
          component={AddProduct}
          options={{ title: 'masooda' }} />

          

          

      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
   
  },
  titleStile: {
    fontFamily: 'ITCAvantGardePro-Bold',
    fontSize: 29,
    fontWeight: 'bold',

  }
});


export default MyStack;