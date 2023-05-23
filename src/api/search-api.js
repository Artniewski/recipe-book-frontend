const searchRecipes = async (searchFields) => {
    const db = firebase.firestore();
    const recipeRef = db.collection("recipes");
    let hasQuery = false;
    let query = recipeRef;

    // Search by title
    if (searchFields.title) {
        query = query.where("title", ">=", searchFields.title)
            .where("title", "<=", searchFields.title + "\uf8ff");
        hasQuery = true;
    }

    // Search by author
    if (searchFields.author) {
        query = query.where("userName", ">=", searchFields.author)
            .where("userName", "<=", searchFields.author + "\uf8ff");
        hasQuery = true;
    }

    // Search by time
    if (searchFields.time) {
        query = query.where("time", "<=", searchFields.time);
        hasQuery = true;
    }

    // If there are no query fields and no ingredients, return an empty array
    if (!hasQuery && searchFields.ingredients.length === 0) {
        return [];
    }

    // If there are ingredients, add the first one to the query
    if (searchFields.ingredients.length > 0) {
        query = query.where("ingredients", "array-contains", searchFields.ingredients[0]);
        hasQuery = true;
    }

    // If a query has been built, execute it
    if (hasQuery) {
        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        // If there are additional ingredients, filter the results in JavaScript
        if (searchFields.ingredients.length > 1) {
            let recipes = snapshot.docs.map(doc => doc.data());

            recipes = recipes.filter(recipe => {
                for (let i = 1; i < searchFields.ingredients.length; i++) {
                    if (!recipe.ingredients.includes(searchFields.ingredients[i])) {
                        return false;
                    }
                }
                return true;
            });

            return recipes;
        } else {
            // If there's only one ingredient, return the query results
            return snapshot.docs.map(doc => doc.data());
        }
    }
}
