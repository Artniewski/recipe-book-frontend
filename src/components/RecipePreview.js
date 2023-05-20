import React, {useState} from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function RecipePreview(props) {


    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image style={styles.image} source={{ uri: props.image }}/>
            <View style={styles.bar}>
                <View style={styles.topRow}>
                    <Text style={styles.topRowText}>{props.title}</Text>
                </View>
                <View style={styles.bottomRow}>
                    <Image style={styles.icon} source={require('../assets/icon_alarm.svg')} />
                    <Text>{props.time}</Text>
                    <Image style={styles.icon} source={require('../assets/icon_heart.svg')} />
                    <Text>{props.likes}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
container: {
    display: 'flex',
    flexDirection: 'column',
    height: 170,
    width: 150,
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
topRowText:{
    fontSize: 20,
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