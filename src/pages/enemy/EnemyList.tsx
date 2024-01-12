import { FC, useEffect, useState } from 'react';
import { EnemyType } from "@/shared/types";
import { fetchAllEnemy } from "@/shared/api/enemy";
import Table from "@/shared/ui/Table/Table";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { EnemyColumn } from "@/widgets/Enemy";

const EnemyList: FC = () => {
  const [enemyList, setEnemyList] = useState<EnemyType[] | []>([])
  
  useEffect(() => {
    fetchAllEnemy().then((res) => {
      setEnemyList(res.data)
    })
  }, []);
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список противников</h3>
      <Table rows={ enemyList } columns={ EnemyColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.enemy.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default EnemyList;