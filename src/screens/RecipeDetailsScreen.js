import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { FAB } from 'react-native-paper'


const RecipeDetailsScreen = ({ route, navigation }) => {
    const { recipeData } = route.params;
 

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>{recipeData.title}</Header>
            <FAB
                style={[styles.fab]}
                icon="heart"
                color='#ffffff'
                onPress={() => console.log('Pressed')}
                />
            <Image style={styles.image} source={{ uri: recipeData.image }} />
            <Text style={styles.time}>{recipeData.time} minutes</Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {recipeData.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
                    <Text style={styles.ingredient}>
                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                    </Text>
                </View>
            ))}
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            {recipeData.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionContainer}>
                    <Text style={styles.instruction}>{instruction}</Text>
                </View>
            ))}
        </Background>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    time: {
        fontSize: 18,
        marginTop: 8,
    },
    ingredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingredient: {
        fontSize: 16,
    },
    instructionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    instructionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    instruction: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        zIndex: 3,
        backgroundColor: '#CBB18A',
      },
});

export default RecipeDetailsScreen;
