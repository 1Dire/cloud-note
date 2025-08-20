import { BrowserRouter, Routes, Route } from "react-router-dom";
import AutoRoutes from "./AutoRoutes";



function App() {
    return (
        <BrowserRouter>
            <AutoRoutes />
        </BrowserRouter>
    );
}

export default App;
