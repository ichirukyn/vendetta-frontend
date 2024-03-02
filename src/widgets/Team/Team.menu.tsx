import React, { FC } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useOpenMenu } from '@/shared/hooks';
import { deleteTeam } from "@/shared/api/team";
import { useTeamStore } from "@/shared/store/TeamStore";

interface IFloorEnemyActionsProps {
  props: GridRenderCellParams<Date>;
}

export const TeamActions: FC<IFloorEnemyActionsProps> = ({ props }) => {
  const { open, anchorEl, menuClick, menuClose } = useOpenMenu();
  const { getTeamList } = useTeamStore()
  
  function Delete() {
    if (props.id) {
      deleteTeam(Number(props.id)).then(() => {
        menuClose()
        getTeamList()
      })
    }
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