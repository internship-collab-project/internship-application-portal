import { useRef, useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';
const ApplicantDashboard = () => {
  return (
    <div>
      <NavBarApplicantDashboard />
      <h1>Applicant Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your profile, view internships, and track your applications.</p>
      
    </div>
  )
}

export default ApplicantDashboard