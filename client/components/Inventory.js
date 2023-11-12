import { StyleSheet, View, Button, Text, Image, Dimensions, ScrollView } from 'react-native';
import Card from './InventoryCard';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { getInventory } from '../axios/accessServer';

const Inventory = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [cards, setCards] = useState([]);
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventory();
        let x = response.data;
        setCards(x);
        setIdUser(x[0].IDUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
//======================================================================
//מיון הכרטיסיות לפי בחירת המשתמש
  useEffect(() => {
    const sortCards = () => {
      let sortedCards = [...cards];

      if (selectedValue === '1') {
        sortedCards.sort((a, b) => {
          const nameA = a.UnitName || ''; // משתמשים במחרוזת ריקה כערך ברירת מחדל אם cardName הוא undefined
          const nameB = b.UnitName || '';
    
          return nameA.localeCompare(nameB);
        });
      }
      //===============================
      if (selectedValue === '2') {
        sortedCards.sort((a, b) => b.AmountPercent - a.AmountPercent);

      }
      //===============================
      setCards(sortedCards);
    };
      
    sortCards();
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.titleAndPicker}>
        <Text style={styles.titleStile}>Manage Inventory</Text>

        <Picker
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Sort by..." value="0" />
          <Picker.Item label="Sort by Name" value="1" />
          <Picker.Item label="Stock Level" value="2" />
        </Picker>
      </View>

      <ScrollView style={styles.cardContainer}>
        {cards.map((card, key) => {
          return (
            <View key={card.Inventoryid} style={styles.cardWrapper}>
              <Card card={card} />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.buttonStyle}>
        <Button
          color="#C3001F"
          onPress={() => navigation.navigate('AddStorageUnit', { idUser: idUser })}
          title="+ Add Storage Unit"
        ></Button>
      </View>
    </View>
  );
};



const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  cardContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    maxHeight: deviceHeight * 0.7, // מקטין את גובה תיבת הגלילה
  },
  
  titleAndPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    top: '3%',
  },
  titleStile: {
    fontFamily: 'GeneralSans-Semibold',
    fontSize: 17,
    fontWeight: 'bold',
  },
  pickerStyle: {
    borderRadius: 10,
    shadowColor: '#00000022',
    borderWidth: 0,
    overflow: 'hidden',
    shadowRadius: 11,
    fontWeight: 'bold',
    fontFamily: 'GeneralSans-Bold',
  },
  
  cardWrapper: {
    marginBottom: 10,
  },
  buttonStyle: {
    fontFamily: 'GeneralSans',
    fontWeight: 'bold',
    position: 'absolute',
    top: '90%',
    width: '80%',
    height: 40, // קטן את גובה הכפתור
    borderRadius: 15,
    backgroundColor: '#C3001F',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  

});

export default Inventory;
