import { OptionsType } from "@/shared/types";
import { EffectConstants, EffectStats } from "@/widgets";

export const EffectTypeList = [
  { value: 'number', label: 'Добавить/Отнять число' },
  { value: 'percent', label: 'Добавить/Отнять процент' },
  { value: 'break', label: '', disabled: true },
  
  { value: 'period', label: 'Периодический урон' },
  { value: 'control', label: 'Контроль противника' },
  { value: 'break_1', label: '', disabled: true },
  
  { value: 'shield', label: 'Щит' },
  { value: 'heal', label: 'Хилл' },
  { value: 'dependency', label: 'Зависимость от статов' },
  { value: 'break_2', label: '', disabled: true },
  
  { value: 'coast', label: 'Затраты' },
  { value: 'activate', label: 'Условия активации' },
  { value: 'hidden', label: 'Скрытый эффект' },
]

export const EffectValueLabel = [
  { value: 'all', label: 'Значение'},
  
  { value: 'number', label: 'Значение' },
  { value: 'percent', label: 'Процент' },
  
  { value: 'shield', label: 'Базовый процент щита'},
  { value: 'heal', label: 'Базовый процент лечения'},
  { value: 'dependency', label: 'Процент от характеристики' },
  
  { value: 'period', label: 'Шанс попадания эффектов (В процентах!)'},
  { value: 'control', label: 'Шанс попадания эффектов (В процентах!)'},
  
  { value: 'coast', label: 'Базовые затраты' },
  { value: 'activate', label: 'Значение активации' },
]

export const EffectTypeAttribute: Record<string, OptionsType[]> = {
  number: EffectConstants.attribute as OptionsType[],
  percent: EffectConstants.attribute as OptionsType[],
  
  period: EffectConstants.element,
  control: EffectConstants.control,
  
  shield: EffectStats,
  heal: EffectStats,
  dependency: EffectConstants.attribute as OptionsType[],
  
  coast: EffectConstants.coast,
  activate: EffectConstants.attribute as OptionsType[],
};
