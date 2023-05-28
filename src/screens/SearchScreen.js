import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import TopBar from "../components/TopBar";
import Button from "../components/Button";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  TextInput,
  Modal,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { logoutUser } from "../api/auth-api";
import Home from "../components/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourite from "../components/Favourite";
import { Svg, Path } from "react-native-svg";
import { Searchbar } from "react-native-paper";
import Background from "../components/Background";
import { getAllRecipes } from "../api/recipe-api";
import RecipePreview from "../components/RecipePreview";
import { parseSearchString } from "../api/search-api";

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
);

const IconGear = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={"black"} {...props}>
    <Path d="M24 14v-4h-3.23a8.967 8.967 0 0 0-1.156-2.785L21.9 4.929 19.07 2.1l-2.286 2.286A8.937 8.937 0 0 0 14 3.23V0h-4v3.23a8.945 8.945 0 0 0-2.785 1.157L4.929 2.101 2.1 4.929l2.287 2.287A8.94 8.94 0 0 0 3.23 10H0v4h3.23a8.961 8.961 0 0 0 1.156 2.784L2.1 19.071 4.929 21.9l2.286-2.286A8.967 8.967 0 0 0 10 20.77V24h4v-3.23a8.937 8.937 0 0 0 2.784-1.156L19.07 21.9l2.828-2.829-2.285-2.286A8.943 8.943 0 0 0 20.769 14H24zm-12 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </Svg>
)

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const searchbarRef = useRef(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({ ingredients: '', author: '', time: '' });

  const fetchData = async (query) => {
      const searchFields = {
        title: query,
        ingredients: searchCriteria.ingredients.split(",").map((ingredient) => ingredient.trim()),
        author: searchCriteria.author,
        time: Number(searchCriteria.time),
      }
      searchFields.ingredients = searchFields.ingredients.filter((ingredient) => ingredient !== "");
      console.log(searchFields)
      let searchRecipes = [...recipes];
      // Filter by title
      if (searchFields.title) {
        searchRecipes = searchRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchFields.title.toLowerCase())
        );
      }

      // Filter by author
      if (searchFields.author) {
        searchRecipes = searchRecipes.filter((recipe) =>
          recipe.userName
            .toLowerCase()
            .includes(searchFields.author.toLowerCase())
        );
      }

      // Filter by time
      if (searchFields.time) {
        searchRecipes = searchRecipes.filter(
          (recipe) => Number(recipe.time) <= searchFields.time
        );
      }

      // Filter by ingredients
      if (searchFields.ingredients.length > 0) {
        searchRecipes = searchRecipes.filter((recipe) => {
          for (let i = 0; i < searchFields.ingredients.length; i++) {
            if (
              !recipe.ingredients
                .map((ingredient) => ingredient.name.toLowerCase())
                .includes(searchFields.ingredients[i].toLowerCase())
            ) {
              return false;
            }
          }
          return true;
        });
      }

      setFilteredRecipes(searchRecipes);
    
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

  const getRecipes = async () => {
    const recipeList = await getAllRecipes();
    setRecipes(recipeList);
    setFilteredRecipes(recipeList);
  };

  useEffect(() => {
    getRecipes();
    searchbarRef.current.focus();
  }, []);

  const [numColumns, setNumColumns] = useState(
    Math.floor((Dimensions.get("window").width - 10) / 170)
  );

  const handleMoreOptions = () => {
    setModalVisible(true);
  };

  const handleSearchCriteriaChange = (key, value) => {
    setSearchCriteria({ ...searchCriteria, [key]: value });
  };

  const handleSearch = () => {
    setModalVisible(false);
    fetchData(searchQuery);
  };

  const handleClear = () => {
    setSearchCriteria({ ingredients: '', author: '', time: '' });
  };

  if (Platform.OS === "web") {
    useLayoutEffect(() => {
      function handleLayout() {
        setNumColumns(Math.floor((Dimensions.get("window").width - 10) / 170));
      }
      Dimensions.addEventListener("change", handleLayout);
      return () => {
        Dimensions.removeEventListener("change", handleLayout);
      };
    }, []);
  }

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        flexGrow: 1,
        backgroundColor: "#CBB18A",
      }}
    >
      <StatusBar backgroundColor="#CBB18A" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack style={styles.image} />
        </TouchableOpacity>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchQueryChange}
          onEndEditing={() => console.log("searched")}
          value={searchQuery}
          style={styles.search}
          ref={searchbarRef}
        />
        <TouchableOpacity onPress={handleMoreOptions}>
          <IconGear style={styles.image} />
        </TouchableOpacity>
      </View>
      <Background>
        <FlatList
          style={styles.content}
          data={filteredRecipes}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <RecipePreview
              title={item.title}
              image={item.image}
              time={item.time}
              likes={item.fav_count}
              onPress={() =>
                navigation.navigate("RecipeDetailsScreen", { recipeData: item })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          key={numColumns}
        ></FlatList>
      </Background>
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleSearch} onTouchOutside={handleSearch}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Search criteria</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Ingredients"
            value={searchCriteria.ingredients}
            onChangeText={(value) => handleSearchCriteriaChange('ingredients', value)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Author"
            value={searchCriteria.author}
            onChangeText={(value) => handleSearchCriteriaChange('author', value)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Time"
            value={searchCriteria.time}
            onChangeText={(value) => handleSearchCriteriaChange('time', value)}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSearch}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleClear}>
            <Text style={styles.modalButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    backgroundColor: "#CBB18A",
    padding: 10,
    justifyContent: "space-between",
  },
  image: {
    marginRight: 20,
    marginLeft: 15,
    width: 30,
    height: 30,
  },
  search: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  list: {
    display: "flex",
    alignItems: "center",
  },

  content: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    zIndex: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#CBB18A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
