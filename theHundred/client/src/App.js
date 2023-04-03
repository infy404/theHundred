import logo from './logo.svg';
import './App.css';
import Routing from './routes/routing';
import NotifyToast from './components/toast/notifyToast';
import NavBar from './components/navBar/navBar';
import { useSelector } from 'react-redux';


function App() {

  const { isLoggedIn } = useSelector((state) => state.user)
  console.log(isLoggedIn)

  return (
    <div className="App">
      { isLoggedIn ? <> </> : <NavBar />}
      <Routing />
      <NotifyToast />
    </div>
  );
}

export default App;
