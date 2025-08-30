import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { EntityFetchType } from '@/shared/utils'

const staleTimeBase = 5 * 60 * 1000
const gcTimeBase = 5 * 60 * 1000

export const createEntityFetchHooks = <T>({
  keys,
  api,
  useEntityStore,
  isAuthCheck = false,
  staleTime = staleTimeBase,
  gcTime = gcTimeBase,
}: EntityFetchType<T>) => {
  const useEntityFetchQuery = (id?: string) => {
    const setEntity = useEntityStore(state => state.setEntity)
    const setEntityList = useEntityStore(state => state.setEntityList)

    const fetchListQuery = useQuery({
      queryKey: [keys.list],
      queryFn: api.fetchList,
      enabled: api.fetchList && isAuthCheck !== null ? !!isAuthCheck : true,
      staleTime,
      gcTime,
    })

    const fetchQuery = useQuery({
      queryKey: [keys.base, id],
      queryFn: () => api.fetch?.(id as string),
      enabled: api.fetch && !!id && isAuthCheck !== null ? !!isAuthCheck : true,
      staleTime,
      gcTime,
    })

    useEffect(() => {
      if (fetchQuery.data) setEntity(fetchQuery.data)
    }, [fetchQuery.data])

    useEffect(() => {
      if (fetchListQuery.data) setEntityList(fetchListQuery.data)
    }, [fetchListQuery.data])

    return {
      fetchListQuery,
      fetchQuery,
    }
  }

  return { useEntityFetchQuery }
}
