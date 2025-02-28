import "./App.css"
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import CardForm from "./Components/cardForm.jsx";
import CardDisplay from "./Components/cardDisplay.jsx";

const App = () => {
  const [cardData, setCardData] = useState(null);

  return (
    <div className="app">
       <Toaster position="top-right" reverseOrder={false} />
      <h1>AI Birthday Card Generator</h1>
      <CardForm onGenerate={setCardData} />
      {cardData && <CardDisplay cardData={cardData} />}
    </div>
  );
};

export default App;