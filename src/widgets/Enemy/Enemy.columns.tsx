import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { GridColDef } from "@mui/x-data-grid";

export const EnemyColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.enemy.edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'rank', minWidth: 120 },
  { field: 'class_id', minWidth: 50 },
  { field: 'race_id', minWidth: 50 },
]