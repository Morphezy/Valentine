import React, { useState, useRef } from "react";

function Button() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [lastEscapeTime, setLastEscapeTime] = useState(0);
  const noButtonRef = useRef(null);

  const handleNoEscape = () => {
    const now = Date.now();
    // Не убегать если был клик недавно
    if (now - lastEscapeTime < 100) return;

    setLastEscapeTime(now);
    const randomX = Math.random() * 500 - 250;
    const randomY = -(Math.random() * 350 + 150);
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    setNoClicked(true);
  };

  const handleYesClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {!noClicked ? (
        <div className="button-container">
          <button
            className="valentine-button yes-button"
            onClick={handleYesClick}
          >
            <span className="heart">❤️</span> ДА
          </button>
          <button
            ref={noButtonRef}
            className="valentine-button no-button"
            onMouseEnter={handleNoEscape}
            onMouseMove={handleNoEscape}
            onClick={(e) => {
              e.stopPropagation();
              handleNoClick();
            }}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
          >
            НЕ
          </button>
        </div>
      ) : (
        <div className="victory-container">
          <button
            className="valentine-button yes-button yes-button-victory"
            onClick={handleYesClick}
          >
            <span className="heart">❤️</span> ДАААА (Сюда жми!! 😡)
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                      <h2>Ураа!!!!
                          это был тяжелый тест,
                          но ты справилась!!
            </h2>
            <img src="/clappi-clappi-clappi.gif" alt="cutiepatotie" className="kitty-cat" />
            <button className="modal-button" onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Button;
