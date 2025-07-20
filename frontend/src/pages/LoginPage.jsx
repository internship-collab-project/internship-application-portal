import { useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarLogin from '../components/NavBarLogin';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/login', formData);
            // Handle successful login
            navigate('/dashboard');
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <>
        <NavBarLogin />
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 sm:px-6 lg:px-8">
            <div className="w-[500px] h-[450px] p-8 shadow-lg bg-[#E8F0F5] rounded-md">
                <h1 className='text-center block text-3xl mb-8'>Login</h1>
                {/* <hr className="my-4" /> */}
                <h2 className='text-center text-lg mb-6'>Don't have an account? <NavLink to="/signup" className="text-[#2687AD] hover:underline">Sign Up</NavLink></h2>

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