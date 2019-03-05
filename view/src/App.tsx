import * as React from "react";
import { ToastContainer, ToastPosition } from "react-toastify";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { MiniPlayer } from "./components/mini-player";
import { VolTypes } from "./pages/vol-types";
import { Vols } from "./pages/vols";
import { Vol } from "./pages/vol";
import { Singles } from "./pages/singles";
import { Single } from "./pages/single";
import { Articles } from "./pages/articles";
import { Article } from "./pages/article";
import { User } from "./pages/user";
import { Player } from "./pages/player";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Background />
      <Nav />
      <MiniPlayer />
      <VolTypes />
      <Vols />
      <Vol />
      <Singles />
      <Single />
      <Articles />
      <Article />
      <User />
      <Player />
      <ToastContainer
        position={ToastPosition.BOTTOM_RIGHT}
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
}

export { App };
