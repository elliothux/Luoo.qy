import * as React from "react";
import { ToastContainer, ToastPosition } from "react-toastify";
import { Nav } from "./components/nav";
import { Background } from "./components/background";
import { Vols } from "./pages/vols";

function App() {
  return (
    <>
      <Background />
      <Nav />
      <Vols />
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
