import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import ModalState from "./context/modal/ModalState";
import UiState from "./context/ui/UiState";
import { routes } from "./routes";
const router = createBrowserRouter(routes);
function App() {
  return (
    <UiState>
    <ModalState>
      <RouterProvider router={router} />
    </ModalState>
    </UiState>
  );
}
export default App;