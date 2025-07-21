import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App = () => {

    const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App