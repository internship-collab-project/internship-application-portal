import {createContext, useState} from 'react';

const AuthContext = createContext({}); //create a context object for authentication

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem('auth');
        return saved ? JSON.parse(saved) : {};
    }); //after the page is refreshed, the auth state will be set to the saved auth object in localStorage, or an empty object if nothing is saved

    const login = (userData) => {
        setAuth(userData);
        localStorage.setItem('auth', JSON.stringify(userData)); // Save full auth object
    };

    const logout = () => {
        setAuth({});
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;