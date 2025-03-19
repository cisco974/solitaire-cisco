import { Database } from './database';

export type ContentType = 'guide' | 'article' | 'page';
export type ContentStatus = 'draft' | 'published';
export type Language = 'en' | 'fr' | 'es' | 'it' | 'de' | 'nl' | 'pt' | 'ro' | 'cs' | 'sk' | 'zh' | 'id' | 'ms' | 'hi' | 'tl';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  content: string;
  language: Language;
  status: ContentStatus;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
}

export type Tables = Database['public']['Tables'];
export type ContentRow = Tables['content']['Row'];
export type UserRow = Tables['users']['Row'];