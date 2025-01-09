import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import About from "./pages/About";
import Main from "./pages/Main";
import Vans from "./pages/Vans";
import "./server";
import VanDetail from "./pages/VanDetail";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
