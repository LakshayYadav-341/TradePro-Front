import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFount";
import AllStocks from "./pages/AllStocks";
import MarketTopList from "./components/Market/MarketTopData";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute children={<Dashboard/>} />}
                />
                <Route
                    path="/trade"
                    element={<ProtectedRoute children={<Trade/>} />}
                />
                <Route
                    path="/analytics"
                    element={<ProtectedRoute children={<Analytics/>} />}
                />
                <Route
                    path="/stocks"
                    element={<ProtectedRoute children={<AllStocks/>} />}
                />
                <Route
                    path="/top-gainer"
                    element={<ProtectedRoute children={<MarketTopList type="TOP_GAINERS"/>} />}
                />
                <Route
                    path="/top-loser"
                    element={<ProtectedRoute children={<MarketTopList type="TOP_LOSERS"/>} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
