import { boolean, number, object, string } from "yup";

export const EnemySchemas = object().shape({
  name: string().required('Введите имя'),
  rank: string().nullable(),
  class_id: number().required('Выберите класс'),
  race_id: number().required('Выберите расу'),
})

export const EnemyStatsSchemas = object().shape({
  lvl: number().nullable(),
  strength: number().nullable(),
  health: number().nullable(),
  speed: number().nullable(),
  accuracy: number().nullable(),
  dexterity: number().nullable(),
  soul: number().nullable(),
  intelligence: number().nullable(),
  submission: number().nullable(),
  crit_rate: number().nullable(),
  crit_damage: number().nullable(),
  resist: number().nullable(),
  total_stats: number().nullable(),
})

export const EnemyWeaponSchemas = object().shape({
  weapon_id: number().required('Выберите оружие'),
  lvl: number(),
})

export const EnemyTechniqueSchemas = object().shape({
  technique_id: number().required('Выберите технику'),
  lvl: number(),
})

export const EnemyTeamSchemas = object().shape({
  enemy_id: number().nullable(),
  is_leader: boolean().optional(),
  prefix: string().nullable().optional(),
})

export const EnemyLootSchemas = object().shape({
  item_id: number().optional(),
  chance: number(),
  count_min: number(),
  count_max: number(),
  exp: number().optional(),
})