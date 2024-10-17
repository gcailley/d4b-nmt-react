import { Ref, useCallback, useRef, useState } from "react"; // import useRef
import Webcam from "react-webcam";

const CustomWebcam = () => {
  const webcamRef: Ref<Webcam> = useRef(null); // create a webcam reference

  const [imgSrc, setImgSrc] = useState<string | null>(null); // initialize it
  // create a capture function
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc: string | null = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
