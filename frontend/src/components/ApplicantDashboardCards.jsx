import { Link } from "react-router-dom";
import Card from "./CardApplicant";

const ApplicantDashboardCards = () => {
  return (
    <section className="py-30">
        <div className="container-xl lg:container m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                <div className="h-40 flex flex-col justify-center text-center">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p>Manage your personal information.</p>
                    <Link to="/applicantProfile" className="text-[#2687AD] hover:underline mt-2 inline-block">Go to Profile</Link>
                </div>
                </Card>
                <Card>
                <div className="h-40 flex flex-col justify-center text-center">
                    <h2 className="text-xl font-semibold mb-2">Applications</h2>
                    <p>View the status of your submitted applications.</p>
                    <Link to="/applications" className="text-[#2687AD] hover:underline mt-2 inline-block">Go to Applications</Link>
                </div>
                </Card>
                <Card>
                <div className="h-40 flex flex-col justify-center text-center">
                    <h2 className="text-xl font-semibold mb-2">Internships</h2>
                    <p>Browse available internships.</p>
                    <Link to="/internships" className="text-[#2687AD] hover:underline mt-2 inline-block">View Internships</Link>
                </div>
                </Card>
            </div>
        </div>
    </section>
  )
}

export default ApplicantDashboardCards