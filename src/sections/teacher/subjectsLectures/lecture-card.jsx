import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Link, Stack } from '@mui/material';

import route from 'src/routes';
import { getLectures, deleteLecture } from 'src/api/lecturesSlice';

import Iconify from 'src/components/iconify';

function LectureCard({ lecture, onUpdate }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    toast.promise(dispatch(deleteLecture(lecture)), {
      pending: 'Lecture is being deleted ...',
      success: 'Lecture is deleted !',
      error: 'An error occured !',
    });
    dispatch(getLectures(id));
  };

  return (
    <li>
      <Box className="path-container-content-details">
        <Box className="details-header">
          <Box
            className="details-header-left"
            onClick={() => navigate(route.teacher.lecture + lecture.id)}
          >
            <i className="fa-regular fa-file" />
            <Link
              color="inherit"
              variant="h5"
              underline="hover"
              sx={{
                overflow: 'hidden',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                textTransform: 'capitalize',
                fontWeight: 'medium',
              }}
            >
              {lecture.title}
            </Link>
          </Box>
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1.5}
            sx={{
              mt: 3,
              color: 'text.disabled',
            }}
          >
            <Box sx={{ cursor: 'pointer', transition: '200ms' }}>
              <Iconify
                width={26}
                icon="mdi:pencil-outline"
                sx={{
                  mr: 0.5,
                  ...{
                    '&:hover': {
                      color: 'black',
                    },
                  },
                }}
                onClick={() => onUpdate(lecture)}
              />
              <Iconify
                width={32}
                icon="bi:x"
                sx={{
                  mr: 0.5,
                  ...{
                    '&:hover': {
                      color: 'red',
                    },
                  },
                }}
                onClick={handleDelete}
              />
            </Box>
          </Stack>
          {/* <p className="details-header-right">Lorem, ipsum dolor.</p> */}
        </Box>
        <p className="path-container-content-details-info">{lecture.description}</p>
      </Box>
    </li>
  );
}

LectureCard.propTypes = {
  lecture: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

export default LectureCard;
