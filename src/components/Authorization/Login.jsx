import {InputComponent} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchLoginUser} from "../../store/storage/AuthorizationStorage.js";


export const Login = () => {
    const dispatch = useDispatch();

    const [stateInput, setStateInput] = useState({
        username: "",
        password: ""
    });

    const [isShow, setIsShow] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchLoginUser(stateInput.username, stateInput.password))
    }

    const onChange = (e) => {
        if(e.target.name === "password") {
            setStateInput({...stateInput, [e.target.name]: e.target.value})
        } else {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        }
    }
    const onClick = () => {

    }

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
                <Button type="button" text="Сменить пароль" onClick={onClick}/>
            </div>
        </form>
    )
}