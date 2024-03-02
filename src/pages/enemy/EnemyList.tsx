import { FC, useEffect, useState } from 'react';
import { EnemyType } from '@/shared/types';
import Table from '@/shared/ui/Table/Table';
import { Link } from 'react-router-dom';
import { pathRoutes } from '@/app';
import { EnemyColumn } from '@/widgets/Enemy';
import { useEnemyStore } from '@/shared/store/EnemyStore';
import { Tab, Tabs } from "@mui/material";
import { useTeamStore } from "@/shared/store/TeamStore";
import { useEnemyTabStore } from "@/shared/store/Enemy/TabStore";
import { TeamColumn } from "@/widgets/Team/Team.columns";

type EnemyListType = {
  race_name?: string,
  class_name?: string,
  lvl?: number,
  total_stats?: number,
} & EnemyType

function a11yProps(index: number) {
  return {
    id: `tab-${ index }`,
    'aria-controls': `tab-panel-${ index }`,
  };
}

const EnemyList: FC = () => {
  const [filterList, setFilterList] = useState<EnemyListType[]>([])
  const { enemyList } = useEnemyStore()
  const { teamList } = useTeamStore()
  const { tabIndex, setTabIndex } = useEnemyTabStore()
  
  useEffect(() => {
    if (enemyList.length) {
      const data = enemyList.map((enemy) => {
        return {
          ...enemy,
          race_name: enemy.race.name,
          class_name: enemy.class.name,
          lvl: enemy.stats?.lvl || 0,
          total_stats: enemy.stats?.total_stats || 0,
        }
      })
      setFilterList(data as EnemyListType[])
    }
  }, [enemyList]);
  
  return (
    <div className='main__block block_column align-start p_40 w_100p'>
      <h3 className='mb_30'>Список противников</h3>
      
      <div className="w_100p">
        <Tabs scrollButtons allowScrollButtonsMobile variant="scrollable" value={ tabIndex } onChange={ (_, val) => setTabIndex(val) }
              aria-label="tab">
          <Tab label="Противники" { ...a11yProps(0) } />
          <Tab label="Команды" { ...a11yProps(1) } />
        </Tabs>
      </div>
      
      { tabIndex === 0 && (
        <>
          <Table rows={ filterList } columns={ EnemyColumn } style={ { isHeader: true } }/>
          <div className="block_row justify-end w_100p mt_10">
            <Link to={ pathRoutes.enemy.create }>
              <button className='button'>Создать</button>
            </Link>
          </div>
        </>
      ) }
      
      { tabIndex === 1 && (
        <>
          <Table rows={ teamList } columns={ TeamColumn } style={ { isHeader: true } }/>
          
          <div className="block_row justify-end w_100p mt_10">
            <Link to={ pathRoutes.enemy.team_create }>
              <button className='button'>Создать</button>
            </Link>
          </div>
        </>
      ) }
    </div>
  );
};

export default EnemyList;