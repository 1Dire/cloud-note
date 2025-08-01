import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Tag from "./pages/Tag.jsx";
import Day1 from "./pages/day/Day1.jsx";
import Day2 from "./pages/day/Day2.jsx";
import Day3 from "./pages/day/Day3.jsx";
import Day4 from "./pages/day/Day4.jsx";
import Day5 from "./pages/day/Day5.jsx";
import Day6 from "./pages/day/Day6.jsx";
import Day7 from "./pages/day/Day7.jsx";
import WhatIsCloud from "./pages/note/WhatIsCloud.jsx";
import CreateEC2 from "./pages/note/CreateEC2.jsx";
import SSHConection from "./pages/note/SSHConection.jsx";
import CreateRDS from "./pages/note/CreateRDS.jsx";
import RDSConnection from "./pages/note/RDSConnection.jsx";
import WhatIsDocker from "./pages/note/WhatIsDocker.jsx";
import WhatIsKubernetes from "./pages/note/WhatIsKubernetes.jsx";
import PodAndService from "./pages/note/PodAndService.jsx";
import ReplicaSetAndDeployment from "./pages/note/ReplicaSetAndDeployment.jsx";
import KubernetesSummary from "./pages/note/KubernetesSummary.jsx";
import WhatIsMinikube from "./pages/note/WhatIsMinikube.jsx";
import KopsOnAWS from "./pages/note/KopsOnAWS.jsx";
import KopsSetupGuide from "./pages/note/KopsSetupGuide.jsx";
import KubernetesAdvancedDemo from "./pages/note/KubernetesAdvancedDemo.jsx";
import ReplicationControllerDemo from "./pages/note/ReplicationControllerDemo";
import Healthcheck from "./pages/note/HealthCheck.jsx";
import LivenessReadiness from "./pages/note/LivenessReadiness.jsx";
import PodStatus from "./pages/note/PodStatus.jsx";
import PodLifecycle from "./pages/note/PodLifecycle.jsx";

function App() {
    return (<BrowserRouter>
        <Routes>
            {/* 부모 라우트: Layout 안에 Outlet 포함 */}
            <Route path="/" element={<Layout/>}>
                <Route index element={<Tag/>}/>
                <Route path="/day1" element={<Day1/>}/>
                <Route path="/day2" element={<Day2/>}/>
                <Route path="/day3" element={<Day3/>}/>
                <Route path="/day4" element={<Day4/>}/>
                <Route path="/day5" element={<Day5/>}/>
                <Route path="/day6" element={<Day6/>}/>
                <Route path="/day7" element={<Day7/>}/>
                <Route path="/whatIsCloud" element={<WhatIsCloud/>}/>
                <Route path="/createEC2" element={<CreateEC2/>}/>
                <Route path="/sshConection" element={<SSHConection/>}/>
                <Route path="/createRDS" element={<CreateRDS/>}/>
                <Route path="/rdsConection" element={<RDSConnection/>}/>
                <Route path="/whatIsDocker" element={<WhatIsDocker/>}/>
                <Route path="/whatIsKubernetes" element={<WhatIsKubernetes/>}/>
                <Route path="/podAndService" element={<PodAndService/>}/>
                <Route path="/replicaSetAndDeployment" element={<ReplicaSetAndDeployment/>}/>
                <Route path="/kubernetesSummary" element={<KubernetesSummary/>}/>
                <Route path="/whatIsMinikube" element={<WhatIsMinikube/>}/>
                <Route path="/kopsOnAWS" element={<KopsOnAWS/>}/>
                <Route path="/kopsSetupGuide" element={<KopsSetupGuide/>}/>
                <Route path="/kubernetesAdvancedDemo" element={<KubernetesAdvancedDemo/>}/>
                <Route path="/replicationControllerDemo" element={<ReplicationControllerDemo/>}/>
                <Route path="/healthcheck" element={<Healthcheck/>}/>
                <Route path="/livenessReadiness" element={<LivenessReadiness/>}/>
                <Route path="/podStatus" element={<PodStatus/>}/>
                <Route path="/podLifecycle" element={<PodLifecycle/>}/>

            </Route>
        </Routes>
    </BrowserRouter>);
}

export default App;
