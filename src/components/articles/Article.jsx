import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchComments} from "../../store/storage/articlesStore.js";
import {useDispatch, useSelector} from "react-redux";
import {Comments} from "./comments/Comments.jsx";
import {ComparisonTime, getNewTime} from "../../utils/utils.js";


export const Article = (props) => {
    const {title, image, content, createdTime, updatedTime, userName, onClick} = props;

    const updateData = new Date(updatedTime);
    const createData = new Date(createdTime);

    return (
        <div>
            <img src={`${image}`} alt="Фото к статье"
            />
            <div className="article-info">
                <h2 className="user-created"><b>Автор: </b>{userName}</h2>
                <h3 className="title">{title}</h3>
                <p className="content-article">{content}</p>
                <p><b>Создана: </b>{getNewTime(createdTime)}</p>
                {ComparisonTime(createData, updateData) && <p><b>Создана: </b>{getNewTime(updatedTime)}</p>}

            </div>
            <button className="btn-delete" onClick={onClick}>Удалить</button>
            <Comments/>
        </div>
    )
}