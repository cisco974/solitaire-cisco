import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, File } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContentCounts {
  guides: number;
  articles: number;
  pages: number;
}

export function DashboardPage() {
  const [counts, setCounts] = useState<ContentCounts>({
    guides: 0,
    articles: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentCounts();
  }, []);

  const fetchContentCounts = async () => {
    try {
      const { data: guidesCount } = await supabase
        .from('content')
        .select('id', { count: 'exact' })
        .eq('type', 'guide');

      const { data: articlesCount } = await supabase
        .from('content')
        .select('id', { count: 'exact' })
        .eq('type', 'article');

      const { data: pagesCount } = await supabase
        .from('content')
        .select('id', { count: 'exact' })
        .eq('type', 'page');

      setCounts({
        guides: guidesCount?.length || 0,
        articles: articlesCount?.length || 0,
        pages: pagesCount?.length || 0
      });
    } catch (error) {
      console.error('Error fetching content counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { name: 'Total Guides', value: counts.guides, icon: BookOpen },
    { name: 'Total Articles', value: counts.articles, icon: FileText },
    { name: 'Total Pages', value: counts.pages, icon: File }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to the SLTR admin dashboard. Here's an overview of your content.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 animate-pulse"
            >
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-emerald-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => window.location.href = '/operation/guides/new'}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Create Guide
            </button>
            <button 
              onClick={() => window.location.href = '/operation/articles/new'}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Create Article
            </button>
            <button 
              onClick={() => window.location.href = '/operation/pages/new'}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Create Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}