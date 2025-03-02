import { useQuiz } from "./contexts/QuizProvider";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer != null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : null} ${
              hasAnswered &&
              (index === question.correctOption ? "correct" : "wrong")
            }`}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
