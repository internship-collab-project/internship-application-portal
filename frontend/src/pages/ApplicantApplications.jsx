import { useState, useEffect } from 'react';
import Axios from '../services/Axios';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';
import { toast } from 'react-toastify';

const ApplicantApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicantID = localStorage.getItem('applicantID');

      if (!applicantID) {
        toast.error('No applications found! Please try again.');
        return;
      }

      try {
        const response = await Axios.get(`/applications/applicant/${applicantID}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load your applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch ((status || 'pending').toLowerCase()) {
      case 'accepted':
        return 'text-green-700 bg-green-100 px-2 py-1 rounded';
      case 'rejected':
        return 'text-red-700 bg-red-100 px-2 py-1 rounded';
      default:
        return 'text-yellow-800 bg-yellow-100 px-2 py-1 rounded';
    }
  };

  return (
    <>
      <NavBarApplicantDashboard />
      <section className="bg-[#E8F0F5] min-h-screen">
        <div className="container m-auto max-w-6xl py-24">
          <h1 className="text-3xl font-bold mb-8">My Applications</h1>
          {loading ? (
            <p className="text-lg text-gray-600">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-lg text-gray-600">You have not submitted any applications yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold mb-2">{app.job_title}</h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Company:</strong> Presidio
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Status:</strong>{' '}
                    <span className={getStatusStyle(app.status)}>{app.status || 'Pending'}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Submitted:</strong> {new Date(app.date_applied).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ApplicantApplications;