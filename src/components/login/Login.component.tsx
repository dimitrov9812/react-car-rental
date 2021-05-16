import { useContext, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import { useHistory } from 'react-router';
import '../login/Login.component.css';

// Components
import SpinnerComponent from '../../spinner/Spinner.component';

const LoginComponent: React.FC<{}> = () => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const [email, setEmail] = useState<string>('');

    // Check if user is already logged in and redirect to home if true
    useEffect(() => {
        if (store.isLoggedIn) {
            history.push('/home');
        }
    });

    const onSubmit = (e: any): void => {
        e.preventDefault();
        if (email) {
            store.login(email, history);
        } else {
            store.loginError = "Empty email field";
        }
    }

    const handleEmailChange = (e: any): void => {
        setEmail(e.target.value);
        store.loginError = "";
    }

    const renderSpinner = (): JSX.Element => {
        return (
            <div>
                <SpinnerComponent />
            </div>
        )
    }

    const renderLogin = (): JSX.Element => {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first" />
                    <form onSubmit={(e) => onSubmit(e)} >
                        <input type="text" id="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" className="fadeIn second" name="email" placeholder="example@mail.com" value={email} onChange={(e) => handleEmailChange(e)} />
                        <input type="submit" value="Login" className="fadeIn fourth" />
                        <div className="loginErrorWrap">
                            <span className="loginError">{store.loginError ? store.loginError : null}</span>
                        </div>
                        <div id="formFooter">
                            Don't have an account? <br />
                            <a className="underlineHover" href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return useObserver(() => (
        <div>
            {store.isLoading ? renderSpinner() : renderLogin()}
        </div>
    ))
}

export default LoginComponent;
