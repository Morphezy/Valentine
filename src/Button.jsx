import React, { useState, useRef } from "react";
import Hearts from "./Hearts";

function Button({ onYes, heartsActive }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [showSadModal, setShowSadModal] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [lastEscapeTime, setLastEscapeTime] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const noButtonRef = useRef(null);

  const handleNoEscape = () => {
    const now = Date.now();

    if (now - lastEscapeTime < 100) return;

    setLastEscapeTime(now);
    const randomX = Math.random() * 500 - 250;
    const randomY = -(Math.random() * 350 + 150);
    setNoPosition({ x: randomX, y: randomY });
    // Увеличиваем кнопку ДА при каждом перемещении кнопки НЕ (максимум x2)
    // Убираем верхнюю границу — масштаб будет расти без ограничения
    setYesScale((prev) => +(prev + 0.05).toFixed(3));
  };

  const handleNoClick = () => {
    setShowSadModal(true);
  };

  const handleYesClick = () => {
    if (typeof onYes === "function") onYes();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSadModal = () => {
    setShowSadModal(false);
  };

  const handleCloseBrowser = () => {
    window.close();

    setTimeout(() => {
      window.location.href = "about:blank";
    }, 100);
  };

  return (
    <>
      <div className="button-container">
        <button
          className="valentine-button yes-button"
          onClick={handleYesClick}
          style={{
            transform: `scale(${yesScale})`,
            transition: "transform 120ms ease",
          }}
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

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Ураа!!!! это был тяжелый тест, но ты справилась!!</h2>
            <img
              src="/clappi-clappi-clappi.gif"
              alt="cutiepatotie"
              className="kitty-cat"
            />
            {/* Hearts inside modal */}
            <div style={{ position: "relative", width: "100%", height: 200 }}>
              <Hearts active={heartsActive} />
            </div>
            <button className="modal-button" onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {showSadModal && (
        <div className="modal-overlay" onClick={closeSadModal}>
          <div
            className="modal-content sad-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/hm.gif" alt="." />
            <h3>Ну и гуляй тогда!</h3>
            <button className="modal-button" onClick={handleCloseBrowser}>
              Ладно
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Button;
