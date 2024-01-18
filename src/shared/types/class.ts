export type ClassType = {
  id: number
  name: string
  desc?: string
  desc_short?: string
  main_attr?: string
  race_id?: number
  type?: 'Воин' | 'Убийца' | 'Лучник' | 'Маг'
  hidden?: boolean
}