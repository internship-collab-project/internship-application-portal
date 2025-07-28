import {NavLink} from 'react-router-dom';
import PresidioLogo from '../assets/PresidioLogo.png';
//import ApplicantProfile from '../pages/ApplicantProfile.jsx';
const NavBarApplicantDashboard = () => {

  return (
    <nav className="bg-white p-4 shadow-md">
        <div className="max-w-full mx-auto flex items-center justify-between">
            {/* Logo on the left */}
            <NavLink className="flex items-center" to="/applicantDashboard">
                <img className="h-16 w-auto" src={PresidioLogo} alt="Internship Portal" />
            </NavLink>
            
            {/* Navigation links on the right */}
            <div className="flex space-x-10">
                <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/applicantProfile">
                    Profile
                </NavLink>
                <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/internships">
                    Internships
                </NavLink>
                <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/applications">
                    Applications
                </NavLink>
                {/* Logout link - takes user back to login page */}
                <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/"> 
                    Logout
                </NavLink>
            </div>
        </div>
    </nav>
  )
}

export default NavBarApplicantDashboard;