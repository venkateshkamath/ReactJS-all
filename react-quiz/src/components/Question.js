import React from "react";
import Options from "./Options";
import { useQuiz } from "./contexts/QuizProvider";
const Question = () => {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
