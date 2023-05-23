import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '../core/firebase';

const searchRecipes = async (searchFields) => {
    const recipeRef = collection(db, "recipes");
    let hasQuery = false;
    let queries = [];

    // Search by title
    if (searchFields.title) {
        queries.push(where("title", ">=", searchFields.title), where("title", "<=", searchFields.title + "\uf8ff"));
        hasQuery = true;
    }

    // Search by author
    if (searchFields.author) {
        queries.push(where("userName", ">=", searchFields.author), where("userName", "<=", searchFields.author + "\uf8ff"));
        hasQuery = true;
    }

    // Search by time
    if (searchFields.time) {
        queries.push(where("time", "<=", searchFields.time));
        hasQuery = true;
    }

    // Search by first ingredient
    if (searchFields.ingredients.length > 0) {
        queries.push(where("ingredients", "array-contains", searchFields.ingredients[0]));
        hasQuery = true;
    }

    if (!hasQuery) {
        return [];
    }

    const recipesQuery = query(recipeRef, ...queries);
    const querySnapshot = await getDocs(recipesQuery);
    
    if (querySnapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    let recipes = [];
    querySnapshot.forEach((doc) => {
        recipes.push({ ...doc.data(), id: doc.id });
    });

    // If there are more than one ingredients, filter recipes in JavaScript
    if (searchFields.ingredients.length > 1) {
        recipes = recipes.filter(recipe =>
            searchFields.ingredients.slice(1).every(ingredient =>
                recipe.ingredients.includes(ingredient)
            )
        );
    }

    return recipes;
}
