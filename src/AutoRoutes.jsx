import { Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Tag from "@/pages/Tag";
import Page0 from "@/pages/day/Day1.jsx";
import Page1 from "@/pages/day/Day2.jsx";
import Page2 from "@/pages/day/Day3.jsx";
import Page3 from "@/pages/day/Day4.jsx";
import Page4 from "@/pages/day/Day5.jsx";
import Page5 from "@/pages/day/Day6.jsx";
import Page6 from "@/pages/day/Day7.jsx";
import Page7 from "@/pages/blog/Post1.jsx";
import Page8 from "@/pages/blog/Post2.jsx";
import Page9 from "@/pages/blog/Post3.jsx";
import Page10 from "@/pages/blog/Post4.jsx";
import Page11 from "@/pages/blog/Post5.jsx";
import Page12 from "@/pages/blog/Post6.jsx";
import Page13 from "@/pages/blog/post7.jsx";
import Page14 from "@/pages/note/AffinityAntiAffinity.jsx";
import Page15 from "@/pages/note/ConfigMapNginxProxy.jsx";
import Page16 from "@/pages/note/CreateEC2.jsx";
import Page17 from "@/pages/note/CreateRDS.jsx";
import Page18 from "@/pages/note/ExternalDNSIngress.jsx";
import Page19 from "@/pages/note/HPA.jsx";
import Page20 from "@/pages/note/HealthCheck.jsx";
import Page21 from "@/pages/note/KopsOnAWS.jsx";
import Page22 from "@/pages/note/KopsSetupGuide.jsx";
import Page23 from "@/pages/note/KubernetesAdvancedDemo.jsx";
import Page24 from "@/pages/note/KubernetesConfigMap.jsx";
import Page25 from "@/pages/note/KubernetesDNSDiscovery.jsx";
import Page26 from "@/pages/note/KubernetesDashboard.jsx";
import Page27 from "@/pages/note/KubernetesIngress.jsx";
import Page28 from "@/pages/note/KubernetesSummary.jsx";
import Page29 from "@/pages/note/KubernetesVolume.jsx";
import Page30 from "@/pages/note/LivenessReadiness.jsx";
import Page31 from "@/pages/note/PodAffinityAntiAffinity.jsx";
import Page32 from "@/pages/note/PodAndService.jsx";
import Page33 from "@/pages/note/PodLifecycle.jsx";
import Page34 from "@/pages/note/PodPreset.jsx";
import Page35 from "@/pages/note/PodStatus.jsx";
import Page36 from "@/pages/note/RdsConnection.jsx";
import Page37 from "@/pages/note/ReplicaSetAndDeployment.jsx";
import Page38 from "@/pages/note/ReplicationControllerDemo.jsx";
import Page39 from "@/pages/note/SSHConection.jsx";
import Page40 from "@/pages/note/Secret.jsx";
import Page41 from "@/pages/note/ServiceDiscoveryDemo.jsx";
import Page42 from "@/pages/note/StatefulSetCassandra.jsx";
import Page43 from "@/pages/note/TaintsAndTolerations.jsx";
import Page44 from "@/pages/note/VolumeProvisioning.jsx";
import Page45 from "@/pages/note/WhatIsCloud.jsx";
import Page46 from "@/pages/note/WhatIsDocker.jsx";
import Page47 from "@/pages/note/WhatIsKubernetes.jsx";
import Page48 from "@/pages/note/WhatIsMinikube.jsx";
import Page49 from "@/pages/note/WordPressDemo.jsx";

function AutoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Tag />} />
                <Route path="/day1" element={<Page0 />} />
                <Route path="/day2" element={<Page1 />} />
                <Route path="/day3" element={<Page2 />} />
                <Route path="/day4" element={<Page3 />} />
                <Route path="/day5" element={<Page4 />} />
                <Route path="/day6" element={<Page5 />} />
                <Route path="/day7" element={<Page6 />} />
                <Route path="/post1" element={<Page7 />} />
                <Route path="/post2" element={<Page8 />} />
                <Route path="/post3" element={<Page9 />} />
                <Route path="/post4" element={<Page10 />} />
                <Route path="/post5" element={<Page11 />} />
                <Route path="/post6" element={<Page12 />} />
                <Route path="/post7" element={<Page13 />} />
                <Route path="/affinityAntiAffinity" element={<Page14 />} />
                <Route path="/configMapNginxProxy" element={<Page15 />} />
                <Route path="/createEC2" element={<Page16 />} />
                <Route path="/createRDS" element={<Page17 />} />
                <Route path="/externalDNSIngress" element={<Page18 />} />
                <Route path="/hPA" element={<Page19 />} />
                <Route path="/healthCheck" element={<Page20 />} />
                <Route path="/kopsOnAWS" element={<Page21 />} />
                <Route path="/kopsSetupGuide" element={<Page22 />} />
                <Route path="/kubernetesAdvancedDemo" element={<Page23 />} />
                <Route path="/kubernetesConfigMap" element={<Page24 />} />
                <Route path="/kubernetesDNSDiscovery" element={<Page25 />} />
                <Route path="/kubernetesDashboard" element={<Page26 />} />
                <Route path="/kubernetesIngress" element={<Page27 />} />
                <Route path="/kubernetesSummary" element={<Page28 />} />
                <Route path="/kubernetesVolume" element={<Page29 />} />
                <Route path="/livenessReadiness" element={<Page30 />} />
                <Route path="/podAffinityAntiAffinity" element={<Page31 />} />
                <Route path="/podAndService" element={<Page32 />} />
                <Route path="/podLifecycle" element={<Page33 />} />
                <Route path="/podPreset" element={<Page34 />} />
                <Route path="/podStatus" element={<Page35 />} />
                <Route path="/rdsConnection" element={<Page36 />} />
                <Route path="/replicaSetAndDeployment" element={<Page37 />} />
                <Route path="/replicationControllerDemo" element={<Page38 />} />
                <Route path="/sSHConection" element={<Page39 />} />
                <Route path="/secret" element={<Page40 />} />
                <Route path="/serviceDiscoveryDemo" element={<Page41 />} />
                <Route path="/statefulSetCassandra" element={<Page42 />} />
                <Route path="/taintsAndTolerations" element={<Page43 />} />
                <Route path="/volumeProvisioning" element={<Page44 />} />
                <Route path="/whatIsCloud" element={<Page45 />} />
                <Route path="/whatIsDocker" element={<Page46 />} />
                <Route path="/whatIsKubernetes" element={<Page47 />} />
                <Route path="/whatIsMinikube" element={<Page48 />} />
                <Route path="/wordPressDemo" element={<Page49 />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default AutoRoutes;