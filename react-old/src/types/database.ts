export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'editor';
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: 'admin' | 'editor';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'editor';
          created_at?: string;
        };
      };
      content: {
        Row: {
          id: string;
          type: 'guide' | 'article' | 'page';
          title: string;
          slug: string;
          content: string;
          language: string;
          status: 'draft' | 'published';
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
          author_id: string;
        };
        Insert: {
          id?: string;
          type: 'guide' | 'article' | 'page';
          title: string;
          slug: string;
          content: string;
          language: string;
          status: 'draft' | 'published';
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
          author_id: string;
        };
        Update: {
          id?: string;
          type?: 'guide' | 'article' | 'page';
          title?: string;
          slug?: string;
          content?: string;
          language?: string;
          status?: 'draft' | 'published';
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
          author_id?: string;
        };
      };
    };
  };
}