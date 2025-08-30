import { create, StoreApi } from 'zustand'
import { EntityStoreType } from '@/shared/utils'

export const createEntityStoreState =
  <T>() =>
  (set: StoreApi<EntityStoreType<T>>['setState']) => ({
    entity: undefined,
    setEntity: (entity?: T) => set({ entity }),
    entityList: undefined,
    setEntityList: (entityList?: T[]) => set({ entityList }),
  })

export const createEntityStore = <T>() =>
  create<EntityStoreType<T>>(set => ({
    entity: undefined,
    setEntity: entity => set({ entity }),
    entityList: undefined,
    setEntityList: entityList => set({ entityList }),
  }))
