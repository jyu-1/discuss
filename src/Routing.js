import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/Main";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Login />,
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
