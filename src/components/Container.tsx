import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Container({
  children,
}: React.PropsWithChildren): React.ReactElement {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
