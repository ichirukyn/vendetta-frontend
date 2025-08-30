import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { EntityCRUDType } from '@/shared/utils'
import { RequestIdData } from '@/shared/type'

const staleTimeBase = 5 * 60 * 1000
const gcTimeBase = 5 * 60 * 1000

export const createEntityCRUDHooks = <T, TCreate, TUpdate>({
  keys,
  api,
  useEntityStore,
  isAuthCheck = null,
  staleTime = staleTimeBase,
  gcTime = gcTimeBase,
}: EntityCRUDType<T, TCreate, TUpdate>) => {
  const useEntityCRUDQuery = (id?: string) => {
    const queryClient = useQueryClient()

    const setEntity = useEntityStore(state => state.setEntity)
    const setEntityList = useEntityStore(state => state.setEntityList)

    const fetchListQuery = useQuery({
      queryKey: [keys.list],
      queryFn: api.fetchList,
      enabled: api.fetchList && (isAuthCheck !== null ? !!isAuthCheck : true),
      staleTime,
      gcTime,
    })

    const fetchQuery = useQuery({
      queryKey: [keys.base, id],
      queryFn: () => api.fetch?.(id as string),
      enabled: api.fetch && !!id && (isAuthCheck !== null ? !!isAuthCheck : true),
      staleTime,
      gcTime,
    })

    const createQuery = useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.base] })
        queryClient.invalidateQueries({ queryKey: [keys.list] })
      },
      mutationFn: (data: TCreate) => api.create?.(data),
    })

    const updateQuery = useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.base] })
        queryClient.invalidateQueries({ queryKey: [keys.list] })
      },
      mutationFn: (request: RequestIdData<TUpdate>) => api.update?.(request.id, request.data),
    })

    const deleteQuery = useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.base] })
        queryClient.invalidateQueries({ queryKey: [keys.list] })
      },
      mutationFn: (id: string) => api.delete(id),
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
      createQuery,
      updateQuery,
      deleteQuery,
    }
  }

  return { useEntityCRUDQuery }
}
