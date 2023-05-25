import { auth, db } from "../core/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  increment,
  arrayUnion,
  arrayRemove,
  runTransaction,
  getDoc,
  FieldPath,
} from "firebase/firestore";
import { firebase } from "../core/firebase";

export const addRecipeToFavorites = async (recipeId) => {
  const userId = auth.currentUser.uid;
  const userFavoritesRef = doc(db, "favorites", userId);
  const recipeRef = doc(db, "recipes", recipeId);

  await runTransaction(db, async (transaction) => {
    const userFavoritesSnapshot = await transaction.get(userFavoritesRef);
    if (!userFavoritesSnapshot.exists()) {
      transaction.set(userFavoritesRef, { favorites: [recipeId] });
    } else {
      // add recipeId to user's favorite recipes
      transaction.update(userFavoritesRef, {
        favorites: arrayUnion(recipeId),
      });
    }
    // increment fav_count field
    transaction.update(recipeRef, {
      fav_count: increment(1),
    });
  });
};

export const removeRecipeFromFavorites = async (recipeId) => {
  const userId = auth.currentUser.uid;
  const userFavoritesRef = doc(db, "favorites", userId);
  const recipeRef = doc(db, "recipes", recipeId);

  await runTransaction(db, async (transaction) => {
    const userFavoritesSnapshot = await transaction.get(userFavoritesRef);
    if (userFavoritesSnapshot.exists()) {
      transaction.update(recipeRef, {
        fav_count: increment(-1),
      });
      transaction.update(userFavoritesRef, {
        favorites: arrayRemove(recipeId),
      });
    }
  });
};

export const getUserFavoriteRecipes = async () => {
  const userId = auth.currentUser.uid;
  const userFavoritesRef = doc(db, "favorites", userId);
  const userFavoritesDoc = await getDoc(userFavoritesRef);
  if (userFavoritesDoc.exists()) {
    const favoriteRecipeIds = userFavoritesDoc.data().favorites;
    const recipeCollection = collection(db, "recipes");
    const favoriteRecipes = [];

    for (const recipeId of favoriteRecipeIds) {
      const recipeRef = doc(recipeCollection, recipeId);
      const recipeSnapshot = await getDoc(recipeRef);

      if (recipeSnapshot.exists()) {
        favoriteRecipes.push({
          ...recipeSnapshot.data(),
          id: recipeSnapshot.id,
        });
      }
    }

    return favoriteRecipes;
  } else {
    return [];
  }
};

export const getUserFavoriteRecipeIds = async () => {
  const userId = auth.currentUser.uid;
  const userFavoritesRef = doc(db, "favorites", userId);
  const userFavoritesDoc = await getDoc(userFavoritesRef);
  if (userFavoritesDoc.exists()) {
    return new Set(userFavoritesDoc.data().favorites);
  } else {
    return new Set();
  }
};

export const isRecipeFavorite = async (recipeId) => {
  let favouriteIds = await getUserFavoriteRecipeIds();
  return favouriteIds.has(recipeId);
};
