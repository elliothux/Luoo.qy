import * as React from "react";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { Vols } from "./pages/vols";

function App() {
  return (
    <>
      <Background key={0} />
      <Nav key={1} />
      <Vols />
    </>
  );
}

export { App };
