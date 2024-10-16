// Отрисовать список статей

import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "../../components/UI/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticlesAll} from "../../store/storage/articlesStore.js";
import {ArticlesList} from "../../components/articles/ArticlesList.jsx";


export const ArticlesPage = () => {
    const dispatch = useDispatch();
    const articleState = useSelector((state) => state.article);

    useEffect(() => {
        dispatch(fetchArticlesAll());
    }, []);

    const onClickReboot = () => {
        dispatch(fetchArticlesAll());
    }

    return (
        <div className="card-article">
            {
                //Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы
                articleState.loadingStatus !== "loaded"
                    ? articleState.loadingStatus === "failed"
                        ? <div className="card-error">
                            <p>Что-то пошло не так</p>
                            <Button onClick={onClickReboot} type="button" >Повторить</Button>
                        </div>
                        : <div className="card-preloader">Loading...</div>
                    :  <ArticlesList articles={articleState.articles}/>
            }
        </div>
    )
}