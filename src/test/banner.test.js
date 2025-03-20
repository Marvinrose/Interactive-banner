import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "../components/Banner";

describe("Banner Component", () => {
  it("renders the banner with default quote", () => {
    render(<Banner />);
    expect(screen.getByText(/Great minds discuss ideas/i)).toBeInTheDocument();
  });

  it("updates the quote when the button is clicked", async () => {
    render(<Banner />);
    const input = screen.getByLabelText(/Enter a new quote/i);
    const button = screen.getByRole("button", { name: /Change Quote/i });

    fireEvent.change(input, { target: { value: "New Test Quote" } });
    fireEvent.click(button);

    await screen.findByText("New Test Quote"); // Wait for state update
    expect(screen.getByText("New Test Quote")).toBeInTheDocument();
  });

  it("opens Snackbar when quote is updated", async () => {
    render(<Banner />);
    const input = screen.getByLabelText(/Enter a new quote/i);
    const button = screen.getByRole("button", { name: /Change Quote/i });

    fireEvent.change(input, { target: { value: "Another Quote" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(/Quote updated successfully!/i)
      ).toBeInTheDocument()
    );
  });
});
