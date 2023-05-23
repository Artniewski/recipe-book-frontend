import React, {useState, useEffect, useLayoutEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { getAllRecipes } from '../api/recipe-api';
import Background from './Background';

export default function Favourite({navigation}) {

    const recipes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
        id: item,
        title: 'Recipe '+item.toString(),
        image: 'https://picsum.photos/300/200',
        time: '30 min',
        fav_count: 10,
      }
    ))
  

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
<Background>
      {recipes.length == 0 && <View style={{display: 'flex', alignContent: 'space-around'}}><Text>Loading...</Text></View>}

    {recipes.length > 0 &&<FlatList
      style={styles.content}
      data={recipes}                                                                              
      numColumns={numColumns}
      renderItem={({item}) => (
        <RecipePreview
          title={item.title}
          image={item.image}
          time={item.time}
          likes={item.fav_count}
          onPress={() => navigation.navigate('RecipeDetailsScreen', {recipeData: item})}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      key = {numColumns}
    >
    </FlatList>}
      </Background>
    )
}

const styles = StyleSheet.create({

  list:{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  content:{
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    zIndex: 0,
    },
})




