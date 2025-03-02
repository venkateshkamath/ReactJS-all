import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import { useQuiz } from "./contexts/QuizProvider";

export default function App() {
  const { dispatch, status } = useQuiz();

  async function getQuestions() {
    try {
      const resp = await fetch("http://localhost:8000/questions");
      const data = await resp.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (e) {
      dispatch({ type: "dataFailed" });
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton  />
          </>
        )}
      </Main>
    </div>
  );
}
