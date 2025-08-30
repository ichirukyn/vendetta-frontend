import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { EntityMutationType, EntityQueryType, gcTimeBase, RequestDataType, staleTimeBase } from '@/shared/utils'
import { AxiosError } from 'axios'
import { z } from 'zod/v4'

export const useEntityQuery = <T>({
  keys,
  setter,
  request,
  requestData,
  gcTime = gcTimeBase,
  staleTime = staleTimeBase,
  isAuthCheck = null,
  isEnableCheck = null,
  schema,
  isSchemaStrict,
}: EntityQueryType<T>) => {
  const query = useQuery({
    queryKey: keys,
    queryFn: () => request(requestData),
    enabled: (isAuthCheck !== null ? isAuthCheck : true) && (isEnableCheck !== null ? isEnableCheck : true),
    staleTime,
    gcTime,
  })

  useEffect(() => {
    if (query.data) {
      try {
        let data = query.data as T

        if (schema) {
          const schemaResult = z.safeParse(schema, query.data)

          if (isSchemaStrict && schemaResult.error) {
            return console.error(schemaResult.error.message)
          }

          if (schemaResult.success) data = schemaResult.data as T
        }

        setter(data)
      } catch (e) {
        console.error(e)
        setter(query.data)
      }
    }
  }, [query.data])

  return query
}

export const useEntityMutation = <T = unknown, TRequest = T>({
  keys,
  invalidateKeys,
  onSuccess,
  onError,
  request,
  gcTime = gcTimeBase,
}: EntityMutationType<T, TRequest>) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: keys,
    mutationFn: (requestData: RequestDataType<TRequest>) => request(requestData),
    onSuccess: data => {
      if (invalidateKeys) {
        const keysToInvalidate = Array.isArray(invalidateKeys) ? invalidateKeys : [invalidateKeys]

        keysToInvalidate.forEach(key => {
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          })
        })
      }

      onSuccess?.(data)
    },
    onError: (error: AxiosError) => {
      onError?.(error)
    },
    // TODO: add check onError
    retry: false,
    gcTime,
  })
}
