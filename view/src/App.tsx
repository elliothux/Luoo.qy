import * as React from "react";
import { ToastContainer, ToastPosition } from "react-toastify";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { Vols } from "./pages/vols";
import { VolTypes } from "./pages/vol-types";
import { Vol } from "./pages/vol";
import { Singles } from "./pages/singles";
import { Single } from "./pages/single";

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
