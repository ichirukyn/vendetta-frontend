import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";

export const EventColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.event.edit }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  { field: 'desc', minWidth: 180, flex: 1 },
  { field: 'text', minWidth: 180, flex: 1 },
  { field: 'type', minWidth: 120 },
]