import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

import route from 'src/routes';
import { resetPassword } from 'src/api/adminSlice';
import { createPaymentCodeForStudent } from 'src/api/tutionSlice';
import {
  getStudents,
  deleteStudent,
  updateStudent,
  getStudentsInClass,
} from 'src/api/studentSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function StudentTableRow({ user, selected, handleClick }) {
  const { subject_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, student_id, name, email, avatarUrl, status } = user;
  const classes = useSelector((state) => state.class.data);
  const { t } = useTranslation();

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(0);
  const [amount, setAmount] = useState(null);
  const [studentData, setStudentData] = useState({
    id,
    student_id,
    name,
    email,
    status,
    avatarUrl,
    class_id: user.class?.id || 1,
  });

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleFeeForStudent = () => {
    setEdit(2);
    handleCloseMenu();
  };

  const handleEditRecord = () => {
    setEdit(1);
    handleCloseMenu();
  };

  const handleDeleteRecord = () => {
    toast.promise(dispatch(deleteStudent(user)), {
      pending: 'Student is being deleted ...',
      success: 'Student is deleted !',
      error: 'An Error Occured !',
    });

    if (subject_id) dispatch(getStudentsInClass(subject_id));
    else dispatch(getStudents());

    setStudentData({ ...studentData, status: false });
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    if (
      studentData.avatarUrl === avatarUrl &&
      studentData.name === name &&
      studentData.email === email &&
      studentData.class_id === user.class.id &&
      studentData.status === status
    ) {
      setEdit(0);
      return;
    }
    toast.promise(dispatch(updateStudent(studentData)), {
      pending: 'Student is being updated ...',
      success: 'Student is Updated !',
      error: 'An Error Occured !',
    });
    if (subject_id) dispatch(getStudentsInClass(subject_id));
    else dispatch(getStudents());
    setEdit(0);
  };

  const createCodeForStudent = () => {
    if (amount > 0)
      toast.promise(dispatch(createPaymentCodeForStudent({ id, amount })), {
        pending: 'Code is being generated ...',
        success: 'Code has been generated !',
        error: t('ErrorOccured'),
      });
    setEdit(0);
  };

  const reset = () => {
    toast.promise(dispatch(resetPassword(id)), {
      pending: 'Password is being reset ...',
      success: 'Password is reset successfully !',
      error: 'An Error Occured !',
    });
    setEdit(0);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl || `/assets/images/avatars/avatar_${id % 25}.jpg`} />
            {edit === 1 ? (
              <Box display="flex" gap="10px">
                <TextField
                  label="Name"
                  size="small"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  size="small"
                  value={studentData.email}
                  onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                />
              </Box>
            ) : (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`${route.admin.studentsId + id}`)}
              >
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
                <Typography variant="caption" noWrap>
                  {email}
                </Typography>
              </Box>
            )}
          </Stack>
        </TableCell>

        <TableCell>
          {edit === 1 ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="class-edit-select-label">{t('classes')}</InputLabel>
              <Select
                labelId="class-edit-select-label"
                id="class-edit-select"
                label="Class *"
                value={studentData.class_id}
                onChange={(e) => setStudentData({ ...studentData, class_id: e.target.value })}
              >
                {classes?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {`${item.grade} / ${item.class_number}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            `${user.class?.grade} / ${user.class?.class_number}` || (
              <Typography color="red">{t('notFound')}</Typography>
            )
          )}
        </TableCell>

        <TableCell>
          {edit === 1 && !status ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="status-edit-select-label">{t('status')}</InputLabel>
              <Select
                labelId="status-edit-select-label"
                id="status-edit-select"
                label="Status"
                value={studentData.status}
                onChange={(e) => setStudentData({ ...studentData, status: e.target.value })}
              >
                {[
                  { name: t('active'), value: 1 },
                  { name: t('banned'), value: 0 },
                ].map((statusData) => (
                  <MenuItem key={statusData.name} value={statusData.value}>
                    {statusData.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <>
              {edit === 2 ? (
                <TextField
                  label="Amount"
                  size="small"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              ) : (
                <Label color={status ? 'success' : 'error'}>
                  {status ? t('active') : t('banned')}
                </Label>
              )}
            </>
          )}
        </TableCell>

        <TableCell align="center">
          {edit !== 0 ? (
            <Box>
              {edit === 1 && (
                <Tooltip title={t('resetPassword')}>
                  <IconButton onClick={reset}>
                    <Iconify icon="solar:lock-linear" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t('discard')}>
                <IconButton onClick={() => setEdit(0)}>
                  <Iconify icon="bi:x" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('save')}>
                <IconButton onClick={edit === 1 ? saveEditedRecord : createCodeForStudent}>
                  <Iconify icon="mingcute:check-fill" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleFeeForStudent}>
          <Iconify icon="majesticons:money-plus-line" sx={{ mr: 2 }} />
          {t('createFee')}
        </MenuItem>

        <MenuItem onClick={handleEditRecord}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {t('edit')}
        </MenuItem>

        <MenuItem onClick={handleDeleteRecord} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {t('delete')}
        </MenuItem>
      </Popover>
    </>
  );
}

StudentTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
