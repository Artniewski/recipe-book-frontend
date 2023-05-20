import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecipeList">
        <Stack.Screen name="RecipeForm" component={RecipeForm} />
        <Stack.Screen name="RecipeList" component={RecipeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}