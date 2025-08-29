import { Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Tag from "@/pages/Tag";
import Home from "@/pages/Home";
import Page0 from "@/pages/plan/Day1.jsx";
import Page1 from "@/pages/plan/Day2.jsx";
import Page2 from "@/pages/plan/Day3.jsx";
import Page3 from "@/pages/plan/Day4.jsx";
import Page4 from "@/pages/plan/Day5.jsx";
import Page5 from "@/pages/plan/Day6.jsx";
import Page6 from "@/pages/plan/Day7.jsx";
import Page7 from "@/pages/ecs/Post1.jsx";
import Page8 from "@/pages/ecs/Post2.jsx";
import Page9 from "@/pages/ecs/Post3.jsx";
import Page10 from "@/pages/ecs/Post4.jsx";
import Page11 from "@/pages/ecs/Post5.jsx";
import Page12 from "@/pages/ecs/Post6.jsx";
import Page13 from "@/pages/ecs/post7.jsx";
import Page14 from "@/pages/ecs/Post8.jsx";
import Page15 from "@/pages/ecs/Post9.jsx";
import Page16 from "@/pages/ecs/Post10.jsx";
import Page17 from "@/pages/kubernetes/AffinityAntiAffinity.jsx";
import Page18 from "@/pages/kubernetes/ConfigMapNginxProxy.jsx";
import Page19 from "@/pages/kubernetes/ExternalDNSIngress.jsx";
import Page20 from "@/pages/kubernetes/HealthCheck.jsx";
import Page21 from "@/pages/kubernetes/HPA.jsx";
import Page22 from "@/pages/kubernetes/KopsOnAWS.jsx";
import Page23 from "@/pages/kubernetes/KopsSetupGuide.jsx";
import Page24 from "@/pages/kubernetes/KubernetesAdvancedDemo.jsx";
import Page25 from "@/pages/kubernetes/KubernetesConfigMap.jsx";
import Page26 from "@/pages/kubernetes/KubernetesDashboard.jsx";
import Page27 from "@/pages/kubernetes/KubernetesDNSDiscovery.jsx";
import Page28 from "@/pages/kubernetes/KubernetesIngress.jsx";
import Page29 from "@/pages/kubernetes/KubernetesSummary.jsx";
import Page30 from "@/pages/kubernetes/KubernetesVolume.jsx";
import Page31 from "@/pages/kubernetes/LivenessReadiness.jsx";
import Page32 from "@/pages/kubernetes/PodAffinityAntiAffinity.jsx";
import Page33 from "@/pages/kubernetes/PodAndService.jsx";
import Page34 from "@/pages/kubernetes/PodLifecycle.jsx";
import Page35 from "@/pages/kubernetes/PodPreset.jsx";
import Page36 from "@/pages/kubernetes/PodStatus.jsx";
import Page37 from "@/pages/kubernetes/ReplicaSetAndDeployment.jsx";
import Page38 from "@/pages/kubernetes/ReplicationControllerDemo.jsx";
import Page39 from "@/pages/kubernetes/Secret.jsx";
import Page40 from "@/pages/kubernetes/ServiceDiscoveryDemo.jsx";
import Page41 from "@/pages/kubernetes/StatefulSetCassandra.jsx";
import Page42 from "@/pages/kubernetes/TaintsAndTolerations.jsx";
import Page43 from "@/pages/kubernetes/VolumeProvisioning.jsx";
import Page44 from "@/pages/kubernetes/WhatIsDocker.jsx";
import Page45 from "@/pages/kubernetes/WhatIsKubernetes.jsx";
import Page46 from "@/pages/kubernetes/WhatIsMinikube.jsx";
import Page47 from "@/pages/kubernetes/WordPressDemo.jsx";
import Page48 from "@/pages/cloud/CreateEC2.jsx";
import Page49 from "@/pages/cloud/CreateRDS.jsx";
import Page50 from "@/pages/cloud/RdsConnection.jsx";
import Page51 from "@/pages/cloud/SSHConection.jsx";
import Page52 from "@/pages/cloud/WhatIsCloud.jsx";
import Page53 from "@/pages/gitAction/Post1.jsx";
import Page54 from "@/pages/gitAction/Post2.jsx";
import Page55 from "@/pages/gitAction/Post3.jsx";
import Page56 from "@/pages/gitAction/Post4.jsx";

function AutoRoutes() {
    return (
        <Routes>
           
            <Route path="/test" element={<Home />} />
            <Route path="/" element={<Layout />}>
             <Route path="/" element={<Home />} />
                <Route path="/tag" element={<Tag />} />
                <Route path="/plan/Day1" element={<Page0 />} />
                <Route path="/plan/Day2" element={<Page1 />} />
                <Route path="/plan/Day3" element={<Page2 />} />
                <Route path="/plan/Day4" element={<Page3 />} />
                <Route path="/plan/Day5" element={<Page4 />} />
                <Route path="/plan/Day6" element={<Page5 />} />
                <Route path="/plan/Day7" element={<Page6 />} />
                <Route path="/ecs/Post1" element={<Page7 />} />
                <Route path="/ecs/Post2" element={<Page8 />} />
                <Route path="/ecs/Post3" element={<Page9 />} />
                <Route path="/ecs/Post4" element={<Page10 />} />
                <Route path="/ecs/Post5" element={<Page11 />} />
                <Route path="/ecs/Post6" element={<Page12 />} />
                <Route path="/ecs/post7" element={<Page13 />} />
                <Route path="/ecs/Post8" element={<Page14 />} />
                <Route path="/ecs/Post9" element={<Page15 />} />
                <Route path="/ecs/Post10" element={<Page16 />} />
                <Route path="/kubernetes/AffinityAntiAffinity" element={<Page17 />} />
                <Route path="/kubernetes/ConfigMapNginxProxy" element={<Page18 />} />
                <Route path="/kubernetes/ExternalDNSIngress" element={<Page19 />} />
                <Route path="/kubernetes/HealthCheck" element={<Page20 />} />
                <Route path="/kubernetes/HPA" element={<Page21 />} />
                <Route path="/kubernetes/KopsOnAWS" element={<Page22 />} />
                <Route path="/kubernetes/KopsSetupGuide" element={<Page23 />} />
                <Route path="/kubernetes/KubernetesAdvancedDemo" element={<Page24 />} />
                <Route path="/kubernetes/KubernetesConfigMap" element={<Page25 />} />
                <Route path="/kubernetes/KubernetesDashboard" element={<Page26 />} />
                <Route path="/kubernetes/KubernetesDNSDiscovery" element={<Page27 />} />
                <Route path="/kubernetes/KubernetesIngress" element={<Page28 />} />
                <Route path="/kubernetes/KubernetesSummary" element={<Page29 />} />
                <Route path="/kubernetes/KubernetesVolume" element={<Page30 />} />
                <Route path="/kubernetes/LivenessReadiness" element={<Page31 />} />
                <Route path="/kubernetes/PodAffinityAntiAffinity" element={<Page32 />} />
                <Route path="/kubernetes/PodAndService" element={<Page33 />} />
                <Route path="/kubernetes/PodLifecycle" element={<Page34 />} />
                <Route path="/kubernetes/PodPreset" element={<Page35 />} />
                <Route path="/kubernetes/PodStatus" element={<Page36 />} />
                <Route path="/kubernetes/ReplicaSetAndDeployment" element={<Page37 />} />
                <Route path="/kubernetes/ReplicationControllerDemo" element={<Page38 />} />
                <Route path="/kubernetes/Secret" element={<Page39 />} />
                <Route path="/kubernetes/ServiceDiscoveryDemo" element={<Page40 />} />
                <Route path="/kubernetes/StatefulSetCassandra" element={<Page41 />} />
                <Route path="/kubernetes/TaintsAndTolerations" element={<Page42 />} />
                <Route path="/kubernetes/VolumeProvisioning" element={<Page43 />} />
                <Route path="/kubernetes/WhatIsDocker" element={<Page44 />} />
                <Route path="/kubernetes/WhatIsKubernetes" element={<Page45 />} />
                <Route path="/kubernetes/WhatIsMinikube" element={<Page46 />} />
                <Route path="/kubernetes/WordPressDemo" element={<Page47 />} />
                <Route path="/cloud/CreateEC2" element={<Page48 />} />
                <Route path="/cloud/CreateRDS" element={<Page49 />} />
                <Route path="/cloud/RdsConnection" element={<Page50 />} />
                <Route path="/cloud/SSHConection" element={<Page51 />} />
                <Route path="/cloud/WhatIsCloud" element={<Page52 />} />
                <Route path="/gitAction/Post1" element={<Page53 />} />
                <Route path="/gitAction/Post2" element={<Page54 />} />
                <Route path="/gitAction/Post3" element={<Page55 />} />
                <Route path="/gitAction/Post4" element={<Page56 />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default AutoRoutes;