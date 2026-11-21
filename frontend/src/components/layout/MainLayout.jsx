import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="w-full pt-16 bg-background-secondary min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
