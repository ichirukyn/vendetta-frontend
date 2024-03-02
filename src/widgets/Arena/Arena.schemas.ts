import { number, object } from "yup";

export const ArenaFloorCreateScheme = object().shape({
  floor_id: number(),
  enemy_id: number().nullable().optional(),
  team_id: number().nullable().optional(),
})