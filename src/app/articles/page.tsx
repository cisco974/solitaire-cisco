"use client";
import { useState } from "react";
import { StandardPage } from "@/components/StandardPage";
import { ArticleCard } from "@/components/ArticleCard";
import { Search } from "lucide-react";

type ArticleType = "guides" | "blog";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  type: ArticleType;
}

const articles: Article[] = [
  {
    id: "how-to-play-solitaire",
    title: "How to Play Solitaire",
    description:
      "Master the basics of Klondike Solitaire with our comprehensive guide for beginners.",
    image:
      "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
    category: "Guides",
    readTime: "5 min",
    date: "2024-02-15",
    type: "guides",
  },
  {
    id: "spider-solitaire-guide",
    title: "How to Play Spider Solitaire",
    description:
      "Learn the rules and strategies of Spider Solitaire, from basic moves to advanced techniques.",
    image:
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
    category: "Guides",
    readTime: "7 min",
    date: "2024-02-14",
    type: "guides",
  },
  {
    id: "freecell-guide",
    title: "How to Play FreeCell Solitaire",
    description:
      "Discover the unique rules and winning strategies for FreeCell Solitaire.",
    image:
      "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
    category: "Guides",
    readTime: "6 min",
    date: "2024-02-13",
    type: "guides",
  },
  {
    id: "history-of-solitaire",
    title: "The Fascinating History of Solitaire",
    description:
      "From royal courts to computer screens: explore the rich history of this timeless card game.",
    image:
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
    category: "Blog",
    readTime: "8 min",
    date: "2024-02-12",
    type: "blog",
  },
];

export default function Articles() {
  const [selectedType, setSelectedType] = useState<ArticleType>("guides");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.type === selectedType &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <StandardPage title="Articles">
      {/* Type Selector and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType("guides")}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === "guides"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-600 hover:bg-emerald-50"
            }`}
          >
            Guides
          </button>
          <button
            onClick={() => setSelectedType("blog")}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === "blog"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-600 hover:bg-emerald-50"
            }`}
          >
            Blog
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <div className="mb-12">
          <ArticleCard article={filteredArticles[0]} featured />
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.slice(1).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No articles found matching your search.
          </p>
        </div>
      )}
    </StandardPage>
  );
}
