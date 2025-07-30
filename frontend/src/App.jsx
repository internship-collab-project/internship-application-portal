import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ApplicantDashboard from './pages/ApplicantDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ApplicantProfile from './pages/ApplicantProfile.jsx';
import AdminApplicationsPage from './pages/AdminApplicationsPage.jsx';
import PostInternshipPage from './pages/PostInternshipPage.jsx';
import AvailableInternships from './pages/AvailableInternships.jsx';
import ApplicantApplications from './pages/ApplicantApplications.jsx';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Applicant routes (protected) */}
        <Route element={<RequireAuth allowedRoles={['applicant']} />}>
          <Route path="/applicantDashboard" element={<ApplicantDashboard />} />
          <Route path="/applicantProfile" element={<ApplicantProfile />} />
          <Route path="/internships" element={<AvailableInternships />} />
          <Route path="/applications" element={<ApplicantApplications />} />
        </Route>

        {/* Admin routes (protected) */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplicationsPage />} />
          <Route path="/admin/post-internship" element={<PostInternshipPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
