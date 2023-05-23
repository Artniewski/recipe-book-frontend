import { auth, db, storage } from '../core/firebase';
import { doc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const recipeCollection = collection(db, "recipes");

const getRecipesByQuery = async (query) => {
    const querySnapshot = await getDocs(query);
    let recipes = [];
    querySnapshot.forEach((doc) => {
        recipes.push({ ...doc.data(), id: doc.id });
    });

    return recipes;
}

export const getRecipesByUser = async () => {
    const userId = auth.currentUser.uid;
    const q = query(recipeCollection, where("user", "==", userId));
    const recipes = await getRecipesByQuery(q);
    return recipes;
}

export const getAllRecipes = async () => {
    const recipes = await getRecipesByQuery(recipeCollection);
    return recipes;
}

export const editRecipe = async (recipeId, updatedData) => {
    const recipeRef = doc(db, "recipes", recipeId);

    await updateDoc(recipeRef, updatedData);
}

export const deleteRecipe = async (recipeId) => {
    const recipeRef = doc(db, "recipes", recipeId);

    await deleteDoc(recipeRef);
}

export const addRecipe = async (recipe) => {
    const userId = auth.currentUser.uid;
    const imageUri = recipe.image;

    // Fetch the image file
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Generate a random file name
    const fileName = Math.floor(Math.random() * 1000000);

    // Upload the image and get its URL
    const imageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Build the recipe object
                const recipeData = {
                    title: recipe.title,
                    time: Number(recipe.time),
                    ingredients: recipe.ingredients.map(ingredient => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit
                    })),
                    instructions: recipe.instructions,
                    user: userId,
                    fav_count: 0,
                    image: downloadURL,
                };

                // Save the recipe to Firestore
                await setDoc(doc(recipeCollection), recipeData);

                resolve(recipeData);
            }
        );
    });
}

