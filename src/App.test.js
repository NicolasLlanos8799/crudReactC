import { render, screen } from "@testing-library/react";
import App from "./App";
import AppAct from "./AppAct";

test("renders learn react link", () => {
  render(<App />);
  render(<AppAct />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
