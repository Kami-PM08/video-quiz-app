import React, { forwardRef, useImperativeHandle, useState } from "react";
// Componets
import { Box, Modal, Typography } from "@mui/material";

const DataViewModal = forwardRef(({ title, data }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          handleOpen();
        },
        close() {
          handleClose();
        },
      };
    },
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal className="grid-center" open={open} onClose={handleClose}>
      <Box className="grid-center modal-box">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" textAlign="justify">
          {data}
        </Typography>
      </Box>
    </Modal>
  );
});

export default DataViewModal;
