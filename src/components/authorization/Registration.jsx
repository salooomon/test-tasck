import {InputComponent} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegistrationUser} from "../../store/storage/authorizationStorage.js";
import {useNavigate} from "react-router-dom";

export const Registration = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const {loadingStatus} = useSelector((state) => state.auth);

    const [isShow, setIsShow] = useState(false);

    const [stateRegistered, setStateRegistered] = useState({
        email: "",
        name: "",
        surname: "",
        username: "",
        password: "",
    });

    const onChange = (e) => {
        switch (e.target.name) {
            case "email":
                setStateRegistered({...stateRegistered, [e.target.name]: e.target.value});
                break
            case "name":
                setStateRegistered({...stateRegistered, [e.target.name]: e.target.value});
                break
            case "surname":
                setStateRegistered({...stateRegistered, [e.target.name]: e.target.value});
                break
            case "username":
                setStateRegistered({...stateRegistered, [e.target.name]: e.target.value});
                break
            case "password":
                setStateRegistered({...stateRegistered, [e.target.name]: e.target.value});
                break
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchRegistrationUser(stateRegistered));
    }
    useEffect(() => {
        if(loadingStatus === 'loaded') {
            navigation("/login");
        }
    }, [loadingStatus]);



    return (
        <form className="form-login" onSubmit={onSubmit}>
            <div className='input-wrapper'>
                <div className="register-wrapper">
                    <label>Email: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateRegistered.email}
                        placeholder={'ввод...'}
                        type="text"
                        name="email"
                    />
                </div>
                <div className="register-wrapper">
                    <label>Имя: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateRegistered.name}
                        placeholder={'ввод...'}
                        type="text"
                        name="name"
                    />
                </div>
                <div className="register-wrapper">
                    <label>Фамилия: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateRegistered.surname}
                        placeholder={'ввод...'}
                        type="text"
                        name="surname"
                    />
                </div>
                <div className="register-wrapper">
                    <label>Имя пользователя: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateRegistered.username}
                        placeholder={'ввод...'}
                        type="text"
                        name="username"
                    />
                </div>
                <div className="register-wrapper">
                    <label>Пароль: </label>
                    <InputComponent
                        onChange={onChange}
                        value={stateRegistered.password}
                        placeholder={'ввод...'}
                        type="password"
                        name="password"
                    />
                    <InputComponent
                        onChange={() => setIsShow(!isShow)}
                        value="Показать пароль"
                        type="checkbox"
                        name="checkbox"
                    />
                </div>
                <div className="register-wrapper"></div>


            </div>
            <div className='btn-wrapper'>
                <Button type="submit" text="Далее"/>
                <Button type="button" text="Выйти"/>
            </div>
        </form>
    )
}