import { Button, Modal } from "@mui/material";
import { StyledModal } from './Modal.styled';

interface IModalWindowProps {
  open: boolean;
  handleClose: () => void;
  text: string;
}

export const NotificationModal = ({ open, handleClose, text }: IModalWindowProps) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <StyledModal>
      <p id="child-modal-description">{text}</p>
      <Button variant='text' onClick={handleClose}>Ok</Button>
    </StyledModal>
  </Modal >
)