import { FC } from 'react';
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";


const Home: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Админка</h3>
      
      <div className="block_column align-start">
        <Link to={ pathRoutes.technique.base } className='td_underline tab_active text_title'>Техники</Link>
        <Link to={ pathRoutes.hero.base } className='td_underline tab_active text_title'>Игроки</Link>
        <Link to={ pathRoutes.enemy.base } className='td_underline tab_active text_title'>Противники</Link>
        <Link to={ pathRoutes.item.base } className='td_underline tab_active text_title'>Предметы</Link>
        <Link to={ pathRoutes.event.base } className='td_underline tab_active text_title'>События</Link>
        
        <br/>
        <p className='text_title'>(Ниже в разработке)</p>
        <Link to={ pathRoutes.map.base } className='td_underline tab_active text_title'>Карта</Link>
      </div>
    </div>
  );
};

export default Home;