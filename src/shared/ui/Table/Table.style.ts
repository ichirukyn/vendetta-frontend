export type tableStyleType = {
  isHeader?: boolean
}

export const tableStyle = ({ isHeader = false }: tableStyleType) => {
  return {
    boxShadow: 2,
    border: 'none',
    borderColor: 'none',
    borderRadius: '15px',
    background: '#171716',
    
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main'
    },
    '& .MuiDataGrid-columnHeaders': {
      display: isHeader ? '' : 'none'
    },
    '& .MuiDataGrid-cell': {
      border: 'none'
    },
    '& .MuiDataGrid-footerContainer': {
      borderColor: 'rgb(224 224 224 / 5%)'
    }
  }
}
