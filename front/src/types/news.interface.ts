export interface NewsItem {
  id: string;
  title: string;
  data: string;
  imagePath?: string;
  videoPath?: string;
  createdAt?: string;
  type?: 'main' | 'cossack' | 'construction';
}

export type NewsDB = NewsItem[];