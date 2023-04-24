import React, { useContext, useEffect, useRef, useState } from "react";
// Components
import { Button, Grid, Typography } from "@mui/material";
import VideoCard from "../components/VideoCard";
import DataViewModal from "../components/DataViewModal";
// Context
import { VideoQuizzesContext } from "../context/VideoQuizzesProvider";

const VideoQuizzes = () => {
  const { videoQuizzes } = useContext(VideoQuizzesContext);

  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    if (
      videoQuizzes.filter((videoQuiz) => videoQuiz.hasAnswered).length ===
      videoQuizzes.length
    ) {
      handleCompleteQuizzes();
      setDisabled(false);
    }
  }, [videoQuizzes]);

  const handleCompleteQuizzes = () => {
    const videoAnswers = videoQuizzes.map((video) => ({
      videoQuizId: video.id,
      videoAnswerUrl: video.videoAnswerUrl,
      userId: "currentUserId",
    }));
    setData({ videoAnswers });
  };

  const handleSubmit = () => {
    modalRef.current.open();
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h1" textAlign="center" mb={10}>
          Video Cuestionario
        </Typography>
      </Grid>
      <Grid item container xs={10} justifyContent="space-around">
        {videoQuizzes.map((videoQuiz, index) => (
          <Grid key={`video-quiz-${index}`} item xs={2}>
            <VideoCard videoQuiz={videoQuiz} videoQuizIndex={index} preview />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={3} mt={5}>
        <Button
          fullWidth
          disabled={disabled}
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </Grid>
      <DataViewModal
        ref={modalRef}
        title="Estructura de envío"
        data={JSON.stringify(data, null, 2)}
      />
    </>
  );
};

export default VideoQuizzes;
