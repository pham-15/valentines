import { useEffect, useRef, useState } from "react";

import miffyDefault from "./assets/miffyGIF.gif";
import miffyCelebration from "./assets/miffyCelebration.gif";

export default function App() {
  const [questionText, setQuestionText] = useState("Will You Be My Valentine?");
  const [gifSrc, setGifSrc] = useState(miffyDefault);

  const noBtnRef = useRef(null);

  const handleYesClick = () => {
    setQuestionText("Yay! ❤️");
    setGifSrc(miffyCelebration);
  };

  const moveNoButton = () => {
    const btn = noBtnRef.current;
    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();

    // Keep it on-screen
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);

    btn.style.position = "absolute";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  };

  useEffect(() => {
    const onResize = () => {
      const btn = noBtnRef.current;
      if (!btn) return;
      if (btn.style.position === "absolute") moveNoButton();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#ce4257] px-5 py-5 text-center font-sans">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-3xl flex-col items-center justify-center">
        <h1 className="m-0 p-0 text-white text-5xl sm:text-6xl md:text-7xl [font-family:'Brush_Script_MT',cursive]">
          {questionText}
        </h1>

        <img className="w-40 sm:w-52 md:w-64 py-3" src={gifSrc} alt="Miffy" />

        <div className="mt-2 flex w-56 flex-row justify-between gap-4">
          <button
            id="yes"
            onClick={handleYesClick}
            className="w-full rounded-md border-2 border-black bg-[#3bc14a] px-5 py-2 text-base text-white hover:brightness-95 active:scale-[0.98]"
          >
            Yes
          </button>

          <button
            id="no"
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            className="w-full rounded-md border-2 border-black bg-[#ec0b43] px-5 py-2 text-base text-white hover:brightness-95 active:scale-[0.98]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
