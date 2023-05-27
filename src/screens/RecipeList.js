import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { getAllRecipes } from "../api/recipe-api";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const recipeList = await getAllRecipes();
    setRecipes(recipeList);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={{ padding: 20 }} key={item}>
          <Text>Title: {item.title}</Text>
          <Text>Time: {item.time} minutes</Text>
          <Text>Ingredients: {item.ingredients}</Text>
          <Text>Instructions: {item.instructions}</Text>
          <Text>User: {item.user}</Text>
          <Text>Favorite Count: {item.fav_count}</Text>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 200 }}
          />
        </View>
      )}
    />
  );
};

export default RecipeList;
