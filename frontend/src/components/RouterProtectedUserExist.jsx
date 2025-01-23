import { Navigate } from "react-router-dom";
import { useUserContext } from "../hook/useUserContext";

const RouterProtectedUserExist = ({ element }) => {
    const { user } = useUserContext();

    return user ? element : <Navigate to={"/login"} replace />;
};

export default RouterProtectedUserExist;
