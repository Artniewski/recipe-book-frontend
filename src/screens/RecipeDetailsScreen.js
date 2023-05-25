import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Background from "../components/Background";
// import Header from '../components/Header';
import { Header } from "react-navigation";
import { FAB } from "react-native-paper";
import { Dimensions } from "react-native";
import TopHeader from "../components/TopHeader";
import DetailBar from "../components/DetailBar";
import IngredientsView from "../components/IngredientsView";
import StepsView from "../components/StepsView";
import {
  isRecipeFavorite,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
} from "../api/favourites-api";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipeData } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const likePressed = () => {
    setIsLiked((prevIsLiked) => {
      if (!prevIsLiked) {
        addRecipeToFavorites(recipeData.id);
      } else {
        removeRecipeFromFavorites(recipeData.id);
      }
      return !prevIsLiked;
    });
  };
  useEffect(() => {
    const checkRecipeFavorite = async () => {
      console.log(recipeData);
      let liked = await isRecipeFavorite(recipeData.id);
      console.log(liked);
      setIsLiked(liked);
    };
    checkRecipeFavorite();
  }, []);
  const window = Dimensions.get("window");
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        flexGrow: 1,
        backgroundColor: "#CBB18A",
      }}
    >
      <ScrollView>
        <TopHeader recipeData={recipeData} navigation={navigation} />
        <View style={{ backgroundColor: "#FFFFFF" }}>
          <Image style={styles.image} source={{ uri: recipeData.image }} />
          <DetailBar recipeData={recipeData} />
          <IngredientsView recipeData={recipeData} />
          <StepsView recipeData={recipeData} />
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="heart"
        color={!isLiked ? "#FFFFFF" : "#FF0000"}
        onPress={likePressed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 325,
    margin: 0,
    padding: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    zIndex: 3,
    backgroundColor: "#CBB18A",
  },
});

export default RecipeDetailsScreen;
