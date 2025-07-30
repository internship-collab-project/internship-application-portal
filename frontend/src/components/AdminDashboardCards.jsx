import { NavLink } from 'react-router-dom';

const AdminDashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-[#2687AD] mb-2">View Submitted Applications</h2>
        <p className="text-gray-600 mb-4">Browse and manage all internship applications submitted by students.</p>
        <NavLink to="/admin/applications" className="text-white bg-[#2687AD] px-4 py-2 rounded hover:bg-transparent hover:text-[#2687AD] border border-[#2687AD] transition">
          View Applications
        </NavLink>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-[#2687AD] mb-2">Post New Internship</h2>
        <p className="text-gray-600 mb-4">Create and publish a new internship opportunity to the portal.</p>
        <NavLink to="/admin/post-internship" className="text-white bg-[#2687AD] px-4 py-2 rounded hover:bg-transparent hover:text-[#2687AD] border border-[#2687AD] transition">
          Post Internship
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDashboardCards;
