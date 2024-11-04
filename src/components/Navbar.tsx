'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

const Navbar: React.FC = () => {
  const handleLogout = async () => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    });

    // Check user response
    if (result.isConfirmed) {
      await signOut({ callbackUrl: '/login' }); 
    }
  };

  return (
    <React.Fragment>
       <nav className="bg-blue-dark-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout} // Call handleLogout on button click
          className="text-white border border-white bg-blue-dark-500 hover:bg-blue-dark-700 hover:text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
