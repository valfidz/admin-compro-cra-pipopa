import Sidebar from "../components/dashboard/sidebar";
import { LandingDashboard } from "../components/dashboard/landing";

export const Dashboard = () => {
    return (
        <>
            <Sidebar childComponent={<LandingDashboard />} />
        </>
    )
} 