import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { GridColDef } from "@mui/x-data-grid";
import { FloorEnemyActions } from "@/widgets/Arena/ArenaFloor.menu";

export const ArenaColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.arena.floor }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'desc', minWidth: 180, flex: 1 },
  { field: 'chance_bonus', minWidth: 150 },
  { field: 'max_rate_drop', minWidth: 150 },
  { field: 'enemies_count', minWidth: 150 },
]


export const FloorEnemyColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  // {
  //   field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
  //     return <Link to={ `${ pathRoutes.arena.floor_edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
  //   }
  // },
  { field: 'name', minWidth: 180, flex: 1 },
  { field: 'rank', minWidth: 120 },
  { field: 'race_name', minWidth: 180 },
  { field: 'class_name', minWidth: 180 },
  { field: 'lvl', minWidth: 50, align: 'center', headerAlign: 'center' },
  { field: 'total_stats', minWidth: 90 },
  {
    field: 'menu', minWidth: 50, renderCell: (props) => {
      return <FloorEnemyActions props={ props }/>
    }
  }
]
