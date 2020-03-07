export type ExplorerAddressTxsRequest = {
  address: string;
  page: number;
  limit: number;
}

export type ExplorerLinks = {
  fist: string;
  last: string;
  prev: string;
  next: string;
}

export type ExplorerMeta = {
  current_page: number;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
}
