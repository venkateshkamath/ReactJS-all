import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  console.log(step);
  const handlePrevious = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((open) => open)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">{`Step ${step}: ${messages[step - 1]}`}</p>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ color: "white", background: "#7950f2" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ color: "white", background: "#7950f2" }}
            >
              Next
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
