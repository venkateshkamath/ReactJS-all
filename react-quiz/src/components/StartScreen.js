import { useQuiz } from "./contexts/QuizProvider";

function StartScreen() {
  const { dispatch, numQuestions } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to React Quiz !</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
