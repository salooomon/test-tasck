import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie, setCookie} from "../../utils/сookieFunctions.js";

const instance = axios.create({
    baseURL: "https://darkdes-django-t3b02.tw1.ru/api/v1",
})

export const fetchLoginUser = createAsyncThunk(
    'fetch/loginUser',
    async (username, password) => {
        const response = await instance.post(
            "/token/",
            {
                username: username,
                password: password
            },
        );
        return response.data
    }
)

export const fetchRegistrationUser = createAsyncThunk(
    'fetch/registrationUser',
    async (username, password, first_name, last_name, email) => {
        const response = await instance.post(
            "/registration/",
            {
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                username: username,
            },
        );
        return response.data
    }
)

export const fetchUpdateToken = createAsyncThunk(
    'fetch/updateToken',
    async (token) => {
        const response = await instance.post(
            "/token/refresh/",
            {
                "refresh": token
            }
        )
        return response.data
    }
)

const initialState = {
    loadingStatus: 'loading',
    error: null,
}

const authorizationReducer = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        isAuthenticated: (state, action) => {
            if(getCookie(action.payload) === false) {
                state.token = false
            } else {
                state.token = action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Авторизация пользвотеля
            .addCase(fetchLoginUser.pending, (state) => {
                state.loadingStatusGenre = "loading"
                state.error = null
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                setCookie("user", action.payload.access, 13)
                state.loadingStatusGenre = "loaded"
                state.error = null
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                alert(`failed auth`)
                state.loadingStatusGenre = "failed"
                state.error = action.payload.detail;

            })

            // Регистрация пользователя
            .addCase(fetchRegistrationUser.pending, (state) => {
                state.loadingStatusGenre = "loading"
                state.error = null
            })
            .addCase(fetchRegistrationUser.fulfilled, (state, action) => {
                // setCookie("user", action.payload.access, 13)
                state.loadingStatusGenre = "loaded"
                state.error = null
            })
            .addCase(fetchRegistrationUser.rejected, (state, action) => {
                alert(`failed register, check that your email or password is correct`)
                state.loadingStatusGenre = "failed"
                state.error = action.payload.detail;
            })

            // Обновление токена
            .addCase(fetchUpdateToken.pending, (state) => {
                state.loadingStatusGenre = "loading"
                state.error = null
            })
            .addCase(fetchUpdateToken.fulfilled, (state, action) => {
                setCookie("user", action.payload.access, 13)
                state.loadingStatusGenre = "loaded"
                state.error = null
            })
            .addCase(fetchUpdateToken.rejected, (state, action) => {
                alert(`failed update`)
                state.loadingStatusGenre = "failed"
                state.error = action.payload.detail;
            })

    },
})

export const {isAuthenticated} = authorizationReducer.actions

export default authorizationReducer.reducer;