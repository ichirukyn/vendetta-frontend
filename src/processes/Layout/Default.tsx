import { FC, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Home } from '@/shared/assets/icons/Home.svg'

export interface IDefaultProps {
  children: ReactNode
}

const Default: FC<IDefaultProps> = ({ children }) => {
  return (
    <div className='block_column'>
      <div className="header w_100p h_50">
        <Link to={ '/' } className='image_centerY align-end text_body lh_unset fit-content'>
          <Home/> Главная
        </Link>
      
      </div>
      
      <div className='block_row w_100p h_100p'>
        <div className='block_column w_100p'>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Default;