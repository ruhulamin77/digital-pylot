export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Meta = {
  page: number;
  pages: number;
  limit: number;
  total: number;
};

export type UserResponse = {
  data: User[];
  meta: Meta;
};
