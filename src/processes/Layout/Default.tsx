import { FC, ReactNode } from 'react';

export interface IDefaultProps {
  children: ReactNode
}

const Default: FC<IDefaultProps> = ({ children }) => {
  return (
    <div className='block_row w_100p h_100p'>
      <div className='block_column w_100p'>
        { children }
      </div>
    </div>
  );
};

export default Default;