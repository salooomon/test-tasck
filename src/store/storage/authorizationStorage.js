import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie, setCookie} from "../../utils/сookieFunctions.js";

const instance = axios.create({
    baseURL: "https://darkdes-django-t3b02.tw1.ru/api/v1",
})

export const fetchLoginUser = createAsyncThunk(
    'fetch/loginUser',
    async (userData, {rejectWithValue}) => {
        const {username, password} = userData;
        try {
            const response = await instance.post(
                "/token/",
                {
                    username: username,
                    password: password
                },
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    }
)

export const fetchRegistrationUser = createAsyncThunk(
    'fetch/registrationUser',
    async (userData, {rejectWithValue}) => {
        const {username, password, name, surname, email} = userData;
        try {
            const response = await instance.post(
                "/registration/",
                {
                    email: email,
                    first_name: name,
                    last_name: surname,
                    password: password,
                    username: username,
                },
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchChangePassword = createAsyncThunk(
    'fetch/registrationUser',
    async (userData, {rejectWithValue}) => {
        const {oldPassword, newPassword,confirmedPassword} = userData;
        try {
            const response = await instance.put(
                "/change-password/",
                {
                    old_password: oldPassword,
                    password: newPassword,
                    confirmed_password: confirmedPassword,
                }
                ,
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchUpdateToken = createAsyncThunk(
    'fetch/updateToken',
    async (token, {rejectWithValue}) => {
        try {
            const response = await instance.post(
                "/token/refresh/",
                {
                    refresh: token
                }
            )
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const initialState = {
    loadingStatus: 'loading',
    error: null,
    isAuth: false
}

const authorizationReducer = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        isAuthenticated: (state, action) => {
            state.isAuth = getCookie(action.payload) !== false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Авторизация пользователя
            .addCase(fetchLoginUser.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                setCookie("user", action.payload.access, 13);
                state.isAuth = true;
                state.loadingStatus = "loaded";
                state.error = null;
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                alert(action.payload.detail);
                state.loadingStatus = "failed";
                state.error = action.payload.detail;

            })

            // Регистрация пользователя
            .addCase(fetchRegistrationUser.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchRegistrationUser.fulfilled, (state, action) => {
                if(action.payload.user) {
                    state.loadingStatus = "loaded";
                }
                state.error = null;
            })
            .addCase(fetchRegistrationUser.rejected, (state, action) => {
                if(action.payload.email) {
                    alert(action.payload.email);
                } else if(action.payload.username) {
                    alert(action.payload.username);
                } else {
                    alert('err');
                }
                state.loadingStatus = "failed";
                state.error = action.payload.detail;
            })

            // Смена пароля
            .addCase(fetchChangePassword.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchChangePassword.fulfilled, (state, action) => {
                if(action.payload.Succes) {
                    alert('password change complete')
                }
                state.loadingStatus = "loaded";
                state.error = null;
            })
            .addCase(fetchChangePassword.rejected, (state, action) => {
                alert(action.payload.detail);
                state.loadingStatus = "failed";
                state.error = action.payload.detail;

            })


            // Обновление токена
            .addCase(fetchUpdateToken.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchUpdateToken.fulfilled, (state, action) => {
                setCookie("user", action.payload.access, 13);
                state.loadingStatus = "loaded";
                state.error = null;
            })
            .addCase(fetchUpdateToken.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload.detail;
            })


    },
})

export const {isAuthenticated} = authorizationReducer.actions

export default authorizationReducer.reducer;