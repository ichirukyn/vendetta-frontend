import { EffectConstants } from "@/widgets";

export const EventConstants = {
  type: [
    { value: 'quest', label: 'Квест' },
    { value: 'battle', label: 'Сражение' },
    { value: 'boss', label: 'Босс' },
  ],
  trigger_type: [
    { value: 'start', label: 'Условие начала' },
    { value: 'condition', label: 'Условие выполнения' },
  ],
  attribute: [
    { value: 'race_id', label: 'Раса (По id)' },
    { value: 'class_id', label: 'Класс (По id)' },
    
    { value: 'mana_view', label: 'Мана:', disabled: true },
    ...EffectConstants.attribute,
  ],
}