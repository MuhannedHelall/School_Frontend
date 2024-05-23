import Webcam from 'react-webcam';
import React, { useRef } from 'react';

const CameraCapture = () => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the image, like sending it to a server or processing it.
    console.log(imageSrc);
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
        Capture Photo
      </button>
    </div>
  );
};

export default CameraCapture;
