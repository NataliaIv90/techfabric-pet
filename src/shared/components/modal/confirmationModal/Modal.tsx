import { Button, CircularProgress, Modal } from "@mui/material";
import { StyledBtnContainer, StyledModal, StyledModalTitle } from './Modal.styled';

interface IModalWindowProps {
  open: boolean;
  handleClose: () => void;
  confirmDeleting: (id: string) => void;
  text: string;
  title: string;
  id?: string | null;
  isLoading: boolean;
}

export const ConfirmationModal = ({ open, handleClose, text, title, confirmDeleting, id, isLoading }: IModalWindowProps) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <StyledModal>
      <StyledModalTitle id="child-modal-title">{title}</StyledModalTitle>
      <p id="child-modal-description">
        {text}
      </p>
      <StyledBtnContainer>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        {isLoading
          ? <CircularProgress />
          : <Button
            disabled={isLoading}
            onClick={() => {
              if (id) {
                confirmDeleting(id)
              }
            }}>Confirm</Button>
        }
      </StyledBtnContainer>
    </StyledModal>
  </Modal >
)