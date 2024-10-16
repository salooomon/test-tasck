import {InputComponent} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoginUser} from "../../store/storage/authorizationStorage.js";
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const authState = useSelector((state) => state.auth);

    const [stateInput, setStateInput] = useState({
        username: "",
        password: ""
    });

    const [isShow, setIsShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchLoginUser(stateInput));
    }

    const onChange = (e) => {
        if(e.target.name === "password") {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        } else {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        if(authState.loadingStatus === 'loaded') {
            navigation("/");
        }
    }, [authState.loadingStatus])

    return (
        <form className="form-login" onSubmit={onSubmit}>
            <div className='input-wrapper'>
                <label>Имя пользователя: </label>
                <InputComponent
                    onChange={onChange}
                    value={stateInput.username}
                    placeholder={'username...'}
                    type="name"
                    name="username"
                />
                <div className="password-wrapper">
                    <label>Пароль: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateInput.password}
                        placeholder={'password...'}
                        type={isShow ? "text" : "password"}
                        name="password"
                    />
                    <InputComponent
                        onChange={() => setIsShow(!isShow)}
                        value="Показать пароль"
                        type="checkbox"
                        name="checkbox"
                    />
                </div>
            </div>
            <div className='btn-wrapper'>
                <Button type="submit" text="Авторизация"/>
                <Button type="button" text="Регистрация" onClick={() => navigation("/registration")}/>
            </div>
        </form>
    )
}