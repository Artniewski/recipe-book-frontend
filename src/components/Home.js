import React, {useState, useEffect} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import {logoutUser} from '../api/auth-api'
import RecipePreview from '../components/RecipePreview'
import { BottomNavigation } from 'react-native-paper'

export default function Home() {
  

  const recipes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
      id: item,
      title: 'Recipe '+item.toString(),
      image: 'https://picsum.photos/300/200',
      time: '30 min',
      likes: 10,
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
          likes={item.likes}
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
    display: 'grid',
    justifyContent: 'center',
  },

  content:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    zIndex: 0,
    },
})




