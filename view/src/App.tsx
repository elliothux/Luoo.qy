import * as React from "react";
import { ToastContainer, ToastPosition } from "react-toastify";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { Vols } from "./pages/vols";
import { VolTypes } from "./pages/vol-types";
import { Vol } from "./pages/vol";
import { Singles } from "./pages/singles";
import { Single } from "./pages/single";
import { Articles } from "./pages/articles";
import { Article } from "./pages/article";

function App() {
  return (
    <>
      <Background />
      <Nav />
      <Vols />
      <VolTypes />
      <Vol />
      <Singles />
      <Single />
      <Articles />
      <Article />
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
