export type SpellType = {
  id?: number
  name: string
  desc: string
  desc_short: string
  damage: number
  type_damage: string
  type_attack: string
  distance: string
  is_stack: boolean
  class_id?: number
  race_id?: number
  type: string
  cooldown: number
}

export type SpellEffectType = {
  id?: number
  name: string
  type: string
  attribute: string
  value: number
  dependency: string
  dependency_value: number
  dependency_add: number
  condition_first?: string
  condition?: string
  condition_second?: number
  direction: string
  duration: number
  is_single: boolean
  every_turn?: boolean
}

export type SpellBranchType = {
  id?: number
  technique_id?: number
  parent_id?: number
  is_hidden?: boolean
  condition_attribute?: string
  condition?: string
  condition_value?: number
  technique?: SpellType
  parent?: SpellType
}

