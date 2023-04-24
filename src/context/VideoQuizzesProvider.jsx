import { createContext, useReducer } from "react";
import { VideoQuizzesReducer } from "./VideoQuizzesReducer";
// Constants
import { VIDEO_QUIZZES_INITIAL_STATE } from "../config/constants";
import { UPDATE_ANSWER } from "./VideoQuizzesActionTypes";

export const VideoQuizzesContext = createContext({});

const VideoQuizzesProvider = ({ children }) => {
  const [videoQuizzes, dispatch] = useReducer(
    VideoQuizzesReducer,
    VIDEO_QUIZZES_INITIAL_STATE
  );

  const updateAnswer = (videoQuizIndex, videoAnswerUrl, hasAnswered) => {
    dispatch({
      type: UPDATE_ANSWER,
      payload: { videoQuizIndex, videoAnswerUrl, hasAnswered },
    });
  };

  return (
    <VideoQuizzesContext.Provider
      value={{
        videoQuizzes,
        updateAnswer,
      }}
    >
      {children}
    </VideoQuizzesContext.Provider>
  );
};

export default VideoQuizzesProvider;
