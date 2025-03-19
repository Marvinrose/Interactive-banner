import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Slider,
  Snackbar,
} from "@mui/material";

const Banner = () => {
  const [quote, setQuote] = useState(
    "Great minds discuss ideas; average minds discuss events; small minds discuss people. – Eleanor Roosevelt"
  );
  const [newQuote, setNewQuote] = useState(""); // Holds input text before updating
  const [bgColor, setBgColor] = useState("#2c3e50");
  const [customColor, setCustomColor] = useState("#2c3e50");
  const [font, setFont] = useState("Playfair Display, serif");
  const [bgImage, setBgImage] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5); // Default overlay opacity
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handles setting the new quote on button click
  const handleUpdateQuote = () => {
    if (newQuote.trim() !== "") {
      setQuote(newQuote);
      setNewQuote(""); // Clear input field
      setOpenSnackbar(true);
    }
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  // Handles background color change
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  // Handles file upload for background image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
    }
  };

  // Removes the background image
  const removeBackgroundImage = () => {
    setBgImage(null);
  };

  return (
    <div style={{ textAlign: "center", overflow: "hidden" }}>
      {/* Banner */}
      <Box
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: bgImage ? "transparent" : bgColor,
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          fontSize: "24px",
          transition: "transform 0.3s ease-in-out",
          overflow: "hidden",
          position: "relative",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        {/* Overlay */}
        {bgImage && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 1)",
              opacity: overlayOpacity,
            }}
          />
        )}

        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 800,
            position: "relative",
            zIndex: 2, // Ensures text is above overlay
          }}
          variant="h4"
        >
          {quote}
        </Typography>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          background: "white",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          display: "inline-block",
        }}
      >
        <Typography
          sx={{ fontFamily: "Playfair Display, serif", fontWeight: 800 }}
          variant="h6"
        >
          Customize Your Banner
        </Typography>

        {/* Quote Input & Button */}
        <TextField
          fullWidth
          label="Enter a new quote..."
          variant="outlined"
          sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
          onClick={handleUpdateQuote}
        >
          Change Quote
        </Button>

        {/* Background Color Select */}
        <InputLabel
          sx={{ mt: 2, fontFamily: "Playfair Display, serif", fontWeight: 800 }}
        >
          Change Background:
        </InputLabel>
        <Select
          sx={{ fontFamily: "'DM Sans', sans-serif" }}
          fullWidth
          value={bgColor}
          onChange={handleColorChange}
          disabled={bgImage} // Disable if an image is set
        >
          <MenuItem value="#2c3e50">Default</MenuItem>
          <MenuItem value="#1abc9c">Teal</MenuItem>
          <MenuItem value="#e74c3c">Red</MenuItem>
          <MenuItem value="#8e44ad">Purple</MenuItem>
          <MenuItem value="#f39c12">Orange</MenuItem>
        </Select>

        {/* Custom Color Picker */}
        <Box sx={{ mt: 2 }}>
          <InputLabel sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            Select Custom Color:
          </InputLabel>
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setBgColor(e.target.value);
            }}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              cursor: "pointer",
              background: "transparent",
            }}
            disabled={bgImage} // Disable if an image is set
          />
        </Box>

        {/* Font Selection */}
        <InputLabel sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}>
          Choose Font:
        </InputLabel>
        <Select
          sx={{ fontFamily: "'DM Sans', sans-serif" }}
          fullWidth
          value={font}
          onChange={handleFontChange}
        >
          <MenuItem value="Playfair Display, serif">Playfair Display</MenuItem>
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="Courier New, monospace">Courier New</MenuItem>
          <MenuItem value="Georgia, serif">Georgia</MenuItem>
        </Select>

        {/* Text Color Picker */}
        <Box sx={{ mt: 2 }}>
          <InputLabel sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            Text Color:
          </InputLabel>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              cursor: "pointer",
              background: "transparent",
            }}
          />
        </Box>

        {/* Upload Background Image */}
        <Box sx={{ mt: 3 }}>
          <InputLabel sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload Background Image:
          </InputLabel>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            id="upload-bg"
            style={{ display: "none" }}
          />
          <label htmlFor="upload-bg">
            <Button
              component="span"
              variant="contained"
              sx={{
                mt: 1,
                backgroundColor: "#3498db",
                color: "white",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#2980b9" },
              }}
            >
              Choose Image
            </Button>
          </label>
        </Box>

        {/* Remove Background Image Button */}
        {bgImage && (
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, width: "100%" }}
            onClick={removeBackgroundImage}
          >
            Remove Background Image
          </Button>
        )}

        {/* Overlay Opacity Slider */}
        {bgImage && (
          <Box sx={{ mt: 3 }}>
            <InputLabel sx={{ fontFamily: "'DM Sans', sans-serif" }}>
              Adjust Text Visibility:
            </InputLabel>
            <Slider
              value={overlayOpacity}
              min={0}
              max={1}
              step={0.05}
              onChange={(e, newValue) => setOverlayOpacity(newValue)}
              sx={{ mt: 1 }}
            />
          </Box>
        )}
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Quote updated successfully!"
      />
    </div>
  );
};

export default Banner;
