import React, {useState, useEffect} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, StatusBar } from 'react-native'
import {logoutUser} from '../api/auth-api'
import Home from '../components/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favourite from '../components/Favourite'
import { Svg, Path } from 'react-native-svg';
import { Searchbar } from 'react-native-paper';

export default function SearchScreen({navigation}) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const recipes = []


    const fetchData = (query) => {
        if(query.length > 0){
            console.log('Fetching data for:', query);
        }else{
            console.log('Fetching all data');
        }
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);

        if (timeoutId) {
        clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
        fetchData(query);
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    return (
        <View style={{height: '100%',  width: '100%'}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={require('../assets/arrow_back@2x.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                onEndEditing={() => console.log('searched')}
                value={searchQuery}
                style={styles.search}
                />
            </View>
            <FlatList
      style={styles.content}
      data={recipes}
      numColumns={Math.floor((Dimensions.get('window').width-10)/170)}
      renderItem={({item}) => (
        <RecipePreview
          title={item.title}
          image={item.image}
          time={item.time}
          likes={item.fav_count}
          onPress={() => console.log('pressed'+item.id)}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    >
    </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#CBB18A',
        padding: 10,
        justifyContent: 'space-between',
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 20,
        marginLeft: 15,
    },
    search: {
        flex : 1,
        marginRight: 10,
        marginLeft: 10,
    
    },
    list:{
        display: 'flex',
        alignItems: 'center',
      },
    
    content:{
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    zIndex: 0,
    },
})