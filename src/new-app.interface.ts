export interface ApiKeyss {
  [key: string]: string; // Assuming API keys are strings
}

export interface GuardianParams {
  page: number;
  pageSize: number;
  orderBy: string;
  useDate: string;
  fromDate: string;
  toDate: string;
  productionOffice: string;
}

export interface TopHeadLines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Define the structure of the expected articles response
export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
}

export interface GuardianApiResponse {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: GuardianArticle[];
}

export interface GuardianState {
  articles: GuardianArticle[];
  loading: boolean;
  error: string | null;
}

export interface GuardianResponse {
  response: GuardianApiResponse;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface NewsAPIParams {
  q?: string;
  country?: string;
  category?: string;
  sources?: string;
  pageSize?: number;
  page?: number;
}
export interface NYTParams {
  q?: string;
  begin_date?: string;
  end_date?: string;
  sort?: string;
  page?: number;
}

export interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string | undefined; // Allow undefined
  articleUrl: string;
}

export interface NewsAPIMainHeaderResponse {
  status: string;
  totalResults: number;
  articles: NewsAPI[];
}

export interface NewsAPI {
  title: string;
  description?: string;
  urlToImage: string;
  url: string;
  author?: string;
  articles?: any;
  totalResults?: number;
}

export interface NYT {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

export interface GenericArticleProps<T> {
  id: T;
  title: T;
  description: T;
  imageUrl: T;
  articleUrl: T;
}

export interface Sources {
  id: string;
  category: string;
  country: string;
  description: string;
  language: string;
  name: string;
  url: string;
}

export interface Country {
  countryShortCode: string;
  countryName: string;
}

export interface FilterDropdownProps {
  placeholder: string;
  options: string[];
  onSelect: (option: string) => void;
}
