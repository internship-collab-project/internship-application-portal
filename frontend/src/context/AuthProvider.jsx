import {createContext, useState} from 'react';

const AuthContext = createContext({}); //create a context object for authentication

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    // TODO: Add logout functionality later when building navbar for dashboard
    // const logout = () => {
    //     setAuth({});
    //     localStorage.removeItem('accessToken');
    // };

    const login = (userData) => {
        setAuth(userData);
        // Store token in localStorage if it exists and store it for persistence in localStorage
        // This allows the user to stay logged in even after refreshing the page
        if (userData.accessToken) {
            localStorage.setItem('accessToken', userData.accessToken);
        }
    };

    return (
        <AuthContext.Provider value={{auth, setAuth, login}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;