'use client';

import React from 'react';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  type: 'guides' | 'blog';
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (featured) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm">
                {article.category}
              </span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{article.title}</h2>
            <p className="text-white/80">{article.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime} read
          </span>
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
        <p className="text-gray-600">{article.description}</p>
      </div>
    </div>
  );
}