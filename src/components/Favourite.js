import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { getAllRecipes } from '../api/recipe-api';

export default function Favourite() {

    const recipes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
        id: item,
        title: 'Recipe '+item.toString(),
        image: 'https://picsum.photos/300/200',
        time: '30 min',
        fav_count: 10,
      }
    ))
  

    

    return (
        <View style={{height: '100%',  width: '100%'}}>

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




