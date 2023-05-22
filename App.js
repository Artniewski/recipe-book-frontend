import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-native-paper'

import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  RecipeForm,
  RecipeList,
  RecipeDetailsScreen,
  SearchScreen,
} from './src/screens'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="RecipeForm" component={RecipeForm} />
          <Stack.Screen name="RecipeList" component={RecipeList} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
