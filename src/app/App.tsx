import { FC } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/app/router/AppRouter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App: FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer draggable={ false }/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;