import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Snackbar,
  Slider,
} from "@mui/material";

const Banner = () => {
  const [quote, setQuote] = useState(
    "Great minds discuss ideas; average minds discuss events; small minds discuss people. – Eleanor Roosevelt"
  );
  const [newQuote, setNewQuote] = useState("");
  const [bgColor, setBgColor] = useState("#2c3e50");
  const [font, setFont] = useState("Playfair Display, serif");
  const [bgImage, setBgImage] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUpdateQuote = () => {
    if (newQuote.trim() !== "") {
      setQuote(newQuote);
      setNewQuote("");
      setOpenSnackbar(true);
    }
  };

  const handleFontChange = (event) => setFont(event.target.value);
  const handleColorChange = (event) => setBgColor(event.target.value);
  const handleOpacityChange = (event, value) => setOverlayOpacity(value);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
    }
  };

  const removeBackgroundImage = () => setBgImage(null);

  return (
    <div style={{ textAlign: "center", overflow: "hidden" }}>
      {/* Banner */}
      <Box
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          minHeight: 300,
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
          position: "relative",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
        aria-live="polite"
        aria-roledescription="Customizable advertisement banner"
      >
        {/* Dynamic Overlay */}
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
              transition: "opacity 0.3s ease-in-out",
            }}
            aria-hidden="true"
          />
        )}

        <Typography
          sx={{
            fontFamily: font,
            fontWeight: 800,
            position: "relative",
            zIndex: 2,
            color: textColor,
          }}
          variant="h4"
          data-testid="banner-text"
          role="heading"
          aria-level="1"
        >
          {quote}
        </Typography>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          p: 3,
          background: "white",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: 700,
          margin: "auto",
          paddingBottom: "50px",
          marginBottom: "100px",
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 800,
          }}
          variant="h6"
          id="customize-banner-heading"
        >
          Customize Your Banner
        </Typography>

        {/* Quote Input & Button */}
        <TextField
          fullWidth
          label="Enter a new quote"
          variant="outlined"
          sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          aria-labelledby="customize-banner-heading"
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: "#1A1A1A",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={handleUpdateQuote}
        >
          Change Quote
        </Button>

        {/* Background Color Select */}
        <InputLabel
          htmlFor="background-select"
          sx={{ mt: 2, fontFamily: "Playfair Display, serif", fontWeight: 800 }}
        >
          Change Background:
        </InputLabel>
        <Select
          id="background-select"
          data-testid="background-select"
          sx={{ width: "100%", fontFamily: "'DM Sans', sans-serif" }}
          fullWidth
          value={bgColor}
          onChange={handleColorChange}
          disabled={bgImage}
          aria-labelledby="background-select-label"
        >
          <MenuItem value="#2c3e50">Default</MenuItem>
          <MenuItem value="#1abc9c">Teal</MenuItem>
          <MenuItem value="#e74c3c">Red</MenuItem>
          <MenuItem value="#8e44ad">Purple</MenuItem>
          <MenuItem value="#f39c12">Orange</MenuItem>
        </Select>
        <InputLabel id="background-select-label" style={{ display: "none" }}>
          Select Background Color
        </InputLabel>

        {/* Text Color Picker */}
        <Box sx={{ mt: 2 }}>
          <InputLabel
            htmlFor="text-color-input"
            sx={{ fontFamily: "Playfair Display, serif" }}
          >
            Text Color:
          </InputLabel>
          <input
            type="color"
            id="text-color-input"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            aria-labelledby="text-color-label"
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              cursor: "pointer",
              background: "transparent",
            }}
          />
          <InputLabel id="text-color-label" style={{ display: "none" }}>
            Choose Text Color
          </InputLabel>
        </Box>

        {/* Font Selection */}
        <InputLabel
          htmlFor="font-select"
          sx={{ mt: 2, fontFamily: "Playfair Display, serif" }}
          id="font-select-label"
        >
          Choose Font:
        </InputLabel>
        <Select
          aria-labelledby="font-select-label"
          id="font-select"
          data-testid="font-select"
          sx={{ width: "100%", fontFamily: "'DM Sans', sans-serif" }}
          value={font}
          onChange={handleFontChange}
        >
          <MenuItem value="Playfair Display, serif">Playfair Display</MenuItem>
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="Courier New, monospace">Courier New</MenuItem>
          <MenuItem value="Georgia, serif">Georgia</MenuItem>
          <MenuItem value="Poppins, serif">Poppins</MenuItem>
        </Select>

        {/* Upload Background Image */}
        <Box sx={{ mt: 3 }}>
          <InputLabel
            htmlFor="upload-bg"
            sx={{ fontFamily: "Playfair Display, serif" }}
          >
            Upload Background Image:
          </InputLabel>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            id="upload-bg"
            aria-labelledby="upload-bg-label"
            style={{ display: "none" }}
          />
          <label htmlFor="upload-bg" id="upload-bg-label">
            <Button
              component="span"
              variant="contained"
              sx={{
                mt: 1,
                width: "100%",
                backgroundColor: "#1A1A1A",
                color: "white",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Choose Image
            </Button>
          </label>
        </Box>

        {/* Remove Background Image */}
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
            <InputLabel
              htmlFor="overlay-opacity-slider"
              sx={{ fontFamily: "Playfair Display, serif" }}
            >
              Overlay Opacity:
            </InputLabel>
            <Slider
              value={overlayOpacity}
              onChange={handleOpacityChange}
              min={0}
              max={1}
              step={0.05}
              sx={{ mt: 1, color: "#1A1A1A" }}
              aria-labelledby="overlay-opacity-label"
              id="overlay-opacity-slider"
            />
            <InputLabel id="overlay-opacity-label" style={{ display: "none" }}>
              Adjust background overlay opacity
            </InputLabel>
          </Box>
        )}
      </Box>

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
