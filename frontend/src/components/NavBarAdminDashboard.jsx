import {NavLink} from 'react-router-dom';
import PresidioLogo from '../assets/PresidioLogo.png';

const NavBarAdminDashboard = () => {
  return (
  <nav className="bg-white p-4 shadow-md">
          <div className="max-w-full mx-auto flex items-center justify-between">
              {/* Logo on the left */}
              <NavLink className="flex items-center" to="/applicantDashboard">
                  <img className="h-16 w-auto" src={PresidioLogo} alt="Internship Portal" />
              </NavLink>
              
              {/* Navigation links on the right */}
              <div className="flex space-x-10">
                  <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/admin-profile">
                      Profile
                  </NavLink>
                  <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/list-internships">
                      List Internships
                  </NavLink>
                  <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/applications-admin-access">
                      View Applications
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

export default NavBarAdminDashboard

