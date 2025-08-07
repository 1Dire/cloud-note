import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Tag from "./pages/Tag.jsx";
import Day1 from "./pages/day/Day1.jsx";
import Day2 from "./pages/day/Day2.jsx";
import Day3 from "./pages/day/Day3.jsx";
import Day4 from "./pages/day/Day4.jsx";
import Day5 from "./pages/day/Day5.jsx";
import Day6 from "./pages/day/Day6.jsx";
import Day7 from "./pages/day/Day7.jsx";
import autoNoteRoutes from "./routes/autoNoteRoutes.jsx"; // 자동 note 라우트

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Tag />} />
                    <Route path="day1" element={<Day1 />} />
                    <Route path="day2" element={<Day2 />} />
                    <Route path="day3" element={<Day3 />} />
                    <Route path="day4" element={<Day4 />} />
                    <Route path="day5" element={<Day5 />} />
                    <Route path="day6" element={<Day6 />} />
                    <Route path="day7" element={<Day7 />} />

                    {/* 자동 라우트 주입 */}
                    {autoNoteRoutes.map((route, i) => (
                        <Route key={i} path={route.path} element={route.element} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
