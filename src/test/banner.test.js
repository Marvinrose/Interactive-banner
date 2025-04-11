import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Banner from "../components/Banner";

// Mock URL.createObjectURL for JSDOM
global.URL.createObjectURL = jest.fn(() => "mocked-blob-url");

describe("Banner Component", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    jest.clearAllMocks();
  });

  it("renders the banner with default title and body", () => {
    render(<Banner />);
    expect(screen.getByText(/Passionate About Ideas?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/I love communicating with people/i)
    ).toBeInTheDocument();
  });

  it("updates the title and body when the input fields change", async () => {
    render(<Banner />);
    const titleInput = screen.getByLabelText("Banner Title");
    const bodyInput = screen.getByLabelText("Banner Body");

    await user.clear(titleInput);
    await user.type(titleInput, "New Title");
    await user.clear(bodyInput);
    await user.type(bodyInput, "New Body Text");

    await waitFor(() => {
      expect(screen.getByText("New Title")).toBeInTheDocument();
      expect(screen.getByText("New Body Text")).toBeInTheDocument();
    });
  });

  it("changes the background color when a new color is selected", async () => {
    render(<Banner />);
    const select = screen.getByLabelText("Change Background");
    await user.click(select);

    await waitFor(
      () => expect(select).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const options = await screen.findAllByRole("option", {}, { timeout: 2000 });
    const tealOption = options.find((opt) => opt.textContent === "Teal");
    await user.click(tealOption);

    await waitFor(() => {
      expect(screen.getByText("Background color updated!")).toBeInTheDocument();
      expect(screen.getByRole("banner")).toHaveStyle({
        backgroundColor: "#1abc9c",
      });
    });
  });

  it("changes the font when a new font is selected", async () => {
    render(<Banner />);
    const select = screen.getByLabelText("Choose Font");
    await user.click(select);

    await waitFor(
      () => expect(select).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const options = await screen.findAllByRole("option", {}, { timeout: 2000 });
    const arialOption = options.find((opt) => opt.textContent === "Arial");
    await user.click(arialOption);

    await waitFor(() => {
      expect(screen.getByText("Font updated!")).toBeInTheDocument();
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(window.getComputedStyle(titleElement).fontFamily).toContain(
        "Arial"
      );
      const bodyElement = screen.getByText(/I love communicating with people/i);
      expect(window.getComputedStyle(bodyElement).fontFamily).toContain(
        "Arial"
      );
    });
  });

  it("updates the overlay opacity when the slider value changes", async () => {
    render(<Banner />);
    const fileInput = screen.getByLabelText("Upload Background Image", {
      selector: "input",
    });
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Background image updated!")).toBeInTheDocument();
    });

    const slider = screen.getByRole("slider", { name: "Overlay Opacity" });
    fireEvent.change(slider, { target: { value: "0.7" } });

    await waitFor(() => {
      expect(screen.getByText("Overlay opacity updated!")).toBeInTheDocument();
      expect(screen.getByTestId("dynamic-overlay")).toHaveStyle({
        opacity: "0.7",
      });
    });
  });

  it("dismisses the banner when the dismiss button is clicked", async () => {
    const { container } = render(<Banner />);
    const dismissButton = screen.getByLabelText(
      "Dismiss the customizable banner"
    );
    await user.click(dismissButton);
    expect(container).toBeEmptyDOMElement();
  });

  it("opens Snackbar when title is updated", async () => {
    render(<Banner />);
    const input = screen.getByLabelText("Banner Title");
    await user.clear(input);
    await user.type(input, "Updated Title");
    await waitFor(() => {
      expect(screen.getByText("Title updated!")).toBeInTheDocument();
    });
  });

  it("opens Snackbar when body is updated", async () => {
    render(<Banner />);
    const input = screen.getByLabelText("Banner Body");
    await user.clear(input);
    await user.type(input, "Updated Body");
    await waitFor(() => {
      expect(screen.getByText("Body updated!")).toBeInTheDocument();
    });
  });

  it("opens Snackbar when text color is updated via color picker", async () => {
    render(<Banner />);
    const colorInput = screen.getByLabelText("Text Color", {
      selector: 'input[type="color"]',
    });
    fireEvent.change(colorInput, { target: { value: "#000000" } });
    await waitFor(() => {
      expect(screen.getByText("Text color updated!")).toBeInTheDocument();
      expect(screen.getByTestId("banner-content")).toHaveStyle({
        color: "#000000",
      });
    });
  });

  it("opens Snackbar when text color is updated via dropdown", async () => {
    render(<Banner />);
    const switchButton = screen.getByLabelText(
      "Switch to dropdown for text color selection"
    );
    await user.click(switchButton);

    const select = screen.getByLabelText("Text Color");
    await user.click(select);
    await waitFor(
      () => expect(select).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const options = await screen.findAllByRole("option", {}, { timeout: 2000 });
    const redOption = options.find((opt) => opt.textContent === "Red");
    await user.click(redOption);

    await waitFor(() => {
      expect(screen.getByText("Text color updated!")).toBeInTheDocument();
      expect(screen.getByTestId("banner-content")).toHaveStyle({
        color: "#ff0000",
      });
    });
  });

  it("opens Snackbar when background image is updated", async () => {
    render(<Banner />);
    const fileInput = screen.getByLabelText("Upload Background Image", {
      selector: "input",
    });
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Background image updated!")).toBeInTheDocument();
      expect(screen.getByRole("banner")).toHaveStyle({
        backgroundImage: "url(mocked-blob-url)",
      });
    });
  });

  it("opens Snackbar when background image is removed", async () => {
    render(<Banner />);
    const fileInput = screen.getByLabelText("Upload Background Image", {
      selector: "input",
    });
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Background image updated!")).toBeInTheDocument();
    });

    const removeButton = screen.getByLabelText("Remove background image");
    await user.click(removeButton);

    await waitFor(() => {
      expect(screen.getByText("Background image removed!")).toBeInTheDocument();
      expect(screen.getByRole("banner")).toHaveStyle({
        backgroundImage: "none",
        backgroundColor: "#2c3e50",
      });
    });
  });

  it("opens Snackbar when language is updated and updates displayed text", async () => {
    render(<Banner />);
    const select = screen.getByLabelText("Language");
    await user.click(select);

    await waitFor(
      () => expect(select).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const options = await screen.findAllByRole("option", {}, { timeout: 2000 });
    const spanishOption = options.find((opt) => opt.textContent === "Spanish");
    await user.click(spanishOption);

    await waitFor(() => {
      expect(screen.getByText("Language updated!")).toBeInTheDocument();
      expect(screen.getByText(/Pássíónáté Ábóút Ídéás?/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Í lóvé cómmúnícátíng wíth péóplé/i)
      ).toBeInTheDocument();
    });
  });

  it("displays a contrast warning when text and background colors have low contrast", async () => {
    render(<Banner />);
    const bgColorSelect = screen.getByLabelText("Change Background");
    const textColorInput = screen.getByLabelText("Text Color", {
      selector: 'input[type="color"]',
    });

    await user.click(bgColorSelect);
    await waitFor(
      () => expect(bgColorSelect).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const bgOptions = await screen.findAllByRole(
      "option",
      {},
      { timeout: 2000 }
    );
    const tealOption = bgOptions.find((opt) => opt.textContent === "Teal");
    await user.click(tealOption);

    fireEvent.change(textColorInput, { target: { value: "#1abc9c" } });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Warning: Text color has low contrast with background."
        )
      ).toBeInTheDocument();
    });
  });

  it("does not display a contrast warning when text and background colors have sufficient contrast", async () => {
    render(<Banner />);
    const bgColorSelect = screen.getByLabelText("Change Background");
    const textColorInput = screen.getByLabelText("Text Color", {
      selector: 'input[type="color"]',
    });

    await user.click(bgColorSelect);
    await waitFor(
      () => expect(bgColorSelect).toHaveAttribute("aria-expanded", "true"),
      { timeout: 2000 }
    );
    const bgOptions = await screen.findAllByRole(
      "option",
      {},
      { timeout: 2000 }
    );
    const tealOption = bgOptions.find((opt) => opt.textContent === "Teal");
    await user.click(tealOption);

    fireEvent.change(textColorInput, { target: { value: "#ffffff" } });

    await waitFor(() => {
      expect(
        screen.queryByText(
          "Warning: Text color has low contrast with background."
        )
      ).not.toBeInTheDocument();
    });
  });

  it("renders the banner with the default background color", () => {
    render(<Banner />);
    const banner = screen.getByRole("banner");
    expect(banner).toHaveStyle({ backgroundColor: "#2c3e50" });
  });

  it("renders the banner with the default font", () => {
    render(<Banner />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(window.getComputedStyle(titleElement).fontFamily).toContain(
      "Playfair Display"
    );
    const bodyElement = screen.getByText(/I love communicating with people/i);
    expect(window.getComputedStyle(bodyElement).fontFamily).toContain(
      "Playfair Display"
    );
  });

  it("renders the overlay only when a background image is present", async () => {
    render(<Banner />);
    expect(screen.queryByTestId("dynamic-overlay")).not.toBeInTheDocument();

    const fileInput = screen.getByLabelText("Upload Background Image", {
      selector: "input",
    });
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Background image updated!")).toBeInTheDocument();
      expect(screen.getByTestId("dynamic-overlay")).toBeInTheDocument();
    });

    const removeButton = screen.getByLabelText("Remove background image");
    await user.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("dynamic-overlay")).not.toBeInTheDocument();
    });
  });

  it("switches between color picker and dropdown for text color", async () => {
    render(<Banner />);
    expect(
      screen.getByLabelText("Text Color", { selector: 'input[type="color"]' })
    ).toBeInTheDocument();

    const useDropdownButton = screen.getByLabelText(
      "Switch to dropdown for text color selection"
    );
    await user.click(useDropdownButton);

    const selectInner = screen.getByTestId("text-color-select");
    expect(selectInner).toBeInTheDocument();

    const usePickerButton = screen.getByLabelText(
      "Switch to color picker for text color selection"
    );
    await user.click(usePickerButton);
    expect(
      screen.getByLabelText("Text Color", { selector: 'input[type="color"]' })
    ).toBeInTheDocument();
  });

  it("renders with correct ARIA attributes", () => {
    render(<Banner />);
    const banner = screen.getByRole("banner", {
      name: "Customizable banner describing my love for intellectual conversations",
    });
    expect(banner).toHaveAttribute(
      "aria-roledescription",
      "Customizable advertisement banner"
    );
    expect(banner).toHaveAttribute("tabindex", "0");

    const dismissButton = screen.getByLabelText(
      "Dismiss the customizable banner"
    );
    expect(dismissButton).toHaveAttribute(
      "aria-label",
      "Dismiss the customizable banner"
    );

    const titleHeading = screen.getByRole("heading", { level: 1 });
    expect(titleHeading).toHaveAttribute("aria-live", "polite");

    const bodyText = screen.getByText(/I love communicating with people/i);
    expect(bodyText).toHaveAttribute("aria-live", "polite");

    const languageSelect = screen.getByLabelText("Language");
    expect(languageSelect).toHaveAttribute(
      "aria-labelledby",
      "language-select-label"
    );

    const titleInput = screen.getByLabelText("Banner Title");
    expect(titleInput).toHaveAttribute(
      "aria-describedby",
      "customize-banner-heading"
    );

    const bodyInput = screen.getByLabelText("Banner Body");
    expect(bodyInput).toHaveAttribute(
      "aria-describedby",
      "customize-banner-heading"
    );

    const backgroundSelect = screen.getByLabelText("Change Background");
    expect(backgroundSelect).toHaveAttribute(
      "aria-labelledby",
      "background-select-label"
    );

    const textColorInput = screen.getByLabelText("Text Color", {
      selector: 'input[type="color"]',
    });
    expect(textColorInput).toHaveAttribute(
      "aria-labelledby",
      "text-color-label"
    );

    const fontSelect = screen.getByLabelText("Choose Font");
    expect(fontSelect).toHaveAttribute("aria-labelledby", "font-select-label");

    const uploadInput = screen.getByLabelText("Upload Background Image", {
      selector: "input",
    });
    expect(uploadInput).toHaveAttribute("aria-labelledby", "upload-bg-label");

    const opacitySlider = screen.getByRole("slider", {
      name: "Overlay Opacity",
    });
    expect(opacitySlider).toHaveAttribute(
      "aria-labelledby",
      "overlay-opacity-label"
    );
  });
});
