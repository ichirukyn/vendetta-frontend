import { FC, useEffect, useState } from 'react';
import { EnemyType } from "@/shared/types";
import { fetchAllEnemy } from "@/shared/api/enemy";
import Table from "@/shared/ui/Table/Table";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { EnemyColumn } from "@/widgets/Enemy";

type EnemyListType = {
  race_name?: string,
  class_name?: string,
  lvl?: number,
  total_stats?: number,
} & EnemyType

const EnemyList: FC = () => {
  const [enemyList, setEnemyList] = useState<EnemyListType[] | []>([])
  
  useEffect(() => {
    fetchAllEnemy().then((res) => {
      const data = res.data.map((enemy) => {
        return {
          ...enemy,
          race_name: enemy.race.name,
          class_name: enemy.class.name,
          lvl: enemy.stats?.lvl || 0,
          total_stats: enemy.stats?.total_stats || 0,
        }
      })
      setEnemyList(data as EnemyListType[])
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