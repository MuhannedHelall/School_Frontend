import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useCallback } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Paper, Button, Typography, IconButton } from '@mui/material';

export default function FileUploadDialog({ open, setOpen, onUpload, onDownload }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const fd = new FormData();
        fd.append('file', event.dataTransfer.files[0]);
        onUpload(fd);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        onUpload(fd);
      }
    },
    [onUpload]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <Paper
          variant="outlined"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
            padding: 20,
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? '#eee' : '#fafafa',
          }}
        >
          <label htmlFor="uploadField" style={{ cursor: 'pointer' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <Icon icon="ep:upload-filled" style={{ fontSize: 60 }} />
              </IconButton>
              <Typography>Drag and drop your file here or click to select the file.</Typography>
            </Box>
            <input
              style={{ display: 'none' }}
              id="uploadField"
              type="file"
              onChange={handleChange}
            />
          </label>
        </Paper>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={onDownload}>
            Download Sample File
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

FileUploadDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  onUpload: PropTypes.func,
  onDownload: PropTypes.func,
};
