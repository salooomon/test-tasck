import {configureStore} from "@reduxjs/toolkit";
import authorizationStorage from "./storage/authorizationStorage.js";
import articlesStore from "./storage/articlesStore.js";


export const store = configureStore({
    reducer: {
        auth: authorizationStorage,
        article: articlesStore
    },
});

