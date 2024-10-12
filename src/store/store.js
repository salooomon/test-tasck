import {configureStore} from "@reduxjs/toolkit";
import AuthorizationStorage from "./storage/AuthorizationStorage.js";


export const store = configureStore({
    reducer: {
        auth: AuthorizationStorage
    },
});

