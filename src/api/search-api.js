import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '../core/firebase';
import { getAllRecipes } from "./recipe-api";


export const parseSearchString = (searchString) => {
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
        searchFields.time = Number(term.substring(5));
        } else {
        searchFields.title += term + " ";
        }
    });

    searchFields.title = searchFields.title.trim();
        console.log(searchFields);
    return searchFields;
};
