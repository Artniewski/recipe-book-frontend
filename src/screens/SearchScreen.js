import React, {useState, useEffect, useLayoutEffect, useRef} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, StatusBar, Platform } from 'react-native'
import {logoutUser} from '../api/auth-api'
import Home from '../components/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favourite from '../components/Favourite'
import { Svg, Path } from 'react-native-svg';
import { Searchbar } from 'react-native-paper';
import Background from '../components/Background'
import { getAllRecipes } from '../api/recipe-api';
import RecipePreview from '../components/RecipePreview'
import { search } from '../api/search-api'

const IconBack = (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M11.707 4.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
        clipRule="evenodd"
      />
    </Svg>
  )


export default function SearchScreen({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const searchbarRef = useRef(null);
    const [recipes, setRecipes] = useState([]);



    const fetchData = async (query) => {
        if(query && query.length > 0){
            console.log('Fetching data for:', query);
            const recipeList = await search(query);
            console.log(recipeList);
            setRecipes(recipeList);

        }else{
            console.log('Fetching recipes...');
            const recipeList = await getAllRecipes();
            console.log(recipeList);
            setRecipes(recipeList);
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

    useEffect(() => {
        fetchData();
        searchbarRef.current.focus();
    }, []);


    const [numColumns, setNumColumns] = useState(Math.floor((Dimensions.get('window').width-10)/170));

    if(Platform.OS === 'web'){
        useLayoutEffect(() => {
          function handleLayout() {
            setNumColumns(Math.floor((Dimensions.get('window').width-10)/170));
          }
          Dimensions.addEventListener('change', handleLayout);
          return () => {
            Dimensions.removeEventListener('change', handleLayout);
          };
        }, []);
      }

    return (
        <View style={{height: '100%',  width: '100%'}}>
            <StatusBar backgroundColor="#CBB18A"/>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <IconBack style={styles.image}
                    />
                </TouchableOpacity>
                <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                onEndEditing={() => console.log('searched')}
                value={searchQuery}
                style={styles.search}
                ref={searchbarRef}
                />
            </View>
            <Background>

            <FlatList
            style={styles.content}
            data={recipes}
            numColumns={numColumns}
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
                key={numColumns}
                >
                
            </FlatList>
            </Background>
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
        marginRight: 20,
        marginLeft: 15,
        width: 30,
        height: 30,
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