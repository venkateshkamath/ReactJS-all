import { useQuiz } from "./contexts/QuizProvider";

function Progress() {
  const { numQuestions, currentIndex, points, totalPoints } = useQuiz();

  return (
    <header className="progress">
      <progress value={currentIndex} max={numQuestions} />
      <p>
        Question <strong>{currentIndex + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
