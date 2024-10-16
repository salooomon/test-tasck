import {useState} from "react";
import {Button} from "../../UI/Button.jsx";
import {InputComponent} from "../../UI/Input.jsx";
import {useParams} from "react-router-dom";
import {ComparisonTime, getNewTime} from "../../../utils/utils.js";

export const Comment = ({comment}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [stateTextComment, setStateTextComment] = useState(comment.content);

    const author = comment.author;
    const update = comment.updated;
    const create = comment.create;

    function canEdite (idComment, idUser) {
        return idComment === comment.id && idUser === author.id
    }

    const onEdite = (idComment, idUser) => {
        if(canEdite(idComment, idUser)) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }

    const onChange = (e) => {
        if(e.target.name === "") {
            alert("Проверьте ввод");
        } else {
            setStateTextComment(e.target.value);
        }
    }

    const onDelete = (idComment, idUser) => {
        if(canEdite(idComment, idUser)) {

        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return <div className="comment">
        !isEditing
        ?
        <div className="comment-wrapper">
            <span className="user-name" >Автор {author.username}</span>
            <div className="date">{`Создано ${getNewTime(create)}`}</div>
            <p className='text'>{comment.content}</p>
            {ComparisonTime(create, update) && <div className="date-update">{`Обновлено: ${getNewTime(update)}`}</div>}
            <div className="btn-wrapper">
                <Button className="btn" onClick={() => onEdite(comment.id, author.id)} type="button" text="Изменить"/>
                <Button className="btn" onClick={onDelete} type="button" text="Удалить"/>
            </div>
        </div>
        : <div className="form-wrapper">
            <form className="form-edite" onSubmit={onSubmit}>
                <div className="input-wrapper">
                    <label>Редактирование комментария: </label>
                    <InputComponent
                        type="text"
                        name="edite"
                        onChange={onChange} value={stateTextComment}
                    />
                </div>
                <div className="btn-wrapper">
                    <Button
                        className="btn"
                        onClick={() => setIsEditing(!isEditing)}
                        type="button"
                        text="Отмена"
                    />
                    <Button
                        className="btn"
                        type="submit"
                        text="Изменить"
                    />
                </div>
            </form>
          </div>
    </div>
}