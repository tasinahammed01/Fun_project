import React, { useState, useEffect } from "react";

export default function ProposalApp() {
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [step, setStep] = useState(0);
  const [flowers, setFlowers] = useState([]);

  const resetNoButton = () => {
    const noBtn = document.querySelector(".no-btn");
    if (noBtn) {
      noBtn.style.position = "static";
      noBtn.style.left = "";
      noBtn.style.top = "";
      noBtn.style.width = "";
      noBtn.style.height = "";
    }
  };

  useEffect(() => {
    resetNoButton();
  }, [step]);

  const moveNoButton = (e) => {
    const btn = e.target;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    const randX = Math.floor(Math.random() * (screenWidth - btnWidth));
    const randY = Math.floor(Math.random() * (screenHeight - btnHeight));

    btn.style.position = "fixed";
    btn.style.left = `${randX}px`;
    btn.style.top = `${randY}px`;
    btn.style.width = `${btnWidth}px`;
    btn.style.height = `${btnHeight}px`;
  };

  const handleYesClick = () => {
    const newFlowers = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * window.innerWidth,
      animationDuration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setFlowers(newFlowers);

    setStep(step + 1);
    resetNoButton();

    setTimeout(() => setFlowers([]), 5000);
  };

  // Steps data
  const stepsData = [
    {
      question: `Hey ${name}, do you like me? 💖`,
      yesText: "Yes, of course 💖",
      noText: "No way 😅",
    },
    {
      question: "Will you go on a date with me? 🌙",
      yesText: "Yes, I can't wait 😍",
      noText: "No, maybe later 😭",
    },
    {
      question: "Will you be mine forever? 💍",
      yesText: "Yes, forever 💖",
      noText: "No, sorry 😢",
    },
    {
      question: "Will you cook with me sometimes? 🍳",
      yesText: "Yes, chef 👩‍🍳",
      noText: "No, I can't cook 😅",
    },
    {
      question: "Will you watch movies with me? 🎬",
      yesText: "Yes, popcorn ready 🍿",
      noText: "No, I'm busy 😭",
    },
    {
      question: "Will you laugh at my bad jokes? 😆",
      yesText: "Yes, I love them 😂",
      noText: "No, I can't 😅",
    },
    {
      question: "Finally… will you hold my hand forever? 🤝",
      yesText: "Yes, always 💖",
      noText: "No, I can’t 😢",
    },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 px-4 overflow-hidden">
      {/* Flowers */}
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="absolute animate-fall"
          style={{
            left: `${flower.left}px`,
            fontSize: `${flower.size}px`,
            color: flower.color,
            animationDuration: `${flower.animationDuration}s`,
          }}
        >
          🌸
        </span>
      ))}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center relative w-full max-w-sm min-h-[300px] flex flex-col justify-center">
        {/* Step 0: Name input */}
        {step === 0 && (
          <div>
            <h1 className="text-xl md:text-2xl mb-4">Hey there! 💕</h1>
            <p className="mb-4 text-base md:text-lg">
              What’s your beautiful name?
            </p>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="border rounded px-4 py-2 mb-4 w-full text-base"
              placeholder="Enter your name"
            />
            <button
              onClick={() => {
                if (inputName.trim() !== "") {
                  setName(inputName);
                  setStep(1);
                }
              }}
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 w-full md:w-auto"
            >
              Continue ➡️
            </button>
          </div>
        )}

        {/* Steps 1-7 */}
        {step >= 1 && step <= stepsData.length && (
          <div>
            <h1 className="text-xl md:text-2xl mb-6">
              {stepsData[step - 1].question}
            </h1>

            <div className="flex flex-col items-center gap-4 relative min-h-[80px]">
              <button
                onClick={handleYesClick}
                className="yes-btn bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-52"
              >
                {stepsData[step - 1].yesText}
              </button>

              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="no-btn bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-52 transition-all duration-300"
              >
                {stepsData[step - 1].noText}
              </button>
            </div>
          </div>
        )}

        {/* Step 8: Final */}
        {step > stepsData.length && (
          <div>
            <h1 className="text-2xl md:text-3xl mb-6">Yay! 🎉</h1>
            <p className="text-base md:text-lg mb-6">
              {name}, you just made me the happiest person alive 💖✨
            </p>
            <p className="text-base md:text-lg">Our love story starts now ❤️</p>
          </div>
        )}
      </div>

      {/* CSS animation */}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(${
              window.innerHeight + 50
            }px) rotate(360deg); opacity: 0; }
          }
          .animate-fall {
            animation-name: fall;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    </div>
  );
}
