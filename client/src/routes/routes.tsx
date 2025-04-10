import { createBrowserRouter } from "react-router-dom";
import Lobby from "../pages/lobby";
import Main from "../pages/main";

export const routes = createBrowserRouter([
    {path: "/", element: <Lobby/>},
    {path: "/game", element: <Main/>}
])