import { FC } from 'react';
import { useUserStore } from "@/shared/store/UserStore";
import { Navigate } from "react-router-dom";

export type CheckAuthProps = {
  children: JSX.Element
}

const CheckAuth: FC<CheckAuthProps> = ({ children }) => {
  const isAuth = !!useUserStore.getState().token
  
  if (isAuth) {
    return <Navigate replace to="/" />
  }
  
  return children
};

export default CheckAuth;