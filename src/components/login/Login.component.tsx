import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/Store';

const Login = observer((props) => {
  const store = useContext(StoreContext)
  return (
    <div>
        <h1>Login</h1>
        {store.todos[0]}
    </div>
  )
})

export default Login;
