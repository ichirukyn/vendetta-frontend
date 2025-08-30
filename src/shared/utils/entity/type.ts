import { StoreApi, UseBoundStore } from 'zustand'
import { AxiosError, AxiosResponse } from 'axios'
import { ResponseType } from '@/shared/types'
import { z } from 'zod/v4'

export type EntityAuthType = {
  isAuthCheck?: boolean | null
}

export type EntityEnableType = {
  isEnableCheck?: boolean | null
}

export type EntityCacheType = {
  staleTime?: number
  gcTime?: number
}

export type EntityStoreType<T = unknown> = {
  entity?: T
  setEntity: (entity?: T) => void
  entityList?: T[]
  setEntityList: (entityList?: T[]) => void
}

export type EntityHookType<T> = {
  keys: { list: string; base: string }
  useEntityStore: UseBoundStore<StoreApi<EntityStoreType<T>>>
} & EntityAuthType &
  EntityCacheType

export type EntityFetchType<T = unknown> = EntityHookType<T> & {
  api: {
    fetchList?: () => Promise<T[]>
    fetch?: (id: string) => Promise<T>
  }
}

export type EntitySchemaType = {
  schema?: z.Schema
  isSchemaStrict?: boolean
}

export type EntityCRUDType<T = unknown, TCreate = unknown, TUpdate = TCreate> = EntityHookType<T> & {
  api: {
    fetchList?: () => Promise<T[]>
    fetch?: (id: string) => Promise<T>
    create: (data: TCreate) => Promise<T>
    update: (id: string, data: TUpdate) => Promise<T>
    delete: (id: string) => Promise<boolean>
  }
}

export type RequestDataType<T = unknown, K = T> = {
  id?: string | number
  second_id?: string | number
  data?: T
  params?: K
  headers?: string
  error?: RequestErrorType
}

export type RequestErrorType<T = unknown> = {
  onError?: (response: AxiosResponse<ResponseType<T>>) => void
  exclude?: number[]
}

export type EntityQueryType<T = unknown, TRequest = T> = {
  keys: string[]
  setter: (data?: T) => void
  request: (data?: RequestDataType<TRequest>) => Promise<T>
  requestData?: RequestDataType<TRequest>
} & EntityAuthType &
  EntityCacheType &
  EntityEnableType &
  EntitySchemaType

export type EntityMutationType<T = unknown, TRequest = T> = {
  keys?: string[]
  request: (data: RequestDataType<TRequest>) => Promise<T>
  invalidateKeys?: string | string[]
  onSuccess?: (data?: T) => void
  onError?: (data?: AxiosError) => void
} & EntityCacheType
