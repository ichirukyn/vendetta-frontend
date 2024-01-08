import { FC } from 'react';

const HeaderMain: FC = () => {
  return (
    <header className='w_100p'>
      <div className="header__wrapper">
        <a href="/public" className='image_centerY gap_15 text_gray_700 text_bold'>
          <img src="/favicon/react.svg" alt="logo"/>
        </a>
        
        
        {/*<button className='button'>Войти</button>*/ }
      </div>
    </header>
  );
};

export default HeaderMain;