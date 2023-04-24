// Components
import { Routes, Route, Navigate } from "react-router-dom";
// Layout
import Layout from "../layout/Layout";
// Pages
import VideoQuizzes from "../pages/VideoQuizzes";
import VideoQuiz from "../pages/VideoQuiz";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/video-quizzes" replace />} />
        <Route path="video-quizzes">
          <Route index element={<VideoQuizzes />} />
          <Route path=":videoQuizIndex" element={<VideoQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
