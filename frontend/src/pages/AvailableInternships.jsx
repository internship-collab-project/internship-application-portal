import { useState, useEffect } from 'react';
import Axios from '../services/Axios';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';
import { toast } from 'react-toastify';

const AvailableInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await Axios.get('/jobs');
        setInternships(response.data || []);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast.error('Failed to load internships');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <>
      <NavBarApplicantDashboard />
      <section className="bg-[#E8F0F5] min-h-screen">
        <div className="container m-auto max-w-6xl py-24">
          <h1 className="text-3xl font-bold mb-8">Available Internships</h1>

          {loading ? (
            <p className="text-lg text-gray-600">Loading internships...</p>
          ) : internships.length === 0 ? (
            <p className="text-lg text-gray-600">No internships available at the moment.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {internships.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Posted:</strong> {new Date(job.date_posted).toLocaleDateString()}
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

export default AvailableInternships;
