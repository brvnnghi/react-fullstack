export interface UrlItem {
  id: string;
  url: string;
  lastmod: string;
}

export type CreateUrlItem = Omit<UrlItem, "id">;
