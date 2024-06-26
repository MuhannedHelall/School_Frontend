// import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

export default function CardView({
  title,
  items,
  onUpload,
  onDownload,
  Card,
  CardDialog,
  CardSecondDialog = () => null,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState({ state: false, delete: false });
  const [openUpload, setOpenUpload] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [secondDialogData, setSecondDialogData] = useState(null);
  const { t } = useTranslation();

  const handleOpenUpdate = (item) => {
    setUpdateData({ ...updateData, ...item });
    setOpenDialog(true);
  };

  const handleAttach = (item) => {
    setSecondDialogData({ ...secondDialogData, ...item });
    setOpenSecondDialog({ state: true, delete: false });
  };

  const handleDetach = (item) => {
    setSecondDialogData({ ...secondDialogData, ...item });
    setOpenSecondDialog({ state: true, delete: true });
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
          {t('new')}
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <CardSearch items={items.data} />
        <Tooltip title={t('uploadFile')}>
          <IconButton component="label" onClick={() => setOpenUpload(true)}>
            <Iconify icon="solar:upload-outline" />
          </IconButton>
        </Tooltip>
      </Stack>

      {items.loading ? (
        <Loader />
      ) : (
        <div>
          {items.data.length < 1 ? (
            <h1 style={{ textAlign: 'center', marginTop: '150px' }}>
              {t('no')} {title} {t('toShow')} ...
            </h1>
          ) : (
            <Grid container spacing={3}>
              {items.data.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onUpdate={handleOpenUpdate}
                  onAttach={handleAttach}
                  onDetach={handleDetach}
                />
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

      <CardSecondDialog
        open={openSecondDialog}
        setOpen={setOpenSecondDialog}
        data={secondDialogData}
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
  CardSecondDialog: PropTypes.any,
};
