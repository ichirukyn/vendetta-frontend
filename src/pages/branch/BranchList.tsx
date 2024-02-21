import { FC } from 'react';
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { BranchWidget } from "@/widgets";

const BranchList: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список веток</h3>
      {/*<Table rows={ enemyList } columns={ EnemyColumn } style={ { isHeader: true } }/>*/}
      
      <div className="w_100p h_100p minh_700">
        <BranchWidget height={1000} width={1000} />
      </div>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.enemy.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
 );
};

export default BranchList;