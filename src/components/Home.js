import React, {useState, useEffect} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import RecipePreview from '../components/RecipePreview'
import { getAllRecipes } from '../api/recipe-api';

export default function Home({navigation}) {
  

  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
      const recipeList = await getAllRecipes();
      console.log(recipeList);
      setRecipes(recipeList);
  };


  useEffect(() => {
      fetchRecipes();
  }, []);


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
          onPress={() => navigation.navigate('RecipeDetailsScreen', {recipeData: item})}
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




