import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  //loading, ready, active, finished, error
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.currentIndex);

      return {
        ...state,
        answer: action.payload,

        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    default:
      throw new Error("Unknown type");
  }
}

const QuizProvider = ({ children }) => {
  const [{ points, questions, status, currentIndex, answer }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;

  const totalPoints = questions.reduce((acc, curr) => {
    acc = acc + curr.points;
    return acc;
  }, 0);
  return (
    <QuizContext.Provider
      value={{
        points,
        questions,
        status,
        currentIndex,
        answer,
        totalPoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("Wrong usage of context");
  else return context;
};

export { useQuiz, QuizProvider };
