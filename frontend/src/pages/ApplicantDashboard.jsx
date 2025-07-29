import { useRef, useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';
import HeroApplicant from '../components/HeroApplicant';
import ApplicantDashboardCards from '../components/ApplicantDashboardCards';
const ApplicantDashboard = () => {
  return (
    <div>
      <NavBarApplicantDashboard />
      <HeroApplicant />
      <ApplicantDashboardCards />
    </div>
  )
}

export default ApplicantDashboard