import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import DetailsScreen from "./pages/details/DetailsScreen";
import FavoritesScreen from "./pages/favorites/FavoritesScreen";

// app routes
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path="/" exact />
                <Route element={<DetailsScreen />} path="/details" exact />
                <Route element={<FavoritesScreen />} path="/favorites" exact />
            </Routes>
        </BrowserRouter>
    )
}