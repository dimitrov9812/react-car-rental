import { useContext, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import '../login/Login.component.css';

const LoginComponent = () => {
  const store: IStore = useContext(StoreContext)
  const [email, setEmail] = useState<string>('');


  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (email) {
        store.login(email);
    }
  }

  return useObserver(() => (
    <div>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h1>{store.title}</h1>
                <div className="fadeIn first">
                </div>
                <form onSubmit={(e) => onSubmit(e) } >
                <input type="text" id="email" className="fadeIn second" name="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <input type="submit" value="Register" className="fadeIn fourth" />

                <div id="formFooter">
                    Don't have an account? <br />
                    <a className="underlineHover" href="/register">Register</a>
                </div>
                </form>
            </div>
        </div>
    </div>
  ))
}

export default LoginComponent;
