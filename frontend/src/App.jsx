import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ApplicantDashboard from './pages/ApplicantDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RequireAuth from './components/RequireAuth.jsx';

const App = () => {

    const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        {/* Protected routes. These routes will be protected and require authentication */}
        {/* User dashboard */}
        <Route element={<RequireAuth allowedRoles={['applicant']} />}>
          <Route path="/applicantDashboard" element={<ApplicantDashboard />} />
        </Route>

        {/* Admin dashboard */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App