import {InputComponent} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {useState} from "react";

export const ChangingPassword = () => {
    const [statePassword, setStatePassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        if(e.target.name === "password") {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        }else if(e.target.name === "confirm-password") {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        }else if(e.target.name === "new-password") {
            setStateInput({...stateInput, [e.target.name]: e.target.value});
        }
        setStatePassword(e.target.value);
    }

    return (
        <form className="form-login" onSubmit={onSubmit}>
            <div className='wrapper'>
                <div className="input-wrapper">
                    <label>Старый пароль: </label>
                    <InputComponent
                        onChange={onChange}
                        value={statePassword.oldPassword}
                        placeholder={'ввод...'}
                        type="password"
                        name="password"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Новый пароль: </label>
                    <InputComponent
                        onChange={onChange}
                        value={statePassword.newPassword}
                        placeholder={'ввод...'}
                        type="password"
                        name="new-password"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Подтверждение пароля: </label>
                    <InputComponent
                        onChange={onChange}
                        value={statePassword.confirmPassword}
                        placeholder={'ввод...'}
                        type="password"
                        name="confirm-password"
                    />
                </div>
            </div>
            <div className='btn-wrapper'>
                <Button type="submit" text="Подтвердить"/>
                <Button type="button" text="Отмена"/>
            </div>
        </form>
    )
}