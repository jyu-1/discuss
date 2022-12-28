import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Chat from "./routes/Chat";
import Welcome from "./components/Welcome";
import MainChat from "./components/MainChat";
import PrivateRoutes from "./routes/PrivateRoutes";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "chat",
                    element: <PrivateRoutes />,
                    children: [
                        {
                            element: <Chat />,
                            children: [
                                {
                                    index: true,
                                    element: <Welcome />,
                                },
                                {
                                    path: ":channelId",
                                    element: <MainChat />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    { basename: "/discuss" }
);

const Routing = () => {
    return <RouterProvider router={router} />;
};

export default Routing;
