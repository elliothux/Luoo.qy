import * as React from "react";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { MiniPlayer } from "./components/mini-player";
import { Category } from "./pages/category";
import { Vols } from "./pages/vols";
import { Vol } from "./pages/vol";
import { Singles } from "./pages/singles";
import { Single } from "./pages/single";
import { Articles } from "./pages/articles";
import { Article } from "./pages/article";
import { Player } from "./pages/player";

function App() {
  return (
    <>
      <Background key={0} />
      <Nav key={1} />
      <MiniPlayer />
      <Category />
      <Vols />
      <Vol />
      <Singles />
      <Single />
      <Articles />
      <Article />
      <Player />
    </>
  );
}

export { App };
