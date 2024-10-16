import {getNewTime} from "../../utils/utils.js";


export const ArticleItem = ({ title, create, image, }) => {
    const date = new Date(create);
    return (
        <div className="article-item">
            <img src={`${image}`} alt="Фото к статье"
            />
            <div className="article-info">
                <h2 className="title">{title}</h2>
                <p><b>Создана: </b>{getNewTime(date)}</p>
            </div>
        </div>
    )
}