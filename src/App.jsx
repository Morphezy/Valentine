import "./App.css";
import Hearts from "./Hearts";
import Place from "./Place";
import { UseEffect} from "react";
function App() {
  UseEffect(() => {
    const audio = new Audio("/CAS.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(error => console.log("Audio playback failed:", error));
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <>
      
      <Place></Place>
      
      <Hearts />
    </>
  );
}

export default App;
