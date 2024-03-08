import { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TechniqueBranchType } from "@/shared/types";
import { deleteBranchTechnique, fetchOneBranchTechnique } from "@/shared/api/technique";
import { Roles } from "@/shared/enums";
import { toast } from "react-toastify";
import { useTechniqueBranchStore } from "@/shared/store/Technique/TechniqueBranchStore";

export interface IBranchModalProps {
  open: boolean,
  close: () => void,
  id: number,
}

const BranchModal: FC<IBranchModalProps> = ({ open, close, id }) => {
  const [techniqueBranch, setTechniqueBranch] = useState<TechniqueBranchType | undefined>()
  
  const { getTechniqueBranchList } = useTechniqueBranchStore()
  
  // TODO: Change to user roles
  const roles = [Roles.Admin]
  
  useEffect(() => {
    if (!id) return
    
    fetchOneBranchTechnique(id).then((res) => {
      if (res.data) setTechniqueBranch(res.data)
    })
  }, [id]);
  
  const deleteBranch = () => {
    if (!techniqueBranch?.id) return
    
    deleteBranchTechnique(techniqueBranch.id).then(() => {
      toast('Техника удалена из веток', { type: 'success' })
      getTechniqueBranchList()
      close()
    })
  }
  
  return (
    <Dialog open={ open } onClose={ close }>
      <DialogTitle fontWeight={ 800 } fontSize={ 24 } width={ 320 }>{ techniqueBranch?.technique?.name }</DialogTitle>
      <DialogContent>
        { techniqueBranch?.technique?.desc }
      </DialogContent>
      <DialogActions>
        { roles?.find((role) => role === Roles.Admin) && (
          <Button onClick={ deleteBranch }>Удалить</Button>
        ) }
        { roles?.find((role) => role === Roles.Gamer) && (
          <Button>Закрепить</Button>
        ) }
      </DialogActions>
    </Dialog>
  );
};

export default BranchModal;