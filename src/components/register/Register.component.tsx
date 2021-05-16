import { useContext, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import { InputTypes } from '../enums/Enums';
import { useHistory } from 'react-router';
import '../login/Login.component.css';
// Components
import SpinnerComponent from '../../spinner/Spinner.component';

const RegisterComponent: React.FC<{}> = () => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext)
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    // Check if user is already logged in and redirect to home if true
    useEffect(() => {
        if (store.isLoggedIn) {
            history.push('/home');
        }
    });

    const onSubmit = (e: any): void => {
        e.preventDefault();
        if (username && email && phoneNumber) {
            store.register(username, email, phoneNumber, history);
        } else if (!username) {
            store.registerError = "Please enter username"
        } else if (!email) {
            store.registerError = "Please enter email"
        } else if (!phoneNumber) {
            store.registerError = "Please enter phone number"
        }
    }

    const handleInputChage = (type: InputTypes, e: any) => {
        switch (type) {
            case type = InputTypes.username:
                setUsername(e.target.value);
                break;
            case type = InputTypes.email:
                setEmail(e.target.value);
                break;
            case type = InputTypes.phoneNumber:
                setPhoneNumber(e.target.value);
                break;
        }

        store.registerError = "";
    }

    const renderSpinner = (): JSX.Element => {
        return <SpinnerComponent />
    }

    const renderRegister = (): JSX.Element => {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                    </div>
                    <form onSubmit={(e) => onSubmit(e)} >
                        <input type="text" id="username" className="fadeIn second" name="username" placeholder="username" value={username} onChange={(e) => handleInputChage(InputTypes.username, e)} />
                        <input type="text" id="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" className="fadeIn third" name="email" placeholder="email" value={email} onChange={(e) => handleInputChage(InputTypes.email, e)} />
                        <input type="text" id="phoneNumber" className="fadeIn fourth" name="phoneNumber" placeholder="phone number" value={phoneNumber} onChange={(e) => handleInputChage(InputTypes.phoneNumber, e)} />
                        <input type="submit" value="Register" className="fadeIn fourth" />
                        <div className="loginErrorWrap">
                            <span className="loginError">{store.registerError ? store.registerError : null}</span>
                        </div>
                        <div id="formFooter">
                            Already have an account? <br />
                            <a className="underlineHover" href="/login">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return useObserver(() => (
        <div>
            {store.isLoading ? renderSpinner() : renderRegister()}
        </div>
    ))
}

export default RegisterComponent;
