import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoutes = () => {
    const user = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
