import { FC } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { ReactComponent as MoreVert } from '@/shared/assets/icons/MoreVert.svg'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useOpenMenu } from '@/shared/hooks'
import { useArenaEnemyQuery } from '@/entities'

interface IFloorEnemyActionsProps {
  props: GridRenderCellParams<Date>
}

export const FloorEnemyActions: FC<IFloorEnemyActionsProps> = ({ props }) => {
  const { open, anchorEl, menuClick, menuClose } = useOpenMenu()
  // const { open: openForm } = useOpen()

  const { ArenaEnemyDeleteQuery } = useArenaEnemyQuery()

  function Delete() {
    if (props.id) {
      ArenaEnemyDeleteQuery.mutate({ second_id: Number(props.id) })
    }
  }

  // function Update() {
  //   openForm()
  // }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={menuClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        open={open}
        onClose={menuClose}
      >
        <MenuItem onClick={Delete}>Удалить</MenuItem>
      </Menu>
    </div>
  )
}
