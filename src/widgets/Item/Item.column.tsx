import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { GridColDef } from "@mui/x-data-grid";

export const ItemColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.item.edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'desc', minWidth: 180, flex: 1 },
  { field: 'value', minWidth: 50 },
  { field: 'type', minWidth: 140 },
  { field: 'modify', minWidth: 100 },
  { field: 'class_type', minWidth: 80 },
  { field: 'class_id', minWidth: 50 },
  { field: 'race_id', minWidth: 50 },
]