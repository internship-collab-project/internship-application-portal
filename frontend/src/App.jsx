import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
const App = () => {

    const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App