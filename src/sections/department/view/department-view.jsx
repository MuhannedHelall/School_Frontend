import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { getDepartments } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

import DepartmentCard from '../department-card';
import DepartmentSearch from '../department-search';
import DepartmentAddDialog from '../department-add-dialog';
import DepartmentUpdateDialog from '../department-update-dialog';

// ----------------------------------------------------------------------

export default function DepartmentView() {
  const dispatch = useDispatch();
  const depts = useSelector((state) => state.department);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateDeptData, setUpdateDeptData] = useState({});

  const handleClickOpenAdd = () => {
    setOpenAddDialog(true);
  };

  const handleClickOpenUpdate = (idValue, title) => {
    setUpdateDeptData({ ...updateDeptData, id: idValue, name: title });
    setOpenUpdateDialog(true);
  };

  useEffect(() => {
    if (depts.data.length < 1) dispatch(getDepartments());
  }, [dispatch, depts.data.length]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Departments</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpenAdd}
        >
          New Department
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <DepartmentSearch depts={depts.data} />
        <Tooltip title="Upload file">
          <IconButton component="label">
            <Iconify icon="solar:upload-outline" />
            <VisuallyHiddenInput type="file" />
          </IconButton>
        </Tooltip>
      </Stack>

      {depts.data.length < 1 && (
        <h1 style={{ textAlign: 'center', marginTop: '150px' }}>No Departments to show ...</h1>
      )}

      {depts.error && <h1 style={{ textAlign: 'center', marginTop: '150px' }}>{depts.error}</h1>}

      {depts.loading ? (
        <h1 style={{ textAlign: 'center', marginTop: '150px' }}>Loading ...</h1>
      ) : (
        <Grid container spacing={3}>
          {depts.data.map((dept) => (
            <DepartmentCard key={dept.id} dept={dept} onUpdate={handleClickOpenUpdate} />
          ))}
        </Grid>
      )}

      <DepartmentAddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
      <DepartmentUpdateDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        deptData={updateDeptData}
        setDeptData={setUpdateDeptData}
      />
    </Container>
  );
}
