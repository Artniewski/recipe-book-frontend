import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { Text, Button as PaperButton } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { theme } from "../core/theme";
import { addRecipe } from "../api/recipe-api";
import Toast from "../components/Toast";
import * as ImagePicker from "expo-image-picker";
import TopHeader from "../components/TopHeader";

const screenWidth = Dimensions.get("window").width;

export default function EditScreen({ navigation, recipe }) {
  const [title, setTitle] = useState(recipe.title);
  const [time, setTime] = useState(recipe.time);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const [image, setImage] = useState(recipe.image);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, text) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = text;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, text) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setInstructions(newInstructions);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const onAddRecipePressed = async () => {
    setLoading(true);
    const response = await addRecipe({
      title: title,
      time: time,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
    });
    if (response.error) {
      setError(response.error);
    }
    setLoading(false);
  };

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
        <TopHeader navigation={navigation} headerText={"Add new recipe"} />
        <View style={{ backgroundColor: "#FFFFFF" }}>
          <Background>
            {
              <TextInput
                label="Title"
                returnKeyType="next"
                value={title}
                onChangeText={setTitle}
                error={!!title.error}
                errorText={title.error && <Text>{title.error}</Text>}
              />
            }

            {
              <TextInput
                label="Time"
                returnKeyType="next"
                value={time}
                onChangeText={setTime}
                error={!!time.error}
                errorText={time.error && <Text>{time.error}</Text>}
              />
            }

            <View style={styles.container}>
              <View style={styles.containerHeader}>
                <Text style={styles.containerText}>Ingredients</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientContainer}>
                    <TextInput
                      containerStyle={styles.ingredientInputContainer}
                      inputStyle={styles.ingredientInputName}
                      value={ingredient.name}
                      onChangeText={(text) =>
                        handleIngredientChange(index, "name", text)
                      }
                      placeholder="Ingredient name"
                    />
                    <TextInput
                      containerStyle={styles.timeAndUnitInputContainer}
                      inputStyle={styles.ingredientInputQuantity}
                      value={ingredient.quantity}
                      onChangeText={(text) =>
                        handleIngredientChange(index, "quantity", text)
                      }
                      placeholder="Qtty"
                    />
                    <TextInput
                      containerStyle={styles.timeAndUnitInputContainer}
                      inputStyle={styles.ingredientInputUnit}
                      value={ingredient.unit}
                      onChangeText={(text) =>
                        handleIngredientChange(index, "unit", text)
                      }
                      placeholder="Unit"
                    />

                    {index === ingredients.length - 1 ? (
                      <View style={styles.buttonContainer}>
                        <PaperButton
                          icon="plus"
                          onPress={handleAddIngredient}
                        />
                      </View>
                    ) : undefined}
                    {ingredients.length > 1 ? (
                      <View style={styles.buttonContainer}>
                        <PaperButton
                          icon="minus"
                          onPress={() => handleRemoveIngredient(index)}
                        />
                      </View>
                    ) : undefined}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.containerHeader}>
                <Text style={styles.containerText}>Instructions</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionContainer}>
                    <TextInput
                      inputStyle={styles.instructionInput}
                      value={instruction}
                      onChangeText={(text) =>
                        handleInstructionChange(index, text)
                      }
                      placeholder={`Instruction ${index + 1}`}
                    />

                    {index === instructions.length - 1 ? (
                      <View style={styles.buttonContainer}>
                        <PaperButton
                          icon="plus"
                          onPress={handleAddInstruction}
                        />
                      </View>
                    ) : undefined}
                    {instructions.length > 1 ? (
                      <View style={styles.buttonContainer}>
                        <PaperButton
                          icon="minus"
                          onPress={() => handleRemoveInstruction(index)}
                        />
                      </View>
                    ) : undefined}
                  </View>
                ))}
              </View>
            </View>

            <Button onPress={selectImage} mode="outlined">
              <Text>Select Image</Text>
            </Button>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <Button
              loading={loading}
              mode="contained"
              onPress={onAddRecipePressed}
            >
              <Text>Add Recipe</Text>
            </Button>
            <Toast message={error} onDismiss={() => setError("")} />
          </Background>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  ingredientInputContainer: {
    flexGrow: 1,
    flexBasis: "50%",
    marginBottom: 10,
    borderWidth: 0,
    borderColor: "red",
  },
  timeAndUnitInputContainer: {
    flexGrow: 1,
    flexBasis: "20%",
    marginBottom: 10,
  },
  ingredientInputName: {
    flexGrow: 2,
    flexBasis: "40%",
    backgroundColor: theme.colors.surface,
    marginRight: 10,
    borderColor: "red",
  },
  ingredientInputQuantity: {
    flexGrow: 1,
    flexBasis: "15%",
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
  ingredientInputUnit: {
    flexGrow: 1,
    flexBasis: "15%",
    backgroundColor: theme.colors.surface,
  },
  instructionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  buttonContainer: {
    width: 40,
  },
  instructionInput: {
    flex: 1,
    flexBasis: "80%",
    marginLeft: 5,
    marginRight: 5,
  },
  container: {
    backgroundColor: "#D9D9D9",
    margin: 25,
    borderRadius: 20,
    paddingBottom: 20,
  },
  containerHeader: {
    backgroundColor: "#CBB18A",
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#333333",
  },
  containerRow: {
    marginLeft: 20,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainer: {
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    alignSelf: "center",
  },
  containerRowText: {
    fontSize: 18,
    // fontFamily: "Inter",
    fontWeight: "500",
    color: "#333333",
  },
});
