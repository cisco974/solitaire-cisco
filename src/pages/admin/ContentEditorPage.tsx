import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Content, ContentType, Language } from "@/types/admin";
import { Editor } from "@components/admin/Editor";

interface ContentEditorPageProps {
  type: ContentType;
}

const languages = [
  { code: "fr", name: "Français", title: "Solitaire", flag: "🇫🇷" },
  { code: "en", name: "English", title: "Solitaire", flag: "🇬🇧" },
  { code: "es", name: "Español", title: "Solitario", flag: "🇪🇸" },
  { code: "it", name: "Italiano", title: "Solitario", flag: "🇮🇹" },
  { code: "pt", name: "Português", title: "Solitário", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", title: "Solitär", flag: "🇩🇪" },
  { code: "nl", name: "Nederlands", title: "Solitaire", flag: "🇳🇱" },
  { code: "ro", name: "Română", title: "Solitar", flag: "🇷🇴" },
  { code: "cs", name: "Čeština", title: "Solitaire", flag: "🇨🇿" },
  { code: "sk", name: "Slovenčina", title: "Solitaire", flag: "🇸🇰" },
  { code: "zh", name: "中文", title: "纸牌接龙", flag: "🇨🇳" },
  { code: "id", name: "Indonesia", title: "Solitaire", flag: "🇮🇩" },
  { code: "ms", name: "Melayu", title: "Solitaire", flag: "🇲🇾" },
  { code: "hi", name: "हिन्दी", title: "सॉलिटेयर", flag: "🇮🇳" },
  { code: "tl", name: "Filipino", title: "Solitaire", flag: "🇵🇭" },
];

// Données mockées pour simuler un contenu
const mockContent: Record<string, Content> = {
  "1": {
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
};

export function ContentEditorPage({ type }: ContentEditorPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Partial<Content>>({
    type,
    title: "",
    slug: "",
    content: "",
    language: "en",
    status: "draft",
    meta_title: "",
    meta_description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      fetchContent();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Vérifier si le contenu existe dans notre mock
      if (id && mockContent[id]) {
        setContent(mockContent[id]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simuler un délai de sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log du contenu au lieu de le sauvegarder dans Supabase
      console.log("Content to save:", content);

      navigate(`/operation/${type}s`);
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {id === "new" ? `New ${type}` : `Edit ${type}`}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  value={content.title}
                  onChange={(e) =>
                    setContent({ ...content, title: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Slug
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="slug"
                  value={content.slug}
                  onChange={(e) =>
                    setContent({ ...content, slug: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <Editor
                  content={content.content || ""}
                  onChange={(newContent) =>
                    setContent({ ...content, content: newContent })
                  }
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Language
              </label>
              <div className="mt-2">
                <select
                  id="language"
                  value={content.language}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      language: e.target.value as Language,
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name} - {lang.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Status
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  value={content.status}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Meta Title */}
            <div>
              <label
                htmlFor="meta_title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Meta Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="meta_title"
                  value={content.meta_title || ""}
                  onChange={(e) =>
                    setContent({ ...content, meta_title: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label
                htmlFor="meta_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Meta Description
              </label>
              <div className="mt-2">
                <textarea
                  id="meta_description"
                  rows={3}
                  value={content.meta_description || ""}
                  onChange={(e) =>
                    setContent({ ...content, meta_description: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => navigate(`/operation/${type}s`)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
