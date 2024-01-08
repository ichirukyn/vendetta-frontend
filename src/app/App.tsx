import { FC } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/app/router/AppRouter";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;