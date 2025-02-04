import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Details from "./pages/Host/HostDetails";
import HostVanDetailsLayout from "./pages/Host/HostDetailsLayout";
import HostPhotos from "./pages/Host/HostPhotos";
import HostPricing from "./pages/Host/HostPricing";
import NotFoundPage from "./pages/NotFound";

//import "./api/server";
import Login from "./pages/Auth/Login";
import AuthRequired from "./pages/Auth/AuthRequired";
import { useEffect, useState } from "react";
import Logout from "./pages/Auth/Logout";
import { setupAuthenticator } from "./api/api";
import HostVansOverview from "./pages/Host/HostVansOverview";

function App(): React.ReactElement {

  // Global app authentication state lives here
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Getting data from an API Function instead of wiring firebase straight in to the application
    const unsubscribe = setupAuthenticator(setAuthenticated, setUserId)

    return () => {
      setAuthenticated(false)
      setUserId("")
      unsubscribe()
    };
  }, [])


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
            <Route element={<AuthRequired authState={authenticated} />}>
              <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard hostId={userId} />} />
                <Route path="income" element={<Income hostId={userId} />} />
                <Route path="reviews" element={<Reviews hostId={userId} />} />
                <Route path="vans" element={<HostVansOverview hostId={userId} />} />
                <Route path="vans/:id" element={<HostVanDetailsLayout />}>
                  <Route index element={<Details />} />
                  <Route path="details" element={<Details />} />
                  <Route path="pricing" element={<HostPricing />} />
                  <Route path="photos" element={<HostPhotos />} />
                </Route>
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout authSetter={setAuthenticated} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
