import { Box, Button, CardMedia, Modal } from "@mui/material";
import React from "react";

interface IModalWindowProps {
  onClose?: () => void;
  onOpen?: () => void;
  open: boolean;
  image: string;
  title: string;
}

const ModalWindow: React.FC<IModalWindowProps> = ({
  onClose,
  open,
  image,
  title,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    color: "primary",
  };
  return (
    <Modal
      onClose={onClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box sx={{ maxWidth: "100%", display: "flex" }}>
            <CardMedia
              style={{ width: "100%", objectFit: "contain" }}
              height={400}
              component="img"
              image={image}
              alt={title}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="button"
              sx={{ width: "5%" }}
              color="inherit"
              variant="outlined"
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
