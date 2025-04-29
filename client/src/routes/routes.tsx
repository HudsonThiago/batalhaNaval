import { createBrowserRouter } from "react-router-dom";
import Lobby from "../pages/lobby";
import Main from "../pages/SelectionPage";

export const routes = createBrowserRouter([
    {path: "/", element: <Lobby/>}
])