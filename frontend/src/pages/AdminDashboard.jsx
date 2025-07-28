import {useRef, useState} from 'react';
import Axios from '../services/Axios';
import {useNavigate, NavLink} from 'react-router-dom';
import NavBarAdminDashboard from '../components/NavBarAdminDashboard';
const AdminDashboard = () => {
  return (
    <div>
      <NavBarAdminDashboard />
      <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
    </div>
  )
}

export default AdminDashboard