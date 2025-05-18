'use client';
import { useQuery } from '@tanstack/react-query';
import { User, UserResponse } from '../lib/types';
import { fetchUsers } from '../api/api';
import { useEffect, useState } from 'react';

export default function Users() {
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const [perPage, setPerPage] = useState<number | string>(10);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [pageInput, setPageInput] = useState<number | string>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', perPage, currentPage],
    queryFn: fetchUsers,
  });

  // useEffect(() => {
  if (Number(currentPage) > data?.meta?.pages) {
    setCurrentPage(data.meta.pages);
  }
  // }, [perPage]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">{error.message}</div>;

  const pageNumbers = Array.from(
    { length: data.meta.pages },
    (_key, i) => i + 1
  );

  const visiblePages = pageNumbers.filter((pg) => {
    return (
      pg == 1 ||
      pg == data?.meta?.pages ||
      (pg >= Number(currentPage) - 2 && pg <= Number(currentPage) + 2)
    );
  });

  let lastPage = 0;

  return (
    <div className="p-4">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="text-left bg-gray-300 rounded-lg ">
          <tr>
            <th className="px-4 py-2">
              <input type="checkbox" />
              <span className="ml-3">ID</span>
            </th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>

        <tbody>
          {data.data.map((user: User) => (
            <>
              <tr
                key={user.id}
                className="hover:bg-gray-100"
                onClick={() => setIsExpanded((prev) => (prev ? null : user.id))}
              >
                <td className="px-4 py-2">
                  <input type="checkbox" />
                  <span className="ml-3">{user.id}</span>
                </td>
                <td className="px-4 py-2">{user.first_name}</td>
                <td className="px-4 py-2">{user.last_name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">012345675243</td>
              </tr>
              {isExpanded === user.id && (
                <tr>
                  <td colSpan={5} className="shadow-md rounded-lg">
                    <div>
                      <table className="w-full rounded-lg overflow-hidden">
                        <thead className="text-center bg-gray-200">
                          <th className="px-4 py-2">Address 1</th>
                          <th className="px-4 py-2">Address 2</th>
                          <th className="px-4 py-2">Phone</th>
                        </thead>
                        <tbody className="text-center ">
                          <tr>
                            <td className="px-4 py-2">{user.first_name}</td>
                            <td className="px-4 py-2">{user.last_name}</td>
                            <td className="px-4 py-2">{user.id}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center gap-4 px-4 py-2 bg-gray-200 rounded-md">
        <div className="space-x-2 shrink-0">
          <span className="text-gray-600">Rows per page</span>
          <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>

        <div>
          {visiblePages.map((pg) => {
            const isSkip = pg - lastPage > 1;
            lastPage = pg;
            return (
              <>
                {lastPage && isSkip && <span>...</span>}
                <button
                  key={pg}
                  className={`m-2 ${
                    currentPage === pg ? 'bg-blue-400' : 'bg-gray-200'
                  } px-4 py-1 cursor-pointer`}
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </button>
              </>
            );
          })}
        </div>

        <div className="space-x-2 shrink-0">
          <span className="text-gray-600">Go to page</span>
          <input
            type="number"
            min={1}
            max={data.meta.pages}
            className="border-b w-10 text-center"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
          />
          <button onClick={() => setCurrentPage(pageInput)}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
