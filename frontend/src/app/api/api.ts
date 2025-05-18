import { UserResponse } from '../lib/types';

export const fetchUsers = async ({
  queryKey,
}: {
  queryKey: string;
}): Promise<UserResponse> => {
  const [query, perPage, currentPage] = queryKey;

  try {
    const res = await fetch(
      `http://localhost:3000/api/${query}?page=${currentPage}&limit=${perPage}`
    );
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Failed to fetch users data');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
