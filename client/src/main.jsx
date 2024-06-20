// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./context/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  test("Render UP", () => {
    render(
      <Router>
        <UserProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </UserProvider>
      </Router>
    );
    const linkElement = screen.getByText(/Saiba Mais/i);

    expect(linkElement).toBeInTheDocument;
  })

  // </React.StrictMode>
);
