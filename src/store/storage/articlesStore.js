import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie} from "../../utils/сookieFunctions.js";

const instance = axios.create({
    baseURL: "https://darkdes-django-t3b02.tw1.ru/api/v1",
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getCookie('user')}`
    }
})

export const fetchArticlesAll = createAsyncThunk(
    'fetch/articles',
    async (undefined, {rejectWithValue}) => {
        try {
            const response = await instance.get('/articles/');
            return response.data
        }catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchArticle = createAsyncThunk(
    'fetch/article',
    async (id, {rejectWithValue}) => {
        try {
            const response = await instance.get(`/articles/${id}`);
            return response.data
        }catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchComments = createAsyncThunk(
    'fetch/comments',
    async (id, {rejectWithValue}) => {
        try {
            const response = await instance.get(`articles/${id}/comments/`);
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const fetchComment = createAsyncThunk(
    'fetch/comment',
    async (idArticle, idComment, {rejectWithValue}) => {
        try {
            const response = await instance.get(`/articles/${idArticle}/comments/${idComment}`);
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const initialState = {
    loadingStatus: 'loading',
    loadingStatusComments: 'loading',
    error: null,
    articles: [],
    article: [],
    comments: [],
    comment:[]
}

const articlesReducer = createSlice({
    name: 'articles',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //Получение статей
            .addCase(fetchArticlesAll.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchArticlesAll.fulfilled, (state, action) => {
                state.loadingStatus = "loaded";
                state.articles = action.payload;
                state.error = null;

            })
            .addCase(fetchArticlesAll.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload;
            })

            //Получение одной статьи
            .addCase(fetchArticle.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.loadingStatus = "loaded";
                state.article = action.payload;
                state.error = null;

            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload;
            })

            // Получение комментариев к статье
            .addCase(fetchComments.pending, (state) => {
                state.loadingStatusComments = "loading";
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loadingStatusComments = "loaded";
                state.comments = action.payload;
                state.error = null;

            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loadingStatusComments = "failed";
                state.error = action.payload;
            })

            // Получение/изменение/удаление комментария к статье
            .addCase(fetchComment.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.loadingStatus = "loaded";

                state.comment = action.payload;
                state.error = null;

            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload;
            })
    },
})

export default articlesReducer.reducer;