import Webcam from 'react-webcam';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { detect } from 'src/api/authSlice';

const CameraCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);

  const capture = () => {
    const canvas = webcamRef.current.getCanvas();
    if (canvas) {
      canvas.toBlob((blob) => {
        const imageFile = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('image', imageFile);
        toast.promise(dispatch(detect(formData)), {
          pending: 'Processing your picture ...',
          success: 'Loged in successfullly !',
          error: 'an error has occured !',
        });
      }, 'image/jpeg');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center gap-3 mt-3">
      <div className="rounded-circle overflow-hidden" style={{ width: '300px', height: '300px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-circle"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <button type="button" onClick={capture} className="btn btn-dark">
        Scan Photo
      </button>
    </div>
  );
};

export default CameraCapture;
