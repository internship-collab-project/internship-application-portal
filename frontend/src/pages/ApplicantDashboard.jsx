import { useRef, useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarApplicantDashboard from '../components/NavBarApplicantDashboard';
import HeroApplicant from '../components/HeroApplicant';
const ApplicantDashboard = () => {
  return (
    <div>
      <NavBarApplicantDashboard />
      <HeroApplicant />

      
    </div>
  )
}

export default ApplicantDashboard