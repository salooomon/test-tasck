import {InputComponent} from "../../UI/Input.jsx";
import {Button} from "../../UI/Button.jsx";
import {Comment} from "./Comment.jsx";
import {useEffect, useState} from "react";
import {fetchComments} from "../../../store/storage/articlesStore.js";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";


export const Comments = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {comments, loadingStatusComments} = useSelector((state) => state.article);
    const {stateNewComment, setStateNewComment} = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setStateNewComment(e.target.value);
    }

    useEffect(() => {
        dispatch(fetchComments(params.id));
    }, [])

    const onClickReboot = () => {
        dispatch(fetchComments(params.id));
    }

    // console.log(comments, loadingStatusComments);

    return (
        loadingStatusComments !== "loaded"
            ? loadingStatusComments === "failed"
                ? <div className="card-error">
                    <p>Что-то пошло не так</p>
                    <Button onClick={onClickReboot} type="button" text="Повторить"></Button>
                </div>
                : <div className="card-preloader">Loading...</div>
            : <div className="comments-wrapper">
                <div className="form-сomments">
                    <form onSubmit={onSubmit}>
                        <label>Комментарий: </label>
                        <InputComponent
                            type="text"
                            value={stateNewComment}
                            name="сomments"
                            placeholder="введите..."
                            onChange={onChange}/>
                        <Button className="btn" type="submit" text="Отправить" />
                    </form>
                </div>

                <ul className="comments-list">
                    {comments.map((comment, index) => (
                        <li className="comment-item" key={index}>
                            comment.children.length === 0
                            ? <Comment comment={comment} />
                            : <div className="answer">
                                <span>{`Ответ пользователю ${comment.author.username}`}</span>
                                <Comment comment={comment.children} />
                              </div>
                        </li>
                    ))}
                </ul>
            </div>

)
}