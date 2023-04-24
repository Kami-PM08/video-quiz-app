import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";
import VideoContainer from "../containers/VideoContainer";

const VideoCard = ({ preview, videoQuiz, videoQuizIndex }) => {
  const navigate = useNavigate();
  return (
    <Card className="video-card">
      <CardHeader
        title={videoQuiz.ask}
        subheader={videoQuiz.hasAnswered ? "Respondido" : "Pendiente"}
      />
      <CardMedia>
        {preview ? (
          <video />
        ) : (
          <VideoContainer
            videoQuizIndex={videoQuizIndex}
            videoAnswerUrl={videoQuiz.videoAnswerUrl}
          />
        )}
      </CardMedia>
      {preview && (
        <CardActions>
          <Button
            variant="contained"
            onClick={() => navigate(`/video-quizzes/${videoQuizIndex}`)}
          >
            Responder
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default VideoCard;
