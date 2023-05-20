import React, {useState} from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function RecipePreview(props) {


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/logo.png')} />
            <View style={styles.bar}>
                <View style={styles.topRow}>
                    <Text>{props.title}</Text>
                </View>
                <View style={styles.bottomRow}>
                    <Image style={styles.icon} source={require('../assets/icon_alarm.svg')} />
                    <Text>{props.time}</Text>
                    <Image style={styles.icon} source={require('../assets/icon_heart.svg')} />
                    <Text>{props.likes}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: 170,
    borderRadius: 20,
    backgroundColor: '#CBB18A',
    borderWidth: 1,
    

},
image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
},
bar: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CBB18A',
    borderRadius: 20,
},
topRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
bottomRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
icon: {
    width: 15,
    height: 15,
}
})