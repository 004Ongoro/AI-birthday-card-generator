import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CardDisplay = ({ cardData }) => {
  const cardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedTheme = cardData.theme === "custom" ? cardData.customTheme : { background: "white", border: "2px solid black", textColor: "black", emoji: "🎉" };

  // Download Card
  const downloadCard = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "birthday_card.png";
      link.href = canvas.toDataURL();
      link.click();
      toast.success("Card downloaded!");
    });
  };

  return (
    <div>
      {/* Envelope Animation */}
      {!isOpen ? (
        <div className="envelope" onClick={() => setIsOpen(true)}>
          <h2>{cardData.name}</h2>
          <p>📩 Tap to Open</p>
        </div>
      ) : (
        <div ref={cardRef} className="birthday-card" style={{ background: selectedTheme.background, border: selectedTheme.border, color: selectedTheme.textColor }}>
          <h2>Happy Birthday, {cardData.name}! {selectedTheme.emoji}</h2>
          <p>🎉 You’re {cardData.age} years old! 🎂</p>
          <p>{cardData.message}</p>
        </div>
      )}

      {/* Buttons */}
      <button onClick={downloadCard}>Download</button>
      <button onClick={() => navigator.share ? navigator.share({ title: "Birthday Card", text: "Check this out!", url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}>Share</button>

      {/* Music Player */}
      {cardData.music && <audio src={cardData.music} controls autoPlay />}
    </div>
  );
};

export default CardDisplay;