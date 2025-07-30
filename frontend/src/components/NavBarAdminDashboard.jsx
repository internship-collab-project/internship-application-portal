import { NavLink, useNavigate } from 'react-router-dom';
import PresidioLogo from '../assets/PresidioLogo.png';
import useAuth from '../hooks/useAuth';

const NavBarAdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears auth context and localStorage
    navigate('/'); // redirect to login page
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <NavLink className="flex items-center" to="/adminDashboard">
          <img className="h-16 w-auto" src={PresidioLogo} alt="Internship Portal" />
        </NavLink>

        {/* Navigation links on the right */}
        <div className="flex space-x-10">
          <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/adminApplications">
            Applications
          </NavLink>
          <NavLink className="text-gray-600 hover:text-gray-800 text-lg" to="/postInternship">
            Post Internship
          </NavLink>
          {/* Logout link - triggers logout logic */}
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800 text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdminDashboard;
