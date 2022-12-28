import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/error.css";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="main">
            <Header />
            <div className="error-page">
                <div className="error-box">
                    <div>Oops!</div>
                    <div>An unexpected error has occured.</div>
                    <div>{error.statusText || error.message}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;
