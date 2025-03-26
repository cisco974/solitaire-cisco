import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  File
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/operation', icon: LayoutDashboard },
  { name: 'Guides', href: '/operation/guides', icon: BookOpen },
  { name: 'Articles', href: '/operation/articles', icon: FileText },
  { name: 'Pages', href: '/operation/pages', icon: File }
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-2 py-2 text-base font-medium rounded-md
                ${location.pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <item.icon
                className={`
                  mr-4 flex-shrink-0 h-6 w-6
                  ${location.pathname === item.href
                    ? 'text-emerald-400'
                    : 'text-gray-400 group-hover:text-gray-300'
                  }
                `}
              />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}