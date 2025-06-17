import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Tag from "./pages/Tag.jsx";
import Day1 from "./pages/day/Day1.jsx";
import Day2 from "./pages/day/Day2.jsx";
import WhatIsCloud from "./pages/note/WhatIsCloud.jsx";
import CreateEC2 from "./pages/note/CreateEC2.jsx";
import SSHConection from "./pages/note/SSHConection.jsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 부모 라우트: Layout 안에 Outlet 포함 */}
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Tag/>}/>
                    <Route path="/day1" element={<Day1/>}/>
                    <Route path="/day2" element={<Day2/>}/>
                    <Route path="/whatIsCloud" element={<WhatIsCloud/>}/>
                    <Route path="/createEC2" element={<CreateEC2/>}/>
                    <Route path="/sshConection" element={<SSHConection/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
