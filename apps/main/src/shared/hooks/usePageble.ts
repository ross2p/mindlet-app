import { PageRequest, PageResponse } from '@ross2p/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface UsePaginationOptions<TFilter extends PageRequest, TData, TError = Error> 
  extends Omit<Parameters<typeof useQuery<PageResponse<TData>, TError>>[0], 'queryFn'> {
    queryFn: (pageRequest: TFilter) => Promise<PageResponse<TData>>;
    initialPageRequest: TFilter;
}

export const usePagination = <TFilter extends PageRequest, TData, TError = Error>({
  initialPageRequest,
  queryKey,
  queryFn,
  ...queryOptions
}: UsePaginationOptions<TFilter, TData, TError>) => {
  const [pageRequest, setPageRequest] = useState<TFilter>(initialPageRequest);

  const query = useQuery({
    queryKey: [...queryKey, pageRequest],
    queryFn: () => queryFn(pageRequest),
    ...queryOptions
  });

  const setPageNumber = (pageNumber: number) => {
    setPageRequest((prev) => ({ ...prev, pageNumber }));
  };

  const setPageSize = (pageSize: number) => {
    setPageRequest((prev) => ({ ...prev, pageSize, pageNumber: 1 }));
  };

  const setFilters = (filters: Partial<TFilter>) => {
    setPageRequest((prev) => ({ ...prev, pageNumber: 1, ...filters, }));
  };

  return {
    ...query,
    pageRequest,
    setPageNumber,
    setPageSize,
    setFilters,
  };
};