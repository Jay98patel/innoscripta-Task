export interface GuardianParams {
  page: number;
  pageSize: number;
  orderBy: string;
  useDate: string;
  fromDate: string;
  toDate: string;
  productionOffice: string;
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

export interface NewsAPI {
  title: string;
  description?: string;
  urlToImage: string;
  url: string;
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
