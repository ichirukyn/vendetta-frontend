export const EffectConstants = {
  type: [
    { value: 'number', label: 'Добавить/Отнять число' },
    { value: 'percent', label: 'Добавить/Отнять процент' },
    { value: 'period', label: 'Периодический урон' },
    { value: 'control', label: 'Контроль противника' },
    { value: 'activate', label: 'Активация техники' },
    { value: 'coast', label: 'Затраты техники' },
  ],
  attribute: [
    { value: 'mana', label: 'Мана' },
    { value: 'mana_max', label: 'Мана от макс. значения' },
    { value: 'mana_percent', label: 'Процент маны' },
    { value: 'control_mana', label: 'Контроль маны' },
    
    { value: 'hp_view', label: 'Хп:', disabled: true },
    { value: 'hp', label: 'Хп' },
    { value: 'hp_max', label: 'Хп от макс. значения' },
    { value: 'hp_percent', label: 'Процент Хп' },
    
    { value: 'qi_view', label: 'Ки:', disabled: true },
    { value: 'qi', label: 'Ки' },
    { value: 'qi_max', label: 'Ки от макс. значения' },
    { value: 'qi_percent', label: 'Процент ки' },
    { value: 'control_qi', label: 'Контроль ки' },
    
    { value: 'shield_view', label: 'Щит:', disabled: true },
    { value: 'shield', label: 'Щит' },
    { value: 'shield_max', label: 'Щит от макс. значения' },
    { value: 'shield_percent', label: 'Процент Щита' },
    
    { value: 'stats_view', label: 'Характеритсики:', disabled: true },
    { value: 'strength', label: 'Сила' },
    { value: 'health', label: 'Здоровье' },
    { value: 'speed', label: 'Скорость' },
    { value: 'dexterity', label: 'Ловкость' },
    { value: 'accuracy', label: 'Точность' },
    { value: 'soul', label: 'Дух' },
    { value: 'intelligence', label: 'Интеллект' },
    { value: 'submission', label: 'Подчинение' },
    
    { value: 'flat_stats_view', label: 'Простые характеритсики:', disabled: true },
    { value: 'flat_strength', label: 'Сила П.' },
    { value: 'flat_health', label: 'Здоровье П.' },
    { value: 'flat_speed', label: 'Скорость П.' },
    { value: 'flat_dexterity', label: 'Ловкость П.' },
    { value: 'flat_accuracy', label: 'Точность П.' },
    { value: 'flat_soul', label: 'Дух П.' },
    { value: 'flat_intelligence', label: 'Интеллект П.' },
    { value: 'flat_submission', label: 'Подчинение П.' },
    
    { value: 'crit_view', label: 'Криты:', disabled: true },
    { value: 'crit_damage', label: 'Крит урон' },
    { value: 'crit_rate', label: 'Крит. шанс попадания' },
    
    { value: 'bonus_resist_view', label: 'Бонусы/Сопротивления:', disabled: true },
    { value: 'bonus_damage', label: 'Бонус урона' },
    { value: 'ignore_resist', label: 'Игнорирование сопротивления' },
    { value: 'resist', label: 'Сопротивление урону' },
    { value: 'weapon_damage', label: 'Урон оружия' },
    
    { value: 'effect_view', label: 'Эффекты:', disabled: true },
    { value: 'effect_resist', label: 'Сопротивление эффектам' },
    { value: 'effect_chance', label: 'Шанс попадания эффектов' },
    // { value: 'debuff_resist', label: 'Сопротивление дебаффам' },
    
    { value: 'element_damage_view', label: 'Стихии:', disabled: true },
    { value: 'fire_damage', label: 'Огонь' },
    { value: 'water_damage', label: 'Вода' },
    { value: 'earth_damage', label: 'Земля' },
    { value: 'air_damage', label: 'Воздух' },
    { value: 'light_damage', label: 'Свет' },
    { value: 'dark_damage', label: 'Тьма' },
    { value: 'phys_damage', label: 'Физ.' },
    
    
    { value: 'element_resist_view', label: 'Сопротивление стихий:', disabled: true },
    { value: 'fire_resist', label: 'Сопротивление к огню' },
    { value: 'water_resist', label: 'Сопротивление к воде' },
    { value: 'earth_resist', label: 'Сопротивление к земле' },
    { value: 'air_resist', label: 'Сопротивление к воздуху' },
    { value: 'light_resist', label: 'Сопротивление к свету' },
    { value: 'dark_resist', label: 'Сопротивление к тьме' },
    { value: 'phys_resist', label: 'Сопротивление к физ. урону' },
    
    { value: 'prev_view', label: 'Разное:', disabled: true },
    { value: 'prev', label: 'Прошлое значение' },
    { value: 'prev_percent', label: 'Прошлый процент' },
    { value: 'total_stats', label: 'Всего ОС' },
    { value: 'lvl', label: 'Уровень' },
    
    { value: 'modify_view', label: 'Модификаторы:', disabled: true },
    { value: 'mana_modify', label: 'Модификатор маны' },
    { value: 'hp_modify', label: 'Модификатор Хп' },
    { value: 'qi_modify', label: 'Модификатор Ки' },
    { value: 'evasion_modify', label: 'Модификатор Уклонения' },
    { value: 'counter_modify', label: 'Модификатор Контрудара' },
    { value: 'defence_modify', label: 'Модификатор Защиты' },
  ],
  condition: [
    { value: '>', label: 'Больше' },
    { value: '>=', label: 'Больше равно' },
    { value: '<', label: 'Меньше' },
    { value: '<=', label: 'Меньше равно' },
    { value: '==', label: 'Равно' },
    { value: '!=', label: 'Не равно' },
  ],
  direction: [
    { value: 'my', label: 'На себя' },
    { value: 'enemy', label: 'На врага' },
    { value: 'enemies', label: 'На врагов' },
    { value: 'teammate', label: 'На союзника' },
    { value: 'teammates', label: 'На союзников' },
  ],
  element: [
    { value: 'element_damage_view', label: 'Стихии:', disabled: true },
    { value: 'fire_damage', label: 'Огонь' },
    { value: 'water_damage', label: 'Вода' },
    { value: 'earth_damage', label: 'Земля' },
    { value: 'air_damage', label: 'Воздух' },
    { value: 'light_damage', label: 'Свет' },
    { value: 'dark_damage', label: 'Тьма' },
    { value: 'phys_damage', label: 'Физ.' },
    { value: 'none', label: 'Без модификатора' },
  ],
  control: [
    { value: 'control_view', label: 'Эффекты контроля:', disabled: true },
    { value: 'stun', label: 'Стан' },
    { value: 'root', label: 'Обездвиживание' },
  ],
  coast: [
    { value: 'mana', label: 'Мана' },
    { value: 'mana_max', label: 'Мана от макс. значения' },
    { value: 'mana_percent', label: 'Процент маны' },
    { value: 'control_mana', label: 'Контроль маны' },
    
    { value: 'qi_view', label: 'Ки:', disabled: true },
    { value: 'qi', label: 'Ки' },
    { value: 'qi_max', label: 'Ки от макс. значения' },
    { value: 'qi_percent', label: 'Процент ки' },
    { value: 'control_qi', label: 'Контроль ки' },
  ],
  aoe: [
    { value: 'damage_view', label: 'Урон:', disabled: true },
    { value: 'default_damage', label: 'Урон игрока' },
  ],
}