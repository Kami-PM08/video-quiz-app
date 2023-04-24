import { UPDATE_ANSWER } from "./VideoQuizzesActionTypes";

export const VideoQuizzesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ANSWER:
      return state.map((videoQuiz, index) => {
        if (index == action.payload.videoQuizIndex) {
          return {
            ...videoQuiz,
            videoAnswerUrl: action.payload.videoAnswerUrl,
            hasAnswered: action.payload.hasAnswered,
          };
        }
        return videoQuiz;
      });

    default:
      return state;
  }
};
