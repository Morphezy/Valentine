import React, { useState, useRef } from "react";

function Button() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [showSadModal, setShowSadModal] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [lastEscapeTime, setLastEscapeTime] = useState(0);
  const noButtonRef = useRef(null);

  const handleNoEscape = () => {
    const now = Date.now();

    if (now - lastEscapeTime < 100) return;

    setLastEscapeTime(now);
    const randomX = Math.random() * 500 - 250;
    const randomY = -(Math.random() * 350 + 150);
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    setShowSadModal(true);
  };

  const handleYesClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSadModal = () => {
    setShowSadModal(false);
  };

  const handleCloseBrowser = () => {
    // Попытка закрыть окно браузера
    window.close();

    // Если не сработало, перенаправляем на пустую страницу
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
            <h2 className="sad-emoji">😢</h2>
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
