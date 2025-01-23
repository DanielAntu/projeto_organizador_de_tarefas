import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <div className="app">
            <ToastContainer />
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
