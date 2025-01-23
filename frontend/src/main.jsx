import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext.jsx";

import Home from "./routers/Home.jsx";
import Register from "./routers/Register.jsx";
import Login from "./routers/Login.jsx";
import RouterProtectedUserExist from "./components/RouterProtectedUserExist.jsx";
import RouterProtectedUserNotExist from "./components/RouterProtectedUserNotExist.jsx";
import Profile from "./routers/Profile.jsx";
import NewProject from "./routers/NewProject.jsx";
import Project from "./routers/Project.jsx";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <RouterProtectedUserExist element={<Home />} />,
            },
            {
                path: "/new",
                element: <RouterProtectedUserExist element={<NewProject />} />,
            },
            {
                path: "/profile",
                element: <RouterProtectedUserExist element={<Profile />} />,
            },
            {
                path: "/:id",
                element: <RouterProtectedUserExist element={<Project />} />,
            },
            {
                path: "/register",
                element: <RouterProtectedUserNotExist element={<Register />} />,
            },
            {
                path: "/login",
                element: <RouterProtectedUserNotExist element={<Login />} />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserContextProvider>
            <RouterProvider router={routers} />
        </UserContextProvider>
    </StrictMode>
);
