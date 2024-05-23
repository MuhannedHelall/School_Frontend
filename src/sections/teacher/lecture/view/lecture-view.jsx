import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getLecture } from 'src/api/lecturesSlice';

import { routeBackToSubjects } from 'src/sections/teacher/subjectsLectures/view/subject-lectures-view';

function LectureView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const lecture = useSelector((state) => state.lectures.data);
  const user = useSelector((state) => state.auth.data);
  const { role } = user;

  useEffect(() => {
    dispatch(getLecture(id));
  }, [dispatch, id]);

  return (
    <>
      <Link to={routeBackToSubjects(role)}>go back</Link>
      <div className="text-center">
        <h1>{lecture?.title}</h1>
        <iframe
          title={lecture?.title}
          width="820"
          height="415"
          src={lecture?.url}
          allowFullScreen
        />
        <h1>{lecture?.description}</h1>
      </div>
    </>
  );
}

export default LectureView;
