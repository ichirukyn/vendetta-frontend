import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";

export const SpellColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.spell.edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'desc_short', minWidth: 180, flex: 1 },
  { field: 'damage', minWidth: 50 },
  { field: 'type_damage', minWidth: 140 },
  { field: 'distance', minWidth: 100 },
  { field: 'is_stack', minWidth: 80 },
  { field: 'class_id', minWidth: 50 },
  { field: 'race_id', minWidth: 50 },
  { field: 'type', minWidth: 100 },
  { field: 'cooldown', minWidth: 50 },
]