import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Outlet /> {/* This will render the matched child route component */}
    </DashboardLayout>
  );
};

export default DashboardPage;