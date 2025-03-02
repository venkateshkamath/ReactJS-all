import { useQuiz } from "./contexts/QuizProvider";

function NextButton() {
  const { dispatch, answer } = useQuiz();
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
