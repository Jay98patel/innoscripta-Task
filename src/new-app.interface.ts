export interface GuardianParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  useDate?: string;
  fromDate?: string;
  toDate?: string;
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
