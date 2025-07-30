import {useRef, useState, useEffect } from 'react';
import NavBarLogin from '../components/NavBarLogin';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Axios from '../services/Axios';
import { toast } from 'react-toastify';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/; //will be validating components with these fields

const SignUpPage = () => {
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [adminCode, setAdminCode] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result); // Log the result of the regex test for testing purposes
        console.log(email); // Log the email value for testing purposes
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result); // Log the result of the regex test for testing purposes
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPassword]); //remove the error message when the user starts typing and is fixing the input fields

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validEmail || !validPassword || !validMatch) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await Axios.post("/signup", {
                email,
                password,
                adminCode: adminCode.trim()
            });

            // Show notification based on role
            if (response.data && response.data.role) {
                if (response.data.role === "admin") {
                    toast.success("Account created as ADMIN!", { autoClose: 3000 });
                } else {
                    toast.info("Account created as applicant.", { autoClose: 3000 });
                }
            }

            setEmail('');
            setPassword('');
            setMatchPassword('');
            setAdminCode('');
            setSuccess(true);
            setTimeout(() => navigate('/'), 1500); // 1.5 seconds delay
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Email Already Exists");
            } else {
                setErrMsg("Registration Failed");
            }
            if (errRef.current) {
                errRef.current.focus(); // Focus on the error message reference if you have one to have a screen reader read it
            }
        }
    };

    return (
        <>
        <NavBarLogin />
        <section className="min-h-screen flex items-center justify-center bg-white py-12 px-6 sm:px-6 lg:px-8">
            <div className="w-[500px] h-[650px] p-8 shadow-lg bg-[#E8F0F5] rounded-md">
            <div className="max-w-md w-full space-y-8"> 
                <div>
                    <h1 className="mt-6 mb-3 text-center block text-3xl text-gray-900">
                        Sign Up
                    </h1>
                    {errMsg && (
                        <div ref={errRef} className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {errMsg}
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2687AD] focus:border-[#2687AD] focus:z-10 sm:text-sm"
                        />
                        <p 
                            id="emailnote" 
                            className={`mt-2 text-sm ${
                                emailFocus && email && !validEmail 
                                    ? "text-red-600 visible" 
                                    : "sr-only"
                            }`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Please enter a valid email address.
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            aria-invalid={validPassword ? "false" : "true"}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            required
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2687AD] focus:border-[#2687AD] focus:z-10 sm:text-sm"
                        />

                        <p 
                            id="passwordnote"
                            className={`mt-2 text-sm ${
                                password === '' 
                                    ? "sr-only"
                                    : validPassword 
                                        ? "text-green-600" 
                                        : "text-red-600"
                            }`}>
                            {validPassword ? <FontAwesomeIcon icon={faCheck} className="mr-1" /> : <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />}
                            Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            id="confirm_password"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            placeholder="Confirm Password"
                            aria-invalid={validMatch ? "false" : "true"}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            required
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2687AD] focus:border-[#2687AD] focus:z-10 sm:text-sm"
                        />

                        <p 
                        id="confirm_passwordnote"
                        className={`mt-2 text-sm ${
                            matchPassword === '' 
                                ? "sr-only"
                                : validMatch 
                                    ? "text-green-600" 
                                    : "text-red-600"
                        }`}>
                            {validMatch ? (
                                <>
                                    <FontAwesomeIcon icon={faCheck} className="mr-1" />
                                    Passwords match
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faTimes} className="mr-1" />
                                    Passwords do not match
                                </>
                            )}
                        </p>
                    </div>

                    {/* 🆕 Admin Access Code field (optional) */}
                    <div>
                        <input
                            type="password"
                            id="adminCode"
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            placeholder="(Optional) Admin Access Code"
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#2687AD] focus:border-[#2687AD] focus:z-10 sm:text-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit" 
                            disabled={!validEmail || !validPassword || !validMatch}
                            className="border-2 border-[#2687AD] bg-[#2687AD] text-white mt-8 w-full py-2 rounded-md hover:text-[#2687AD] hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed">
                            
                            Sign Up
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUpPage;
