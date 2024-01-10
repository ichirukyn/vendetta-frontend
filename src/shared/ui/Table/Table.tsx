import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'

import { tableStyle, tableStyleType } from '@/shared/ui/Table/Table.style'

export interface ITableProps {
  rows: any[]
  columns: GridColDef[]
  style?: tableStyleType
  columnVisibilityModel?: Record<string, boolean>
  hideFooter?: boolean
}

const Table: FC<ITableProps> = (
  {
    rows,
    columns,
    style,
    columnVisibilityModel,
    hideFooter = false
  }
) => {
  return (
    <>
      <DataGrid
        className="w_100p"
        rows={ rows }
        autoHeight={ true }
        columns={ columns }
        disableColumnMenu={ true }
        disableRowSelectionOnClick={ true }
        checkboxSelection={ false }
        initialState={ {
          columns: {
            columnVisibilityModel
          }
        } }
        getRowClassName={ (params) => {
          if (Number(params.id) / 2 === 0) {
            return 'DataGrid-Even'
          } else {
            return ''
          }
        } }
        hideFooter={ hideFooter }
        sx={ tableStyle({
          isHeader: style?.isHeader
        }) }
      />
    </>
  )
}

export default Table
