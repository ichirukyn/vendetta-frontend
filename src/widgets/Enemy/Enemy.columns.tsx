import { Link } from 'react-router-dom';
import { pathRoutes } from '@/app';
import { GridColDef } from '@mui/x-data-grid';
import { EnemyActions } from '@/widgets/Enemy/Enemy.menu';
import { EnemyTeamActions } from "@/widgets";

export const EnemyColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.enemy.edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'rank', minWidth: 120 },
  { field: 'race_name', minWidth: 180 },
  { field: 'class_name', minWidth: 180 },
  { field: 'lvl', minWidth: 50, align: 'center', headerAlign: 'center' },
  { field: 'total_stats', minWidth: 90 },
  {
    field: 'menu', minWidth: 50, renderCell: (props) => {
      return (<EnemyActions props={ props }/>)
    }
  }
]

export const EnemyTeamColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.enemy.edit }/${ row?.enemy_id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'team_id', minWidth: 50 },
  { field: 'is_leader', minWidth: 50 },
  { field: 'prefix', minWidth: 180 },
  {
    field: 'menu', minWidth: 50, renderCell: (props) => {
      return (<EnemyTeamActions props={ props }/>)
    }
  }
]