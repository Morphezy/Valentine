import "./App.css";
import Hearts from "./Hearts";
import Place from "./Place";
import { useEffect, useRef, useState } from "react";

function App() {
  const [heartsActive, setHeartsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const detectDesktop = () => {
      const ua = navigator.userAgent || "";
      const mobileRegex =
        /Mobi|Android|iPhone|iPad|iPod|Windows Phone|Mobile|Tablet/i;
      const isMobileUA = mobileRegex.test(ua);
      const isTouch = !!(
        navigator.maxTouchPoints && navigator.maxTouchPoints > 1
      );
      // Reduce small-screen threshold so small laptops aren't treated as mobile
      const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 420;
      // treat as non-desktop only if UA is mobile OR (touch && small screen)
      return !(isMobileUA || (isTouch && smallScreen));
    };

    setIsDesktop(detectDesktop());

    const onResize = () => setIsDesktop(detectDesktop());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Only prepare audio on desktop
    if (!isDesktop) return;
    audioRef.current = new Audio("/CAS.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isDesktop]);

  const toggleMusic = () => {
    if (!isDesktop) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => console.log("Error:", error));
        setIsPlaying(true);
      }
    }
  };

  // If user is not on desktop, show modal-only message and nothing else
  if (!isDesktop) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.75)",
          color: "white",
          zIndex: 2000,
          padding: 20,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <h1 style={{ marginBottom: 10 }}>Я же просил с ноутбука!</h1>
          <img src="/hm.gif" alt="давай давай" />
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {isPlaying ? "🔊 Музыка вкл" : "🔇 Музыка выкл"}
      </button>
      <Place onYes={() => setHeartsActive(true)} heartsActive={heartsActive} />

      <Hearts active={heartsActive} />
    </>
  );
}

export default App;
