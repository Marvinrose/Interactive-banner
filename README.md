# Outreachy Microtask: Frontend Web Application (T388234)

# Interactive Banner Design

## Overview

This project is a **frontend web application** that allows users to customize a **banner** by changing its text, background, font, and images in real-time.

## Features

- **Banner Content**: Describes my love for intellectual conversations.
- **Customization**: Adjust background color/image, text color (via color picker with a dropdown fallback), font, and overlay opacity.
- **Localization**: Supports English and Spanish with dynamic translation.
- **Responsive Design**: Adapts to mobile screens using Material-UI breakpoints.
- **Zoom Effect**: Banner zooms in slightly on hover for an engaging effect.
- **Accessibility (WCAG 2.1 AA)**:
  - ARIA labels and roles for screen readers.
  - Keyboard navigation (color picker with a dropdown fallback for text color).
  - Contrast validation (4.5:1 ratio) with warnings.
  - Focus states for all interactive elements.
  - Screen reader-friendly snackbars.
- **Dismiss Button**: A close icon, positioned for easy access.

## Usage

1. Enter a title and body text describing your passion.
2. Select a language (English or Spanish) to dynamically translate the text.
3. Customize styles (background, text color, font, image).
4. Dismiss the banner using the close button in the top-right corner.

## Tech Stack

- **React.js** (with Hooks)
- **Material-UI (MUI)** for styling
- **JavaScript (ES6)**
- **Git/GitHub** for version control
- **Jest** for unit testing
- **Vercel** for hosting

## Getting Started

### 1️ Clone the Repository

```sh
git clone <your-repo-url>
cd Outreachy-banner

### 2 Install dependencies

npm install

### 3 Run the Application

npm run dev
The app will open in your default browser at http://localhost:5173/


### Live Demo

(https://interactive-banner.vercel.app/)


### 4 Running Tests

This project includes unit tests to validate the interactive behavior of the banner.
npm test


```

## Task Reference

[T388234](https://phabricator.wikimedia.org/T388248)
