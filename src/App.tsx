import './App.css';
import {  StoreProvider } from './store/Store';


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
