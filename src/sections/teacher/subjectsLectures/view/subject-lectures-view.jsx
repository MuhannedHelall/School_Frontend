import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Box, Stack, Button, Tooltip, Container, Typography, IconButton } from '@mui/material';

import route from 'src/routes';
import { getLectures } from 'src/api/lecturesSlice';

import Iconify from 'src/components/iconify';

import { Loader } from 'src/sections/loader';
import FileUploadDialog from 'src/sections/file-upload/fileUpload-dialog';

import './style.css';
import LectureCard from '../lecture-card';
import LectureDialog from '../lecture-dialog';

function SubjectLecturesView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lectures = useSelector((state) => state.lectures);
  const user = useSelector((state) => state.auth.data);

  const subject = user.subject?.find((sub) => sub.id === +id);

  const [dropDown, setDropDown] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const handleOpenUpdate = (item) => {
    setUpdateData({ ...updateData, ...item });
    setOpenDialog(true);
  };

  const onUpload = (file) => {
    console.log(file);
  };
  const onDownload = () => {
    alert('file is downloaded');
  };

  useEffect(() => {
    dispatch(getLectures(id));
    if (!subject?.name) navigate(route.notFound);
  }, [dispatch, id, subject?.name, navigate]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Link to={route.teacher.subjects}>go back</Link>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setUpdateData(null);
            setOpenDialog(true);
          }}
        >
          New Lecture
        </Button>
      </Stack>

      <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h2">{subject?.name}</Typography>
        <Tooltip title="Upload file">
          <IconButton component="label" onClick={() => setOpenUpload(true)}>
            <Iconify icon="solar:upload-outline" />
          </IconButton>
        </Tooltip>
      </Stack>

      {lectures.data.length > 0 && <Box className="horizontal-line" />}

      <Box className="path-container">
        {lectures.data.length > 0 && (
          <Box className="path-container-header">
            <button type="button" className="r">
              <i className="fa-solid fa-check" />
            </button>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'medium' }}
              onClick={() => setDropDown((prev) => !prev)}
            >
              Way to go! Total lectures {lectures.data.length}
              <i className={`fa-solid fa-caret-${dropDown ? 'down' : 'up'} mx-2 cursor-pointer`} />
            </Typography>
          </Box>
        )}
        <Box className="path-container-content">
          <ul>
            {lectures.loading ? (
              //   <h1 style={{ textAlign: 'center', marginTop: '150px' }}>Loading ...</h1>
              <Loader />
            ) : (
              <>
                {lectures.data.length < 1 ? (
                  <h1 style={{ textAlign: 'center', marginTop: '150px' }}>
                    No lectures to show ...
                  </h1>
                ) : (
                  dropDown &&
                  lectures.data.length > 0 &&
                  lectures.data?.map((lecture) => (
                    <LectureCard
                      key={lecture.title}
                      lecture={lecture}
                      onUpdate={handleOpenUpdate}
                    />
                  ))
                )}
              </>
            )}
          </ul>
        </Box>
      </Box>

      <LectureDialog
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

export default SubjectLecturesView;
