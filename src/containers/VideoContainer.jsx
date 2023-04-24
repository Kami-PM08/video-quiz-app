import React, { useContext, useEffect, useRef, useState } from "react";
// Contants
import {
  RECORDING_INITIAL_TIME,
  RECORDING_LIMIT_MINUTES,
} from "../config/constants";
// Components
import { IconButton, Typography } from "@mui/material";
// Context
import { VideoQuizzesContext } from "../context/VideoQuizzesProvider";
// Icons
import {
  ChangeCircle,
  PlayCircle,
  RadioButtonChecked,
  StopCircle,
} from "@mui/icons-material";

const VideoContainer = ({ videoAnswerUrl, videoQuizIndex }) => {
  const { updateAnswer } = useContext(VideoQuizzesContext);

  const [recording, setRecording] = useState(false);
  const [muted, setMuted] = useState(true);
  const [timeRecording, setTimeRecording] = useState(RECORDING_INITIAL_TIME);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (videoAnswerUrl.length !== 0) {
      handleHasVideo(videoAnswerUrl);
    } else {
      handleNoHasVideo();
    }
  }, [videoQuizIndex]);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        if (timeRecording.seconds === 59) {
          setTimeRecording((prev) => ({
            minutes: prev.minutes + 1,
            seconds: 0,
          }));
        } else {
          setTimeRecording((prev) => ({
            ...prev,
            seconds: prev.seconds + 1,
          }));
        }

        if (timeRecording.minutes === RECORDING_LIMIT_MINUTES) {
          clearInterval(interval);
          handleStopRecording();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording, timeRecording]);

  const handleStartRecording = async () => {
    setMuted(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accediendo a los dispositivos del usuario: ", error);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    setTimeRecording(RECORDING_INITIAL_TIME);
  };

  const handleHasVideo = (videoURL) => {
    videoRef.current.srcObject = null;
    videoRef.current.src = videoURL;
    setMuted(false);
  };

  const handleNoHasVideo = () => {
    videoRef.current.srcObject = null;
    videoRef.current.src = null;
    setMuted(true);
  };

  const handleDataAvailable = (e) => {
    const videoBlob = new Blob([e.data], { type: "video/webm" });
    const videoURL = URL.createObjectURL(videoBlob);
    handleHasVideo(videoURL);
    updateAnswer(videoQuizIndex, videoURL, true);
  };

  return (
    <>
      <video ref={videoRef} playsInline autoPlay muted={muted} />
      {recording ? (
        <div className="video-controls">
          <IconButton onClick={handleStopRecording}>
            <StopCircle fontSize="large" />
          </IconButton>
          <div>
            <Typography variant="h6">
              {`${timeRecording.minutes}:${timeRecording.seconds
                .toString()
                .padStart(2, "0")}/${RECORDING_LIMIT_MINUTES}:00`}
            </Typography>
            <RadioButtonChecked className="recording" color="error" />
          </div>
        </div>
      ) : (
        <IconButton onClick={handleStartRecording}>
          {videoAnswerUrl.length === 0 ? (
            <PlayCircle fontSize="large" />
          ) : (
            <ChangeCircle fontSize="large" />
          )}
        </IconButton>
      )}
    </>
  );
};

export default VideoContainer;
