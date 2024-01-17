import AppRouter from './router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <AppRouter/>
      <ToastContainer position="top-right" theme="colored"/>
    </>
  );
}

export default App;
