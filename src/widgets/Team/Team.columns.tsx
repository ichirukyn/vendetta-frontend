import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { TeamActions } from "@/widgets/Team/Team.menu";

export const TeamColumn: GridColDef[] = [
  { field: 'id', minWidth: 60, maxWidth: 60 },
  {
    field: 'name', minWidth: 180, flex: 1, renderCell: ({ row, formattedValue }) => {
      return <Link to={ `${ pathRoutes.enemy.team }/${ row.id }` } className='td_underline'>{ formattedValue }</Link>
    }
  },
  {
    field: 'menu', minWidth: 50, renderCell: (props) => {
      return (<TeamActions props={ props }/>)
    }
  }
]