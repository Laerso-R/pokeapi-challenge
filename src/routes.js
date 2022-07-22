import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path="/" exact />
            </Routes>

        </BrowserRouter>
    )
}