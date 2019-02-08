import * as React from "react";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { MiniPlayer } from "./components/mini-player";
import { Category } from "./pages/category";
import { Vols } from "./pages/vols";
import { Vol } from "./pages/vol";

function App() {
  return (
    <>
      <Background key={0} />
      <Nav key={1} />
      <MiniPlayer />
      <Vols />
      <Vol />
      <Category />
    </>
  );
}

export { App };
