import React from 'react';

export function AdminFooter() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="flex justify-between items-center h-16">
        <div className="pl-4">
          <p className="text-sm text-gray-300">
            © 2024 SLTR.com. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-6 pr-4">
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Help Center
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}