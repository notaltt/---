import { useState, useEffect } from "react";
import "./App.css";

const textArray = [
  "I didn't get a chance last time...",
  "but...",
  "Yana, would you be my Valentine?"
];

function App() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [locked, setLocked] = useState(false);

  const isLastText = textIndex === textArray.length - 1;

  useEffect(() => {
    if (!isTyping) return;

    const text = textArray[textIndex];
    if (!text) return;

    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 120);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);

      if (isLastText) {
        setShowHearts(true);
        setLocked(true); 
      }
    }
  }, [charIndex, isTyping, textIndex]);

  const handleClick = () => {
    if (isTyping || locked) return;

    setDisplayText("");
    setCharIndex(0);
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping && displayText !== "" && !isLastText) {
      setTextIndex((prev) => prev + 1);
    }
  }, [isTyping]);

  return (
    <button
      className={`fullscreen-button ${showHearts ? "pink-bg" : ""}`}
      onClick={handleClick}
      disabled={locked}
    >
      {showHearts && <HeartsBackground />}

      <span className="text">
        {displayText}
        <span className="cursor">|</span>
      </span>
    </button>
  );
}


function HeartsBackground() {
  return (
    <div className="hearts-container">
      {Array.from({ length: 35 }).map((_, i) => (
        <span
          key={i}
          className="heart"
          style={{
            left: Math.random() * 100 + "vw",
            fontSize: Math.random() * 18 + 18 + "px",
            animationDuration: Math.random() * 6 + 6 + "s",
            animationDelay: Math.random() * 6 + "s",
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}



export default App;
