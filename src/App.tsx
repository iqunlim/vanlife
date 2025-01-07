import "./App.css";
import Main from "./components/Main";
import About from "./components/About";
import Container from "./components/Container";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
