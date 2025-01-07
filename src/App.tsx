import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Container from "./components/Container";
import Vans from "./pages/Vans";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./server";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
