import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Content,
  ContentStatus,
  ContentType,
  Language,
} from "../../types/admin";

interface ContentListPageProps {
  type: ContentType;
}

// Données mockées pour simulation
const mockContents: Content[] = [
  {
    id: "1",
    type: "guide",
    title: "How to Play Solitaire",
    slug: "how-to-play-solitaire",
    content: "<p>This is a guide to playing solitaire.</p>",
    language: "en",
    status: "published",
    meta_title: "How to Play Solitaire - Guide",
    meta_description:
      "Learn how to play solitaire with this comprehensive guide.",
    created_at: "2024-01-01T12:00:00.000Z",
    updated_at: "2024-01-01T12:00:00.000Z",
    author_id: "1",
  },
  {
    id: "2",
    type: "article",
    title: "The History of Solitaire",
    slug: "history-of-solitaire",
    content: "<p>The fascinating history of solitaire card games.</p>",
    language: "fr",
    status: "draft",
    meta_title: "The History of Solitaire",
    meta_description: "Learn about the rich history of solitaire card games.",
    created_at: "2023-12-15T10:30:00.000Z",
    updated_at: "2023-12-15T10:30:00.000Z",
    author_id: "1",
  },
  {
    id: "3",
    type: "page",
    title: "About Us",
    slug: "about-us",
    content: "<p>About SLTR.com and our mission.</p>",
    language: "en",
    status: "published",
    meta_title: "About Us - SLTR.com",
    meta_description: "Learn more about SLTR.com and our team.",
    created_at: "2023-11-10T08:45:00.000Z",
    updated_at: "2023-11-10T08:45:00.000Z",
    author_id: "1",
  },
];

export function ContentListPage({ type }: ContentListPageProps) {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | "all">(
    "all",
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, [type]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filtrer le contenu mockée par type
      const filteredContent = mockContents.filter((item) => item.type === type);
      setContent(filteredContent);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      // Simuler un délai de suppression
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simuler la suppression en filtrant l'élément du tableau
      const updatedContent = content.filter((item) => item.id !== id);
      setContent(updatedContent);

      console.log(`Deleted content with ID: ${id}`);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    return status === "published"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const filteredContent = content.filter(
    (item) =>
      (selectedLanguage === "all" || item.language === selectedLanguage) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1) + "s";

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">{typeTitle}</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all {type}s in your content management system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => navigate(`/operation/${type}s/new`)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {type}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mt-6 flex space-x-4">
        <div className="flex-1 min-w-0">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={`Search ${type}s...`}
            />
          </div>
        </div>
        <select
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(e.target.value as Language | "all")
          }
          className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="all">All Languages</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
      </div>

      {/* Content List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Slug
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredContent.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No {type}s found
                      </td>
                    </tr>
                  ) : (
                    filteredContent.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.slug}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.language.toUpperCase()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/operation/${type}s/${item.id}`)
                              }
                              className="text-emerald-600 hover:text-emerald-900"
                              title="Edit"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
