import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "../../components/UI/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticle} from "../../store/storage/articlesStore.js";
import {Article} from "../../components/articles/Article.jsx";


export const ArticlePage = () => {
    const dispatch = useDispatch();
    const {article, loadingStatus} = useSelector((state) => state.article);
    const params = useParams();

    useEffect(() => {
        dispatch(fetchArticle(params.id));
    }, []);


    const onClickReboot = () => {
        dispatch(fetchArticle(params.id));
    }

    return (
        <div className="card-article">
            {
                //Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы
                loadingStatus !== "loaded"
                    ? loadingStatus === "failed"
                        ? <div className="card-error">
                            <p>Что-то пошло не так</p>
                            <Button onClick={onClickReboot} type="button" text="Повторить"></Button>
                        </div>
                        : <div className="card-preloader">Loading...</div>
                    : <Article
                        title={article.title}
                        content={article.content}
                        createdTime={article.created}
                        updatedTime={article.updated}
                        image={article.image}
                    />
            }
        </div>
    )
}