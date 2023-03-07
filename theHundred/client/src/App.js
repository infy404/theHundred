import logo from './logo.svg';
import './App.css';
import Routing from './routes/routing';
import NotifyToast from './components/toast/notifyToast';

function App() {
  return (
    <div className="App">
      <Routing />
      <NotifyToast />
    </div>
  );
}

export default App;
