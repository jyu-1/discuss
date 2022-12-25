import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="main">
            <Header />
            <div>
                <div>Oops!</div>
                <div>An unexpected error has occured.</div>
                <div>{error.statusText || error.message}</div>
            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;
