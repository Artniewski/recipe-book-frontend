import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Button as PaperButton } from 'react-native-paper';
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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
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
    setLoading(true)
    const response = await addRecipe({
      title: title,
      time: time,
      ingredients: ingredients,
      instructions: instructions,
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
            containerStyle={styles.ingredientInputContainer}
            inputStyle={styles.ingredientInputName}
            value={ingredient.name}
            onChangeText={text => handleIngredientChange(index, 'name', text)}
            placeholder="Ingredient name"
          />
          <TextInput
            containerStyle={styles.ingredientInputContainer}
            inputStyle={styles.ingredientInputQuantity}
            value={ingredient.quantity}
            onChangeText={text => handleIngredientChange(index, 'quantity', text)}
            placeholder="Quantity"
          />
          <TextInput
            containerStyle={styles.ingredientInputContainer}
            inputStyle={styles.ingredientInputUnit}
            value={ingredient.unit}
            onChangeText={text => handleIngredientChange(index, 'unit', text)}
            placeholder="Unit"
          />
          {ingredients.length > 1 && (
            <View style={styles.buttonContainer}><PaperButton icon="minus" onPress={() => handleRemoveIngredient(index)} />
            </View>)}
          {index === ingredients.length - 1 && (
            <View style={styles.buttonContainer}> <PaperButton icon="plus" onPress={handleAddIngredient} />
            </View>)}
        </View>
      ))}

      <Text>Instructions:</Text>
      {instructions.map((instruction, index) => (
        <View key={index} style={styles.instructionContainer}>
          <TextInput
            inputStyle={styles.instructionInput}
            value={instruction}
            onChangeText={text => handleInstructionChange(index, text)}
            placeholder={`Instruction ${index + 1}`}
          />

          {instructions.length > 1 && (
            <View style={styles.buttonContainer}>
              <PaperButton icon="minus" onPress={() => handleRemoveInstruction(index)} />
            </View>
          )}
          {index === instructions.length - 1 && (
            <View style={styles.buttonContainer}>
              <PaperButton icon="plus" onPress={handleAddInstruction} />
            </View>)}
        </View>
      ))}

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
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  ingredientInputContainer: {
    flexGrow: 1,
    flexBasis: '30%',
    marginBottom: 10,
  },
  ingredientInputName: {
    flexGrow: 2,
    flexBasis: '40%',
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
  ingredientInputQuantity: {
    flexGrow: 1,
    flexBasis: '15%',
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
  ingredientInputUnit: {
    flexGrow: 1,
    flexBasis: '15%',
    backgroundColor: theme.colors.surface,
  },
  instructionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  buttonContainer: {
    width: 40,
  },
  instructionInput: {
    flex: 1,
  }

});