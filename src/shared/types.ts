export interface UrlItemType {
  id: string;
  url: string;
  lastmod: string;
}

export type CreateUrlItemType = Omit<UrlItemType, "id">;

export interface UserType {
  username: string;
  password?: string;
}