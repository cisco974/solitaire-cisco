import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export function AdminHeader() {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/operation/login');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex justify-between items-center h-16">
        {/* Logo section - positioned at the far left */}
        <div className="flex items-center pl-4">
          <div className="flex space-x-1">
            <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">♥</div>
            <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">♦</div>
            <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">♠</div>
            <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">♣</div>
          </div>
          <span className="text-2xl font-bold text-white ml-4">SLTR Admin</span>
        </div>

        {/* Sign out button - positioned at the far right */}
        <div className="flex items-center pr-4">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}