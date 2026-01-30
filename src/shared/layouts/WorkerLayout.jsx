import React from 'react';
import { Outlet } from 'react-router-dom';
import WorkerNavbar from '@/modules/dashboard/worker/components/WorkerNavbar';
import WorkerFooter from '@/modules/dashboard/worker/components/WorkerFooter';

const WorkerLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <WorkerNavbar />
      <main className="flex-grow-1">
        <Outlet /> 
      </main>
      <WorkerFooter />
    </div>
  );
};

export default WorkerLayout;