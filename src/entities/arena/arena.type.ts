import {FloorEnemyType} from "@/shared/types";

export type ArenaType = {
  id: number
  name: string
  desc: string
  chance_bonus?: number
  max_rate_drop?: number
  enemies: FloorEnemyType[]
  created_at: string
  updated_at: string
}

export type ArenaCreateType = Omit<ArenaType, 'id' | 'created_at' | 'updated_at'>

export type ArenaUpdateType = ArenaCreateType
