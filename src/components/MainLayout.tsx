import React from 'react';
import Navigation from './Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default MainLayout;
