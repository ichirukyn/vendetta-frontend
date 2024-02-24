import React, { FC } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useOpen, useOpenMenu } from "@/shared/hooks";
import { useArenaStore } from "@/shared/store/ArenaStore";
import { deleteArenaEnemy } from "@/shared/api/arena";

interface IFloorEnemyActionsProps {
  props: GridRenderCellParams<Date>;
}

export const FloorEnemyActions: FC<IFloorEnemyActionsProps> = ({ props }) => {
  const { open, anchorEl, menuClick, menuClose } = useOpenMenu();
  const { open: openForm, isOpen: isOpenForm, close: closeForm } = useOpen();
  
  const { floor, getArenaList } = useArenaStore()
  
  function Delete() {
    if (floor?.id && props.id) {
      deleteArenaEnemy(floor?.id, Number(props.id)).then(() => {
        getArenaList()
      })
    }
  }
  
  function Update() {
    openForm();
  }
  
  return (
    <div>
      <IconButton
        aria-label='more'
        id='basic-button'
        aria-controls={ open ? 'long-menu' : undefined }
        aria-expanded={ open ? 'true' : undefined }
        aria-haspopup='true'
        onClick={ menuClick }
      >
        <MoreVert/>
      </IconButton>
      <Menu
        id='menu'
        anchorEl={ anchorEl }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
        open={ open }
        onClose={ menuClose }
      >
        <MenuItem onClick={ Delete }>Удалить</MenuItem>
      </Menu>
    </div>
  );
};