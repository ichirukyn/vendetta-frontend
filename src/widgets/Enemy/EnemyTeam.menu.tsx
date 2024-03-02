import React, { FC } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useOpenMenu } from '@/shared/hooks';
import { useEnemyTeamStore } from "@/shared/store/Enemy";
import { deleteTeamEnemy } from "@/shared/api/team";
import { useParams } from "react-router-dom";

interface IFloorEnemyActionsProps {
  props: GridRenderCellParams<Date>;
}

export const EnemyTeamActions: FC<IFloorEnemyActionsProps> = ({ props }) => {
  const { open, anchorEl, menuClick, menuClose } = useOpenMenu();
  const { getEnemyTeamList } = useEnemyTeamStore()
  const { id } = useParams()
  
  function Delete() {
    if (props.id && id) {
      deleteTeamEnemy(Number(props.id), Number(id)).then(() => {
        menuClose()
        getEnemyTeamList(Number(id))
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