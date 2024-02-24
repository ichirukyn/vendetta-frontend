import { EnemyType } from "@/shared/types/enemy";

export type ArenaType = {
  id?: number
  name: string
  desc: string
  chance_bonus?: number
  max_rate_drop?: number
  enemies: FloorEnemyType[]
}

export type FloorEnemyType = {
  id: number,
  enemy_id: number,
  floor_id?: number,
  team_id?: number
  enemy?: EnemyType,
}