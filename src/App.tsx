import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import About from "./pages/Vans/About";
import Main from "./pages/Main";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./pages/Host/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import HostVans from "./pages/Host/HostVans";
import Details from "./pages/Host/HostDetails";
import HostVanDetailsLayout from "./pages/Host/HostDetailsLayout";
import HostPhotos from "./pages/Host/HostPhotos";
import HostPricing from "./pages/Host/HostPricing";
import NotFoundPage from "./pages/NotFound";

import "./server";
import Login from "./pages/Auth/Login";
import AuthRequired from "./pages/Auth/AuthRequired";

function App(): React.ReactElement {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetail />} />
            {/* <Route element={<AuthRequired />}> */}
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetailsLayout />}>
                <Route index element={<Details />} />
                <Route path="details" element={<Details />} />
                <Route path="pricing" element={<HostPricing />} />
                <Route path="photos" element={<HostPhotos />} />
              </Route>
            </Route>
            {/* </Route> */}
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
