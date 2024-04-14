// import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import { Loader } from 'src/sections/loader';
import FileUploadDialog from 'src/sections/file-upload/fileUpload-dialog';

import CardSearch from '../card-search';

// ----------------------------------------------------------------------

export default function CardView({ title, items, onUpload, onDownload, Card, CardDialog }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const handleOpenUpdate = (item) => {
    setUpdateData({ ...updateData, ...item });
    setOpenDialog(true);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title}</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setUpdateData(null);
            setOpenDialog(true);
          }}
        >
          New {title.slice(0, title.length - 1)}
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <CardSearch items={items.data} />
        <Tooltip title="Upload file">
          <IconButton component="label" onClick={() => setOpenUpload(true)}>
            <Iconify icon="solar:upload-outline" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* {items.error && <h1 style={{ textAlign: 'center' }}>{items.error}</h1>} */}
      {items.loading ? (
        // <h1 style={{ textAlign: 'center', marginTop: '150px' }}>Loading ...</h1>
        <Loader />
      ) : (
        <div>
          {items.data.length < 1 ? (
            <h1 style={{ textAlign: 'center', marginTop: '150px' }}>No {title} to show ...</h1>
          ) : (
            <Grid container spacing={3}>
              {items.data.map((item) => (
                <Card key={item.id} item={item} onUpdate={handleOpenUpdate} />
              ))}
            </Grid>
          )}
        </div>
      )}

      <CardDialog
        open={openDialog}
        setOpen={setOpenDialog}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />

      <FileUploadDialog
        open={openUpload}
        setOpen={setOpenUpload}
        onUpload={(file) => {
          onUpload(file);
          setOpenUpload(false);
        }}
        onDownload={onDownload}
      />
    </Container>
  );
}

CardView.propTypes = {
  title: PropTypes.any,
  items: PropTypes.any,
  onUpload: PropTypes.func,
  onDownload: PropTypes.func,
  Card: PropTypes.any,
  CardDialog: PropTypes.any,
};
