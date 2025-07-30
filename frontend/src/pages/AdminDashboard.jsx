import { useRef, useState } from 'react';
import Axios from '../services/Axios';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBarAdminDashboard from '../components/NavBarAdminDashboard';
import HeroAdmin from '../components/HeroAdmin';
import AdminDashboardCards from '../components/AdminDashboardCards';

const AdminDashboard = () => {
  return (
    <div>
      <NavBarAdminDashboard />
      <HeroAdmin />
      <AdminDashboardCards />
    </div>
  );
};

export default AdminDashboard;
