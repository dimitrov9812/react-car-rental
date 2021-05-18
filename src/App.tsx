import './App.css';
import {  StoreProvider } from './store/Store';

//Fontawesome
import 'font-awesome/css/font-awesome.min.css';

// Components
import AppRouterComponent from './components/app-router/AppRouter.component';

const App = (): JSX.Element => {
  
  return (
    <StoreProvider>
      <AppRouterComponent />
    </StoreProvider>
  );
}

export default App;
