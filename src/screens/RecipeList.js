import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default function RecipeList({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Create Recipe" onPress={() => navigation.navigate('RecipeForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});