import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from "@mui/material";

export interface IBranchModalProps {
  open: boolean,
  close: () => void,
  id: string,
}

const BranchModal: FC<IBranchModalProps> = ({open, close, id}) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle fontWeight={800} fontSize={24}>Талант {id}</DialogTitle>
      <DialogContent>
        <b className="text_eBold text_body">Стоимость:</b> 3
        <br/>
        <b className="text_eBold text_body">Бонусы:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. A debitis distinctio dolorum eaque facere
      </DialogContent>
      <DialogActions>
        <Button>Изучить</Button>
        <Button>Забыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BranchModal;