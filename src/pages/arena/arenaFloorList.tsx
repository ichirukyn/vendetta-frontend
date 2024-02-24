import { FC, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { pathRoutes } from "@/app";
import { useArenaStore } from "@/shared/store/ArenaStore";
import { EnemyType, FloorEnemyType } from "@/shared/types";
import Table from "@/shared/ui/Table/Table";
import { FloorEnemyColumn } from "@/widgets/Arena";

type FloorEnemy = FloorEnemyType & {
  name: string,
  rank: string,
  race_name: string,
  class_name: string,
  lvl: number,
  total_stats: number,
}

const ArenaList: FC = () => {
  const { id } = useParams()
  const { floorList, floor, setFloor } = useArenaStore()
  
  const [enemies, setEnemies] = useState<EnemyType[]>([])
  
  useEffect(() => {
    if (id && floorList.length) {
      const enemyList: EnemyType[] = []
      
      floor?.enemies?.forEach((enemy) => {
        if (enemy?.enemy?.id) enemyList.push({ ...enemy?.enemy })
      })
      
      setEnemies(enemyList as EnemyType[])
    }
  }, [floor]);
  
  useEffect(() => {
    if (id && floorList.length) {
      const floorEnemy = floorList.find((floor) => floor?.id === Number(id))
      if (floorEnemy) setFloor(floorEnemy)
    }
  }, [id, floor, floorList.length]);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список противников ({ floor?.name })</h3>
      <Table rows={ enemies } columns={ FloorEnemyColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.arena.floor_create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default ArenaList;