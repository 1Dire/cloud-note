import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Tag from "./pages/Tag.jsx";
import Day1 from "./pages/Day/Day1.jsx";
import WhatIsCloud from "./pages/Note/WhatIsCloud.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 부모 라우트: Layout 안에 Outlet 포함 */}
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Tag/>}/>
                    <Route path="/day1" element={<Day1/>}/>
                    <Route path="/whatIsCloud" element={<WhatIsCloud/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
