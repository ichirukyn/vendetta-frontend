import { GridColDef } from "@mui/x-data-grid";

export const HeroColumn: GridColDef[] = [
  { field: 'id', minWidth: 70, maxWidth: 70 },
  { field: 'name', minWidth: 180, flex: 1 },
  { field: 'race_id', minWidth: 180, flex: 1 },
  { field: 'class_id', minWidth: 180, flex: 1 },
  { field: 'rank', minWidth: 180, flex: 1 },
  { field: 'money', minWidth: 250 },
]