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
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Simplified contrast ratio (TODO => use a proper library like polished for this)
const getContrastRatio = (color1, color2) => {
  const lum1 = parseInt(color1.slice(1), 16);
  const lum2 = parseInt(color2.slice(1), 16);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return ratio >= 4.5;
};

// Mock translation function (TODO => replace with actual translation API)
// This is a placeholder function that simulates translation by replacing vowels with accented characters.
const translateText = async (text, targetLang) => {
  if (targetLang === "en") return text;
  return `${text.replace(/[aeiou]/g, "áéíóú")}`;
};

const Banner = () => {
  const [title, setTitle] = useState("Passionate About Ideas? Let's Chat!");
  const [body, setBody] = useState(
    "I love communicating with people and engaging in intellectual conversations. Thoughtful discussions help me learn, grow, and connect with different perspectives."
  );
  const [displayTitle, setDisplayTitle] = useState(title);
  const [displayBody, setDisplayBody] = useState(body);
  const [isDismissed, setIsDismissed] = useState(false);
  const [language, setLanguage] = useState("en");
  const [bgColor, setBgColor] = useState("#2c3e50");
  const [font, setFont] = useState("Playfair Display, serif");
  const [bgImage, setBgImage] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [contrastWarning, setContrastWarning] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [useColorPicker, setUseColorPicker] = useState(true);

  useEffect(() => {
    const updateTranslation = async () => {
      const translatedTitle = await translateText(title, language);
      const translatedBody = await translateText(body, language);
      setDisplayTitle(translatedTitle);
      setDisplayBody(translatedBody);
    };
    updateTranslation();
  }, [title, body, language]);

  useEffect(() => {
    const effectiveBgColor = bgImage ? "#000000" : bgColor;
    const isContrastValid = getContrastRatio(textColor, effectiveBgColor);
    setContrastWarning(!isContrastValid);
  }, [textColor, bgColor, bgImage]);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
    showSnackbar("Font updated!");
  };

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
    showSnackbar("Background color updated!");
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
    showSnackbar("Text color updated!");
  };

  const handleOpacityChange = (event, value) => {
    setOverlayOpacity(value);
    showSnackbar("Overlay opacity updated!");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      showSnackbar("Only PNG/JPEG images are allowed!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar("Image must be under 5MB!");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setBgImage(imageUrl);
    showSnackbar("Background image updated!");
  };

  const removeBackgroundImage = () => {
    setBgImage(null);
    showSnackbar("Background image removed!");
  };

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    showSnackbar("Language updated!");
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
            data-testid="dynamic-overlay"
          />
        )}
        <Box
          sx={{
            zIndex: 2,
            color: textColor,
            maxWidth: "90%",
            position: "relative",
          }}
          data-testid="banner-content"
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
        <IconButton
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss the customizable banner"
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
          variant="h5" // Changed from h6 to h5 for heading order
          id="customize-banner-heading"
        >
          Customize Your Banner
        </Typography>

        {/* Language Selector */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            id="language-select"
            value={language}
            label="Language"
            onChange={handleLanguageChange}
            aria-labelledby="language-select-label"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
        </FormControl>

        {/* Title Input */}
        <TextField
          fullWidth
          label="Banner Title"
          variant="outlined"
          sx={{ mt: 2, fontFamily: "'DM Sans', sans-serif" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            showSnackbar("Title updated!");
          }}
          id="banner-title-input"
          aria-describedby="customize-banner-heading"
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
            showSnackbar("Body updated!");
          }}
          id="banner-body-input"
          aria-describedby="customize-banner-heading"
        />

        {/* Background Color Select */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="background-select-label">
            Change Background
          </InputLabel>
          <Select
            id="background-select"
            data-testid="background-select"
            value={bgColor}
            label="Change Background"
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
        </FormControl>

        {/* Text Color Picker with Fallback */}
        <Box sx={{ mt: 2 }}>
          <InputLabel id="text-color-label">Text Color</InputLabel>
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
              <FormControl fullWidth>
                <Select
                  value={textColor}
                  onChange={handleTextColorChange}
                  aria-labelledby="text-color-label"
                  label="Text Color"
                  data-testid="text-color-select"
                >
                  <MenuItem value="#ffffff">White</MenuItem>
                  <MenuItem value="#000000">Black</MenuItem>
                  <MenuItem value="#ff0000">Red</MenuItem>
                  <MenuItem value="#00ff00">Green</MenuItem>
                </Select>
              </FormControl>
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="font-select-label">Choose Font</InputLabel>
          <Select
            id="font-select"
            data-testid="font-select"
            value={font}
            label="Choose Font"
            onChange={handleFontChange}
            aria-labelledby="font-select-label"
          >
            <MenuItem value="Playfair Display, serif">
              Playfair Display
            </MenuItem>
            <MenuItem value="Arial, sans-serif">Arial</MenuItem>
            <MenuItem value="Courier New, monospace">Courier New</MenuItem>
            <MenuItem value="Georgia, serif">Georgia</MenuItem>
            <MenuItem value="Poppins, sans-serif">Poppins</MenuItem>
          </Select>
        </FormControl>

        {/* Upload Background Image */}
        <Box sx={{ mt: 3 }}>
          <InputLabel id="upload-bg-label">Upload Background Image</InputLabel>
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

        {bgImage && (
          <Box sx={{ mt: 3 }}>
            <InputLabel id="overlay-opacity-label">Overlay Opacity</InputLabel>
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
