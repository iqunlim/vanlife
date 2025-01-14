import React from "react";
export default function Container({ children }: React.PropsWithChildren) {
  // Forcing 550px width for later show-off page
  return <div className="container">{children}</div>;
}
