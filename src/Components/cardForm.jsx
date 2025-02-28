import { useState } from "react";
import { generateBirthdayMessage } from "../services/geminiService";
import toast from "react-hot-toast";

const CardForm = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("classic");

  // Custom theme settings
  const [customTheme, setCustomTheme] = useState({
    background: "#ffffff",
    border: "2px solid black",
    textColor: "#000000",
    fontFamily: "Arial, sans-serif",
    emoji: "🎂",
  });

  const [music, setMusic] = useState(""); // For preset or custom music

  // Generate AI Message
  const handleGenerateAIMessage = async () => {
    if (!name || !age) {
      toast.error("Please enter name and age first!");
      return;
    }
    const aiMessage = await generateBirthdayMessage(name, age);
    setMessage(aiMessage);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const themeData = theme === "custom" ? customTheme : null;
    onGenerate({ name, age, message, theme, customTheme: themeData, music });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <input type="text" placeholder="Recipient's Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <textarea placeholder="Personal Message" value={message} onChange={(e) => setMessage(e.target.value)} required />

      <button type="button" onClick={handleGenerateAIMessage}>Generate AI Message</button>

      {/* Theme Selection */}
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="fun">Fun</option>
        <option value="custom">Custom Theme</option>
      </select>

      {/* Custom Theme Options */}
      {theme === "custom" && (
        <div>
          <label>Background Color:</label>
          <input type="color" value={customTheme.background} onChange={(e) => setCustomTheme({ ...customTheme, background: e.target.value })} />

          <label>Border Pattern:</label>
          <select onChange={(e) => setCustomTheme({ ...customTheme, border: e.target.value })}>
            <option value="2px solid black">Solid</option>
            <option value="5px dashed red">Dashed</option>
            <option value="5px dotted blue">Dotted</option>
          </select>

          <label>Text Color:</label>
          <input type="color" value={customTheme.textColor} onChange={(e) => setCustomTheme({ ...customTheme, textColor: e.target.value })} />

          <label>Emoji:</label>
          <input type="text" placeholder="🎂🎉" value={customTheme.emoji} onChange={(e) => setCustomTheme({ ...customTheme, emoji: e.target.value })} />
        </div>
      )}

      {/* Music Selection */}
      <label>Background Music:</label>
      <select value={music} onChange={(e) => setMusic(e.target.value)}>
        <option value="">None</option>
        <option value="https://www.dropbox.com/scl/fi/i442gfd6toqgy534tqmmj/38-Michael-Riepen-Happy-Birthday-chosic.com.mp3?rlkey=hee3m5184663otyql946pzgc4&raw=1">Michael Riepen Happy Birthday</option>
        <option value="https://www.dropbox.com/scl/fi/3mdzoaw1apqncz3wzx1v2/01-Monk-Turner-Fascinoma-Its-Your-Birthday-chosic.com.mp3?rlkey=vgpj8foi8ak1p5j8tcofoj30l&st=c4mzo4my&raw=1">Its Your Birthday</option>
        <option value="https://www.dropbox.com/scl/fi/pcnnn193emv7zozvbpl5j/Happy_birthday_to_you_MIDI-chosic.com.mp3?rlkey=wdx1kkdnj3gk3ipodm4cv3936&st=tx37bhcw&raw=1">Happy Birthday to You</option>
      </select>

      <button type="submit">Generate Card</button>
    </form>
  );
};

export default CardForm;