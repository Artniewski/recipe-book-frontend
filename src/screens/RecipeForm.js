import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { theme } from '../core/theme';
import { addRecipe } from '../api/recipe-api';
import Toast from '../components/Toast';
import * as ImagePicker from 'expo-image-picker';

export default function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const onAddRecipePressed = async () => {
    setLoading(true)
    const response = await addRecipe({
      title: title.value,
      time: time.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
      image: image,
    });
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Add New Recipe</Header>

      <TextInput
        label="Title"
        returnKeyType="next"
        value={title}
        onChangeText={setTitle}
        error={!!title.error}
        errorText={title.error}
      />

      <TextInput
        label="Time"
        returnKeyType="next"
        value={time}
        onChangeText={setTime}
        error={!!time.error}
        errorText={time.error}
      />

      <Text>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <TextInput
            value={ingredient.name}
            onChangeText={value => updateIngredient(index, 'name', value)}
            placeholder="Ingredient name"
          />
          <TextInput
            value={ingredient.quantity}
            onChangeText={value => updateIngredient(index, 'quantity', value)}
            placeholder="Quantity"
          />
          <TextInput
            value={ingredient.unit}
            onChangeText={value => updateIngredient(index, 'unit', value)}
            placeholder="Unit"
          />
        </View>
      ))}
      <Button title="Add Ingredient" onPress={addIngredient} />

      <Text>Instructions:</Text>
      {instructions.map((instruction, index) => (
        <TextInput
          key={index}
          value={instruction}
          onChangeText={value => updateInstruction(index, value)}
          placeholder={`Instruction ${index + 1}`}
        />
      ))}
      <Button title="Add Instruction" onPress={addInstruction} />

      <Button onPress={selectImage}>
        Select Image
      </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button loading={loading} mode="contained" onPress={onAddRecipePressed}>
        Add Recipe
      </Button>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
