import React, { useState } from "react";

const Controls = ({ onUpdate }) => {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#3498db");
  const [bgImage, setBgImage] = useState("");

  return (
    <div>
      <label>Change Banner Text:</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label>Change Background Color:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />

      <label>Change Background Image URL:</label>
      <input
        type="text"
        value={bgImage}
        onChange={(e) => setBgImage(e.target.value)}
      />

      <button onClick={() => onUpdate(text, bgColor, bgImage)}>
        Apply Changes
      </button>
    </div>
  );
};

export default Controls;
