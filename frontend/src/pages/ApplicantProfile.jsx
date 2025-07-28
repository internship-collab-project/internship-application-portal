import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../services/Axios';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';

const ApplicantProfile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    university: '',
    major: '',
    graduation_date: '',
    resume: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  //const [profileData, setProfileData] = useState(null); //this will hold the profile data fetched from the backend
  const navigate = useNavigate(); // this will be used to navigate to the applicant dashboard after the profile is created or updated

//mock data for testing purposes
//   useEffect(() => {
//       const fetchProfileData = async () => {
//     // MOCK DATA: Replace this block with your real API call when backend is ready
//     const mockProfile = {
//       first_name: "Jane",
//       last_name: "Doe",
//       email: "jane.doe@example.com",
//       phone: "123-456-7890",
//       university: "Sample University",
//       major: "Computer Science",
//       graduation_date: "2025-05-15",
//       resume: null
//     };
//     setFormData(mockProfile);
//     setProfileExists(true);
//     setIsEditing(false);
// };

    useEffect(() => {
    //for real api
    const fetchProfileData = async () => {
      const applicantID = localStorage.getItem('applicantID'); // Get the applicant's ID from localStorage
      const applicantEmail = localStorage.getItem('applicantEmail');
      if (!applicantID) {
        // If applicantID is missing, set up the form for new profile creation
        setFormData(prev => ({...prev, email: applicantEmail || ''}));
        setProfileExists(false);
        setIsEditing(true);
        return;
      }
      try {
        const response = await Axios.get(`/applicantProfile/id/${applicantID}`);
        if (response.data){
            setFormData(response.data); //Load existing profile data into the form
            setProfileExists(true); // Set profileExists to true if profile data is found
            setIsEditing(false); // Set isEditing to false if profile data is found to show in read-only mode at first
        } else{
            setFormData(prev => ({...prev, email: applicantEmail || ''})); // Set the email field to the applicant's email from localStorage
            setProfileExists(false); // Set profileExists to false if no profile data is found
            setIsEditing(true); // Set isEditing to true if profile data is not found
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
            setProfileExists(false); // Set profileExists to false if profile data is not found
            setIsEditing(true); // Set isEditing to true if profile data is not found
            }
        else {
            console.error('Error fetching profile data:', error);
        }
    }
};

    fetchProfileData();
}, []);

// Function to handle form input changes, update formData state when user types in the form fields
const handleChange = (e) => {  //stores the file in a state variable
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file input for resume
    }));
  };

// Function to handle form submission for creating (post) or updating (put) the profile
const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Get applicantID and applicantEmail from localStorage
    const applicantID = localStorage.getItem('applicantID');
    const applicantEmail = localStorage.getItem('applicantEmail');

    try {
        const formDataToSend = new FormData(); // Create a FormData object to send the data as multipart/form-data
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        formDataToSend.append('email', applicantEmail);
        formDataToSend.append('phone_number', formData.phone_number);
        formDataToSend.append('university', formData.university);
        formDataToSend.append('major', formData.major);
        formDataToSend.append('graduation_date', formData.graduation_date);

        if (formData.resume) {
            formDataToSend.append('resume', formData.resume); // Append the resume file if it exists
        }
        if (profileExists) {
            // Update existing profile
            await Axios.put(`/applicantProfile/${applicantID}`, formDataToSend);
        } else {
            // Create new profile
            await Axios.post('/applicantProfile', formDataToSend);
            console.log('Profile created successfully');
        }
        setIsEditing(false); // Set isEditing to false after successful submission
        navigate('/applicantDashboard'); // Redirect to applicant dashboard after successful submission
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}



  return (
    <>
    <NavBarApplicantDashboard />
    <section className="bg-[#E8F0F5]">
        <div className ="container m-auto max-w-4xl py-24">
            <h1 className="text-3xl font-bold mb-6">Applicant Profile</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">University</label>
                        <input
                            type="text"
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Major</label>
                        <input
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Graduation Date</label>
                        <input
                            type="date"
                            name="graduation_date"
                            value={formData.graduation_date}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Resume</label>
                        <input
                            type="file"
                            name="resume"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            // Only required if creating a new profile
                            required={!profileExists}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-[#2687AD] border border-[#2687AD] text-white py-2 px-4 rounded hover:text-[#2687AD] hover:bg-transparent"
                >
                    {profileExists ? 'Update Profile' : 'Create Profile'}
                </button>
            </form>
        </div>
    </section>
    </>
    
  )
}


export default ApplicantProfile