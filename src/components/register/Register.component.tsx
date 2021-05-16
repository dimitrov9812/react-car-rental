import { useContext, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import '../login/Login.component.css';

const RegisterComponent = () => {
  const store: IStore  = useContext(StoreContext)
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');


  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (username && email && phoneNumber) {
        store.register(username, email, phoneNumber);
    }
  }

  return useObserver(() => (
    <div>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                </div>
                <form onSubmit={(e) => onSubmit(e) } >
                <input type="text" id="username" className="fadeIn second" name="username" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <input type="text" id="email" className="fadeIn third" name="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <input type="text" id="phoneNumber" className="fadeIn fourth" name="phoneNumber" placeholder="phone number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
                <input type="submit" value="Register" className="fadeIn fourth" />

                <div id="formFooter">
                    Already have an account? <br />
                    <a className="underlineHover" href="/login">Login</a>
                </div>
                </form>
            </div>
        </div>
    </div>
  ))
}

export default RegisterComponent;
