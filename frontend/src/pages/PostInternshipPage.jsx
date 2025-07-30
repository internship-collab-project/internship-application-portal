import { useState } from 'react';
import NavBarAdminDashboard from '../components/NavBarAdminDashboard';

const PostInternshipPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log("Submitting internship:", formData);
  };

  return (
    <>
      <NavBarAdminDashboard />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2687AD] mb-6">Post a New Internship</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            className="w-full p-3 border rounded-md"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />

          <button
            type="submit"
            className="bg-[#2687AD] text-white px-6 py-2 rounded-md hover:bg-transparent hover:text-[#2687AD] border border-[#2687AD]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostInternshipPage;
