import React, { useState } from 'react';
import { Button, TextInput, ScrollView, StyleSheet } from 'react-native';

export default function RecipeForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipe title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />
      <Button
        title="Save Recipe"
        onPress={() => {
          // Here you can handle the submission of the form
          navigation.navigate('RecipeList');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    },
});