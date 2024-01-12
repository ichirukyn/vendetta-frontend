export type EnemyType = {
  id: number;
  name: string;
  rank: string;
  class_id: number;
  race_id: number;
}

export type EnemyStatsType = {
  id?: number;
  enemy_id?: number;
  lvl: number;
  strength: number;
  health: number;
  speed: number;
  accuracy: number;
  dexterity: number;
  soul: number;
  intelligence: number;
  submission: number;
  crit_rate: number;
  crit_damage: number;
  resist: number;
  total_stats: number;
}

export type EnemyWeaponType = {
  id?: number;
  weapon_id: number;
  item_id: number;
  lvl: number;
}

export type EnemyTechniqueType = {
  id?: number;
  enemy_id?: number;
  technique_id: number;
  lvl?: number;
}
