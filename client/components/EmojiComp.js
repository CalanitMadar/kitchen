import React from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
//====================================================================
import {getEmojis} from '../axios/accessServer';
//====================================================================
const EmojiComp = ({ CallbackFunction, lastEmoji }) => {
    const [currentEmoji, setCurrentEmoji] = useState(lastEmoji);
    const [emojiList, setEmojiList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getEmojis();
                let x = response.data;
                setEmojiList(x);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {CallbackFunction(currentEmoji)}
            <Text style={styles.title}>Choose a new emoji</Text>


            
            <FlatList
                data={emojiList}
                numColumns={8} // מספר העמודות בכל שורה
                keyExtractor={(item, index) => item.emojiId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.emojiContainer}>
                        <Text
                            style={styles.emoji}
                            onPress={() => {
                                setCurrentEmoji(item.emoji);
                            }}>
                            {item.emoji}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: deviceWidth,
        borderRadius: 15,
        shadowColor: '#0000009D',
        shadowRadius: 30,
        flexDirection: 'column',
        flex: 1,
        maxWidth: 600,
    },
    title: {
        fontFamily: 'GeneralSans-Semibold',
        fontWeight: 'bold',
        position: 'relative',
        width: deviceWidth,
        left: deviceWidth / 4,
    },
    emojiContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 20,
        marginHorizontal: 10,
    },
});

export default EmojiComp;
