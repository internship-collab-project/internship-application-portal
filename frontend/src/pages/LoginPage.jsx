import { useRef, useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarLogin from '../components/NavBarLogin';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
    const {setAuth, login} = useAuth(); //global auth 

    const navigate = useNavigate();

    const errRef = useRef();



    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before making the request
        
        // // Temporary: Mock API response for testing purposes (will remove when backend is ready)
        // try {
        //     // Simulate API delay
        //     await new Promise(resolve => setTimeout(resolve, 1000));
            
        //     // Mock successful response
        //     const response = {
        //         data: {
        //             accessToken: 'mock-jwt-token-12345',
        //             roles: ['admin'], // or ['applicant'] for applicant role
        //             message: 'Login successful'
        //             }
        //         };
        
        //     // Use the login function (it handles localStorage automatically)
        //     login({ email: formData.email, roles: response.data.roles, accessToken: response.data.accessToken });
        //     setFormData({ email: '', password: '' }); // Clear form after successful login

        //     if (response.data.roles.includes('admin')) {
        //         navigate('/adminDashboard'); // Redirect to admin dashboard if user is an admin
        //     } else if (response.data.roles.includes('applicant')) {
        //         navigate('/applicantDashboard'); // Redirect to user dashboard if user is an applicant
        //     }
        
        // }
        //    catch (error) {
        //     setError('Login failed.');  } 


        try{
            const response = await Axios.post('/login', formData);
            const {accessToken, roles} = response.data;
            login({ email: formData.email, roles, accessToken });
            setFormData({ email: '', password: '' }); // Clear form after successful login
            if (roles.includes('admin')) {
                navigate('/adminDashboard'); // Redirect to admin dashboard if user is an admin
            }
            else if (roles.includes('applicant')) {
                navigate('/applicantDashboard'); // Redirect to user dashboard if user is an applicant
            }

        } catch (err) {
            // Handle login error
            if(!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 400) {
                setError('Login failed. Please check your credentials and try again.');
            } else if (err.response?.status === 401) {
                setError('Unauthorized. Please check your credentials.');
            }
            else {
                setError('Login failed. Please try again later.');
            }
            if (errRef.current) {
                errRef.current.focus(); // Focus on the error message reference if you have one to have a screen reader read it
            }
        }
     };

    return (
        <>
        <NavBarLogin />
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 sm:px-6 lg:px-8">
            <div className="w-[500px] h-[450px] p-8 shadow-lg bg-[#E8F0F5] rounded-md">
                <h1 className='text-center block text-3xl mb-8'>Login</h1>
                <h2 className='text-center text-lg mb-6'>Don't have an account? <NavLink to="/signup" className="text-[#2687AD] hover:underline">Sign Up</NavLink></h2>

                {error && (
                    <div ref={errRef} className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

            <form onSubmit={handleSubmit} className="font-sans flex flex-col space-y-4 mb-8">
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
                <button className="border-2 border-[#2687AD] bg-[#2687AD] text-white mt-8 w-full py-2 rounded-md hover:text-[#2687AD] hover:bg-transparent" type="submit">Login</button>
            </form>
            </div>
        </div>
        </>
    );
};

export default LoginPage;