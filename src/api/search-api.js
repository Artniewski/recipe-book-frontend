import { auth, db } from '../core/firebase';
import { doc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs, and } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const getRecipesByQuery = async (query) => {
    const querySnapshot = await getDocs(query);
    let recipes = [];
    querySnapshot.forEach((doc) => {
        recipes.push({ ...doc.data(), id: doc.id });
    });

    return recipes;
}

const parseSearchString = (searchString) => {
    const searchFields = {
        title: "",
        ingredients: [],
        author: "",
        time: "",
    };

    const searchTerms = searchString.split(" ");
    searchTerms.forEach((term) => {
        if (term.startsWith("ingredients:")) {
            searchFields.ingredients = searchFields.ingredients.concat(term.substring(12).substring(1, term.length - 13).split(","));
        } else if (term.startsWith("author:")) {
        searchFields.author = term.substring(7);
        } else if (term.startsWith("time:")) {
        searchFields.time = term.substring(5);
        } else {
        searchFields.title += term + " ";
        }
    });

    searchFields.title = searchFields.title.trim();

    return searchFields;
};

export const searchRecipes = async (searchString) => {
    const searchFields = parseSearchString(searchString);
    console.log(searchFields);
    const recipeCollection = collection(db, "recipes");
    const querySnapshot = await getDocs(recipeCollection);
    const recipes = [];
    querySnapshot.forEach((doc) => {
      const title = doc.data().title.toLowerCase();
      const time = doc.data().time;
      console.log(parseInt(time), parseInt(searchFields.time))
      console.log(parseInt(time) <= parseInt(searchFields.time))
      console.log(title.includes(searchString.toLowerCase()))
      if (title.includes(searchFields.title.toLowerCase())
      && (parseInt(time) <= parseInt(searchFields.time) || searchFields.time === "")) {
        recipes.push({ ...doc.data(), id: doc.id });
      }
    });
    return recipes;
  };
