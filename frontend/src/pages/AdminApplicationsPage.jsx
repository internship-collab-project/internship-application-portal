import NavBarAdminDashboard from '../components/NavBarAdminDashboard';

const AdminApplicationsPage = () => {
  return (
    <>
      <NavBarAdminDashboard />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-[#2687AD] mb-6">Submitted Internship Applications</h1>
        <p className="text-gray-600 mb-4">This page will list all applications submitted by users. You’ll be able to view, sort, and take action on each one.</p>

        {/* Placeholder for application data */}
        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 text-gray-500 italic">
          Application table or list goes here...
        </div>
      </div>
    </>
  );
};

export default AdminApplicationsPage;
