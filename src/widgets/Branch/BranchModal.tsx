import { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TechniqueType } from "@/shared/types";
import { fetchOneTechnique } from "@/shared/api/technique";

export interface IBranchModalProps {
  open: boolean,
  close: () => void,
  id: number,
}

const BranchModal: FC<IBranchModalProps> = ({ open, close, id }) => {
  const [technique, setTechnique] = useState<TechniqueType | undefined>()
  
  useEffect(() => {
    if (!id) return
    fetchOneTechnique(id).then((res) => {
      if (res.data) setTechnique(res.data)
    })
  }, [id]);
  
  return (
    <Dialog open={ open } onClose={ close }>
      <DialogTitle fontWeight={ 800 } fontSize={ 24 } width={ 320 }>{ technique?.name }</DialogTitle>
      <DialogContent>
        { technique?.desc }
      </DialogContent>
      <DialogActions>
        <Button>Изучить</Button>
        <Button>Забыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BranchModal;