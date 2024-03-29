export type TechniqueType = {
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

export type TechniqueEffectType = EffectType & {
  technique_id?: number
}

export type EffectType = {
  id?: number
  name: string
  type: string
  attribute: string
  value: number
  if_first?: string
  if?: string
  if_second?: number
  direction: string
  duration: number
  is_single: boolean
  every_turn?: boolean
}

export type TechniqueBranchType = {
  id?: number
  technique_id?: number
  parent_id?: number
  is_hidden?: boolean
  condition_attribute?: string
  condition?: string
  condition_value?: number
  technique?: TechniqueType
  parent?: TechniqueType
}

