import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='full-width block_column align-center'>
      <div className="maxw_container block_row justify-between align-center p_30X">
        <div className="image_centerY">
          <img src="/favicon/react.svg" alt="logo"/>
        </div>
        
        <div className="footer__link block_row">
          <p>123</p>
        </div>
        <div className='block_column align-start'>
          <p>Наши соцсети</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;