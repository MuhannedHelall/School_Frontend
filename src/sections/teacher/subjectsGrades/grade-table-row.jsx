import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
// import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import FormControl from '@mui/material/FormControl';

import { getGrades, deleteGrade, updateGrade } from 'src/api/gradeSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function GradeTableRow({ user, selected, handleClick }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { grades, student, subject, classroom } = user;

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);
  const [studentData, setStudentData] = useState({
    id: grades.id,
    student_id: student.student_id,
    subject_id: subject.id,
    midterm: grades.midterm,
    final: grades.final,
    attendance: grades.attendance,
    behavior: grades.behavior,
    total: grades.total,
  });

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditRecord = () => {
    setEdit(true);
    handleCloseMenu();
  };

  const handleDeleteRecord = () => {
    toast.promise(dispatch(deleteGrade(grades)), {
      pending: 'Student Grade is being deleted ...',
      success: 'Student Grade is deleted !',
      error: 'An Error Occured !',
    });
    dispatch(getGrades(id));
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    toast.promise(dispatch(updateGrade(studentData)), {
      pending: 'Student Grade is being updated ...',
      success: 'Student Grade is updated !',
      error: 'An Error Occured !',
    });
    dispatch(getGrades(id));
    setEdit(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={student.name}
              src={student?.avatarUrl || `/assets/images/avatars/avatar_${student.id % 25}.jpg`}
            />
            <Box>
              <Typography variant="subtitle2" noWrap>
                {student.name}
              </Typography>
              <Typography variant="caption" noWrap>
                {student.email}
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          {classroom ? (
            <Label color="success">{`${classroom.grade}/${classroom.class_number}`}</Label>
          ) : (
            <Label color="">Not Found</Label>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Midterm"
              size="small"
              type="number"
              value={studentData.midterm}
              onChange={(e) => setStudentData({ ...studentData, midterm: e.target.value })}
            />
          ) : (
            grades.midterm || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Final"
              size="small"
              type="number"
              value={studentData.final}
              onChange={(e) => setStudentData({ ...studentData, final: e.target.value })}
            />
          ) : (
            grades.final || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Behavior"
              size="small"
              type="number"
              value={studentData.behavior}
              onChange={(e) => setStudentData({ ...studentData, behavior: e.target.value })}
            />
          ) : (
            grades.behavior || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Attendance"
              size="small"
              type="number"
              value={studentData.attendance}
              onChange={(e) => setStudentData({ ...studentData, attendance: e.target.value })}
            />
          ) : (
            grades.attendance || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Total"
              size="small"
              type="number"
              value={studentData.total}
              onChange={(e) => setStudentData({ ...studentData, total: e.target.value })}
            />
          ) : (
            grades.total || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <Box>
              <Tooltip title="Discard">
                <IconButton onClick={() => setEdit(false)}>
                  <Iconify icon="bi:x" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save">
                <IconButton onClick={saveEditedRecord}>
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
        <MenuItem onClick={handleEditRecord}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteRecord} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

GradeTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
