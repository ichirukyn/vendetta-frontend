import {FC} from 'react';
import {Link} from "react-router-dom";
import {pathRoutes} from "@/app";


const Home: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Админка</h3>

      <div className="block_column align-start">
        <Link to={pathRoutes.arena.base} className='tab_active text_title'>Арена ☠️</Link>
        <Link to={pathRoutes.enemy.base} className='tab_active text_title'>Противники ☠️</Link>
        <Link to={pathRoutes.hero.base} className='tab_active text_title'>Игроки 👤</Link>
        <br/>

        <Link to={pathRoutes.technique.base} className='tab_active text_title'>Техники ⚔️</Link>
        <Link to={pathRoutes.branch.base} className='tab_active text_title'>Ветки техник ⚔️</Link>
        <Link to={pathRoutes.spell.base} className='tab_active text_title'>Заклинания 🔮</Link>
        <br/>

        <Link to={pathRoutes.item.base} className='tab_active text_title'>Предметы</Link>
        <Link to={pathRoutes.event.base} className='tab_active text_title'>События</Link>
        <br/>

        <p className='text_title'>(Ниже в разработке)</p>
        <Link to={pathRoutes.map.base} className='tab_active text_title'>Карта</Link>
        <Link to={pathRoutes.branch.base} className='tab_active text_title'>Ветки заклинаний 🔮</Link>
      </div>
    </div>
  );
};

export default Home;
