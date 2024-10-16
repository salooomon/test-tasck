import {useState} from "react";

import {InputComponent} from "../UI/Input.jsx";
import {ButtonComponent} from "../UI/Button.jsx";

const [stateInput, setStateInput] = useState({password: '', username: ''});

const onSubmit = (e) => {
    e.preventDefault()

}

const onChange = (e) => {
    setStateInput(e.target.value)
}

export const FormAuth = () => {
    return (
        <form className="form-login" onSubmit={onSubmit}>
            <div className='input-wrapper'>
                <label>Имя пользователя:</label>
                <InputComponent
                    onChange={onChange}
                    value={stateInput.username}
                    placeholder={'username...'}
                    type="name"
                    name="username"
                />
                <label>Пароль:</label>
                <InputComponent
                    onChange={onChange}
                    value={stateInput.password}
                    placeholder={'password...'}
                    type="password"
                    name="password"
                />
            </div>
            <div className='btn-wrapper'>
                <ButtonComponent type="submit" text="Авторизоваться" />
                <ButtonComponent type="button" text="Регистарция" />
                <ButtonComponent type="button" text="Изменить пароль" />
            </div>
        </form>
    )
}