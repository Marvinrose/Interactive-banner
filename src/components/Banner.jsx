import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Simplified contrast ratio calculation ToDo => use a library like 'polished' later.
const getContrastRatio = (color1, color2) => {
  const lum1 = parseInt(color1.slice(1), 16);
  const lum2 = parseInt(color2.slice(1), 16);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return ratio >= 4.5; // WCAG 4.5:1 for normal text
};

// Mock translation function ToDo => replace with a real API like Google Translate later
const translateText = async (text, targetLang) => {
  // After implementing google transalte, this would call Google Translate API

  if (targetLang === "en") return text; // Return original text for English

  return ` ${text.replace(/[aeiou]/g, "áéíóú")}`;
};

const Banner = () => {
  // Banner content states
  const [title, setTitle] = useState("Passionate About Ideas? Let's Chat!");
  const [body, setBody] = useState(
    "I love communicating with people and engaging in intellectual conversations. Thoughtful discussions help me learn, grow, and connect with different perspectives."
  );
  const [displayTitle, setDisplayTitle] = useState(title);
  const [displayBody, setDisplayBody] = useState(body);
  const [isDismissed, setIsDismissed] = useState(false);
  const [language, setLanguage] = useState("en");

  // Styling states
  const [bgColor, setBgColor] = useState("#2c3e50");
  const [font, setFont] = useState("Playfair Display, serif");
  const [bgImage, setBgImage] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [contrastWarning, setContrastWarning] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [useColorPicker, setUseColorPicker] = useState(true); 

  // Update displayed text whenever title, body, or language changes
  useEffect(() => {
    const updateTranslation = async () => {
      const translatedTitle = await translateText(title, language);
      const translatedBody = await translateText(body, language);
      setDisplayTitle(translatedTitle);
      setDisplayBody(translatedBody);
    };
    updateTranslation();
  }, [title, body, language]);

  // Validate contrast whenever textColor or bgColor changes
  useEffect(() => {
    const effectiveBgColor = bgImage ? "#000000" : bgColor;
    const isContrastValid = getContrastRatio(textColor, effectiveBgColor);
    setContrastWarning(!isContrastValid);
  }, [textColor, bgColor, bgImage]);

  const handleFontChange = (event) => {
    setFont(event.target.value);
    setSnackbarMessage("Font updated!");
    setOpenSnackbar(true);
  };

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
    setSnackbarMessage("Background color updated!");
    setOpenSnackbar(true);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
    setSnackbarMessage("Text color updated!");
    setOpenSnackbar(true);
  };

  const handleOpacityChange = (event, value) => {
    setOverlayOpacity(value);
    setSnackbarMessage("Overlay opacity updated!");
    setOpenSnackbar(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
      setSnackbarMessage("Background image updated!");
      setOpenSnackbar(true);
    }
  };

  const removeBackgroundImage = () => {
    setBgImage(null);
    setSnackbarMessage("Background image removed!");
    setOpenSnackbar(true);
  };

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    setSnackbarMessage("Language updated!");
    setOpenSnackbar(true);
  };

  if (isDismissed) return null;

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
          padding: { xs: "30px 10px", sm: "50px 20px" },
          backgroundColor: bgImage ? "transparent" : bgColor,
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
          "&:focus": { outline: "2px solid #1A1A1A" },
        }}
        tabIndex={0}
        aria-label="Customizable banner describing my love for intellectual conversations"
        role="banner"
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

        {/* Banner Content */}
        <Box
          sx={{
            zIndex: 2,
            color: textColor,
            maxWidth: "90%",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: font,
              fontWeight: 800,
              fontSize: { xs: "20px", sm: "24px" },
            }}
            role="heading"
            aria-level="1"
            aria-live="polite"
          >
            {displayTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: font,
              fontSize: { xs: "14px", sm: "16px" },
              mt: 1,
            }}
            aria-live="polite"
          >
            {displayBody}
          </Typography>
        </Box>

        {/* Dismiss Button */}
        <IconButton
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss banner"
          sx={{
            position: "absolute",
            top: 20,
            right: { xs: 20, lg: 40 },
            color: textColor,
            zIndex: 2,
            padding: "12px",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            "&:focus": { outline: "2px solid #1A1A1A" },
          }}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          p: 3,
          background: "white",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: { xs: "90%", sm: 700 },
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

        {/* Language Selector */}
        <InputLabel
          id="language-select-label"
          sx={{ mt: 2, fontFamily: "Playfair Display, serif" }}
        >
          Language:
        </InputLabel>
        <Select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          aria-labelledby="language-select-label"
          sx={{ width: "100%", mt: 1 }}
          inputProps={{ tabIndex: 0 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
        </Select>

        {/* Title Input */}
        <TextField
          fullWidth
          label="Banner Title"
          variant="outlined"
          sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSnackbarMessage("Title updated!");
            setOpenSnackbar(true);
          }}
          inputProps={{ "aria-labelledby": "customize-banner-heading" }}
        />

        {/* Body Input */}
        <TextField
          fullWidth
          label="Banner Body"
          variant="outlined"
          multiline
          rows={3}
          sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setSnackbarMessage("Body updated!");
            setOpenSnackbar(true);
          }}
          inputProps={{ "aria-labelledby": "customize-banner-heading" }}
        />

        {/* Background Color Select */}
        <InputLabel
          id="background-select-label"
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
          inputProps={{ tabIndex: 0 }}
        >
          <MenuItem value="#2c3e50">Default</MenuItem>
          <MenuItem value="#1abc9c">Teal</MenuItem>
          <MenuItem value="#e74c3c">Red</MenuItem>
          <MenuItem value="#8e44ad">Purple</MenuItem>
          <MenuItem value="#f39c12">Orange</MenuItem>
        </Select>

        {/* Text Color Picker with Fallback */}
        <Box sx={{ mt: 2 }}>
          <InputLabel
            id="text-color-label"
            sx={{ fontFamily: "Playfair Display, serif" }}
          >
            Text Color:
          </InputLabel>
          {useColorPicker ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <input
                type="color"
                id="text-color-input"
                value={textColor}
                onChange={handleTextColorChange}
                aria-labelledby="text-color-label"
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                }}
              />
              <Button
                onClick={() => setUseColorPicker(false)}
                aria-label="Switch to dropdown for text color selection"
                sx={{ fontSize: "12px" }}
              >
                Use Dropdown
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Select
                value={textColor}
                onChange={handleTextColorChange}
                aria-labelledby="text-color-label"
                sx={{ width: "100%" }}
                inputProps={{ tabIndex: 0 }}
              >
                <MenuItem value="#ffffff">White</MenuItem>
                <MenuItem value="#000000">Black</MenuItem>
                <MenuItem value="#ff0000">Red</MenuItem>
                <MenuItem value="#00ff00">Green</MenuItem>
              </Select>
              <Button
                onClick={() => setUseColorPicker(true)}
                aria-label="Switch to color picker for text color selection"
                sx={{ fontSize: "12px" }}
              >
                Use Color Picker
              </Button>
            </Box>
          )}
          {contrastWarning && (
            <Typography color="error" sx={{ mt: 1 }}>
              Warning: Text color has low contrast with background.
            </Typography>
          )}
        </Box>

        {/* Font Selection */}
        <InputLabel
          id="font-select-label"
          sx={{ mt: 2, fontFamily: "Playfair Display, serif" }}
        >
          Choose Font:
        </InputLabel>
        <Select
          id="font-select"
          data-testid="font-select"
          sx={{ width: "100%", fontFamily: "'DM Sans', sans-serif" }}
          value={font}
          onChange={handleFontChange}
          aria-labelledby="font-select-label"
          inputProps={{ tabIndex: 0 }}
        >
          <MenuItem value="Playfair Display, serif">Playfair Display</MenuItem>
          <MenuItem value="Arial, sans-serif">Arial</MenuItem>
          <MenuItem value="Courier New, monospace">Courier New</MenuItem>
          <MenuItem value="Georgia, serif">Georgia</MenuItem>
          <MenuItem value="Poppins, sans-serif">Poppins</MenuItem>
        </Select>

        {/* Upload Background Image */}
        <Box sx={{ mt: 3 }}>
          <InputLabel
            id="upload-bg-label"
            sx={{ fontFamily: "Playfair Display, serif" }}
          >
            Upload Background Image:
          </InputLabel>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            id="upload-bg"
            style={{ display: "none" }}
            aria-labelledby="upload-bg-label"
          />
          <label htmlFor="upload-bg">
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
              aria-label="Upload background image"
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
            aria-label="Remove background image"
          >
            Remove Background Image
          </Button>
        )}

        {/* Overlay Opacity Slider */}
        {bgImage && (
          <Box sx={{ mt: 3 }}>
            <InputLabel
              id="overlay-opacity-label"
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
            />
          </Box>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar || contrastWarning}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false);
          setContrastWarning(false);
        }}
        message={
          contrastWarning
            ? "Low contrast detected! Adjust text color for better readability."
            : snackbarMessage
        }
        role="alert"
      />
    </div>
  );
};

export default Banner;
