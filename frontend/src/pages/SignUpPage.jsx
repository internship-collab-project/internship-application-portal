import {useRef, useState, useEffect } from 'react';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9.-_@]{5,45}$/;
//const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,32})$/; //will be validating components with these fields


const SignUpPage = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false); //does it have to be name or can it be username?
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result); // Log the result of the regex test for testing purposes
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result); // Log the result of the regex test for testing purposes
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [user, password, matchPassword]);


  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register
                </h1>
            </div>
            <form className="mt-8 space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <p 
                        id="uidnote" 
                        className={`mt-2 text-sm ${
                            userFocus && user && !validName 
                                ? "text-red-600 visible" 
                                : "sr-only"
                        }`}
                    >
                        Username must be valid email. <br />
                        Must begin with a letter. <br />
                        6-46 characters long. <br />
                        Letters, numbers, dots, underscores, and hyphens allowed.
                    </p>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <p className={`mt-2 text-sm ${validPassword ? "text-green-600" : "text-red-600"}`}>
                        {validPassword ? "✓ Valid password" : "❌ Invalid password"}
                    </p>
                </div>

                <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        value={matchPassword}
                        onChange={(e) => setMatchPassword(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <p className={`mt-2 text-sm ${validMatch ? "text-green-600" : "text-red-600"}`}>
                        {validMatch ? "✓ Passwords match" : "❌ Passwords do not match"}
                    </p>
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={!validName || !validPassword || !validMatch}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default SignUpPage