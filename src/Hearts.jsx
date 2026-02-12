import { useEffect, useState, useRef } from "react";
import "./Hearts.css";

function Hearts() {
  const [hearts, setHearts] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: counterRef.current++,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        size: 10 + Math.random() * 30,
        createdAt: Date.now(),
      };

      setHearts((prevHearts) => {
        const now = Date.now();
        const updated = [...prevHearts, newHeart];

        return updated.filter((h) => now - h.createdAt < h.duration * 1000);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

export default Hearts;
