import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Components
import { Button, Grid } from "@mui/material";
import VideoCard from "../components/VideoCard";
// Context
import { VideoQuizzesContext } from "../context/VideoQuizzesProvider";

const VideoQuiz = () => {
  const { videoQuizIndex } = useParams();
  const { videoQuizzes } = useContext(VideoQuizzesContext);
  const navigate = useNavigate();

  const [nextVideoQuizIndex, setNextVideoQuizIndex] = useState(-1);

  useEffect(() => {
    const nextUnansweredQuizIndex = getUnansweredNextVideoQuizIndex();
    setNextVideoQuizIndex(nextUnansweredQuizIndex);
  }, [videoQuizzes, videoQuizIndex]);

  const getUnansweredNextVideoQuizIndex = () => {
    let firstUnansweredQuizIndex = -1;
    let nextUnansweredQuizIndex = -1;
    for (let index = 0; index < videoQuizzes.length; index++) {
      if (!videoQuizzes[index].hasAnswered) {
        if (videoQuizzes.length - 1 == videoQuizIndex) {
          return index;
        }
        if (index <= videoQuizIndex) {
          if (firstUnansweredQuizIndex === -1) {
            firstUnansweredQuizIndex = index;
          }
          nextUnansweredQuizIndex = index;
        } else {
          return index;
        }
      }
    }
    if (
      firstUnansweredQuizIndex !== -1 &&
      nextUnansweredQuizIndex == videoQuizIndex
    ) {
      return firstUnansweredQuizIndex;
    }
    return nextUnansweredQuizIndex;
  };

  const handleReturn = () => {
    navigate("/video-quizzes");
  };

  const handleNext = () => {
    navigate(`/video-quizzes/${nextVideoQuizIndex}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Grid container item xs={8}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleReturn}>
          Volver
        </Button>
      </Grid>
      <Grid item xs={12} my={2}>
        <VideoCard
          videoQuiz={videoQuizzes[videoQuizIndex]}
          videoQuizIndex={videoQuizIndex}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleBack}>
          Atrás
        </Button>
        {nextVideoQuizIndex === -1 || nextVideoQuizIndex == videoQuizIndex ? (
          <Button
            variant="contained"
            onClick={handleReturn}
            disabled={!videoQuizzes[videoQuizIndex].hasAnswered}
          >
            Terminar
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Siguiente
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default VideoQuiz;
