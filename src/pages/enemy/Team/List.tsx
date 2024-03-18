import { FC, useEffect, useState } from 'react';
import { EnemyTeamType } from '@/shared/types';
import Table from '@/shared/ui/Table/Table';
import { Link, useParams } from 'react-router-dom';
import { pathRoutes } from '@/app';
import { EnemyTeamColumn } from '@/widgets/Enemy';
import { useEnemyTeamStore } from "@/shared/store/Enemy";

type EnemyListType = {
  name?: string,
} & EnemyTeamType

const EnemyTeamList: FC = () => {
  const { id } = useParams()
  
  const [filterList, setFilterList] = useState<EnemyListType[]>([])
  const { enemyTeamList, getEnemyTeamList } = useEnemyTeamStore()
  console.log(filterList)
  useEffect(() => {
    if (enemyTeamList) {
      setFilterList(enemyTeamList.map((enemyTeam) => {
        return {
          ...enemyTeam,
          name: enemyTeam.enemy?.name,
        }
      }))
    }
  }, [enemyTeamList]);
  
  useEffect(() => {
    if (id) getEnemyTeamList(Number(id))
  }, [id]);
  
  return (
    <div className='main__block block_column align-start p_40 w_100p'>
      <h3 className='mb_30'>Список противников в команде</h3>
      
      <Table rows={ filterList } columns={ EnemyTeamColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ `${ pathRoutes.enemy.team_enemy_create }/${ id }` }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default EnemyTeamList;