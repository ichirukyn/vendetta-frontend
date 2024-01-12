import React, { ChangeEvent, FC, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnemyStatsSchemas } from "@/widgets";
import { InferType } from "yup";
import { EnemyStatsType } from "@/shared/types";

export interface IEnemyStatsFormProps {
  stats?: EnemyStatsType,
  updateStats: (stats: EnemyStatsType) => void
}

const statsList = ['strength', 'health', 'speed', 'accuracy', 'dexterity', 'soul', 'intelligence', 'submission']

const initDate = {
  lvl: 1,
  strength: 1,
  health: 1,
  speed: 1,
  accuracy: 1,
  dexterity: 1,
  soul: 1,
  intelligence: 1,
  submission: 1,
  crit_rate: 0.05,
  crit_damage: 0.5,
  resist: 0.1,
  total_stats: 8,
}

const EnemyStatsForm: FC<IEnemyStatsFormProps> = ({ stats, updateStats }) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset
  } = useForm({ resolver: yupResolver(EnemyStatsSchemas) })
  
  const updateTotalStats = (e: ChangeEvent<HTMLInputElement>, onChange: (e: ChangeEvent<HTMLInputElement>) => void, stat_name: string) => {
    let total_stats = 0
    
    for (let stat of statsList) {
      if (stat == stat_name) {
        let val = e.target.value
        total_stats += val ? Number(val) : 0
      } else {
        let val = getValues(stat as keyof InferType<typeof EnemyStatsSchemas>)
        total_stats += val ? Number(val) : 0
      }
    }
    
    setValue('total_stats', total_stats)
    onChange(e)
  }
  
  const onSubmit = (data: InferType<typeof EnemyStatsSchemas>) => {
    if (!data.resist || data.resist < 0) data.resist = 0.1
    if (data.resist > 1) data.resist = 0.5
    
    if (!data.crit_rate || data.crit_rate < 0) data.crit_rate = 0.5
    if (data.crit_rate > 1) data.crit_rate = 1
    
    
    updateStats(data as EnemyStatsType)
  }
  
  useEffect(() => {
    if (stats) setData(stats)
    else setData(initDate)
  }, [stats]);
  
  useEffect(() => {
  
  }, []);
  
  const setData = (data: EnemyStatsType) => {
    setValue('lvl', data.lvl)
    setValue('strength', data.strength)
    setValue('health', data.health)
    setValue('speed', data.speed)
    setValue('accuracy', data.accuracy)
    setValue('dexterity', data.dexterity)
    setValue('soul', data.soul)
    setValue('intelligence', data.intelligence)
    setValue('submission', data.submission)
    setValue('crit_rate', data.crit_rate)
    setValue('crit_damage', data.crit_damage)
    setValue('resist', data.resist)
    setValue('total_stats', data.total_stats)
  }
  
  
  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="block_column gap_15 align-start w_100p">
      <Controller control={ control } name='lvl' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Уровень</label>
          <input type="number" className='w_100p' value={ field.value || 1 } onChange={ field.onChange } placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='strength' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Сила</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'strength') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='health' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Здоровье</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'health') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='speed' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Скорость</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'speed') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='accuracy' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Точность</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'accuracy') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='dexterity' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Ловкость</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'dexterity') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='soul' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Дух</label>
          <input type="number" className='w_100p' value={ field.value || 1 } onChange={ (e) => updateTotalStats(e, field.onChange, 'soul') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='intelligence' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Интеллект</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'intelligence') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='submission' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Подчинение</label>
          <input type="number" className='w_100p' value={ field.value || 1 }
                 onChange={ (e) => updateTotalStats(e, field.onChange, 'submission') }
                 placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='crit_rate' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Крит шанс (Процент!)</label>
          <input type="number" step={ 0.01 } className='w_100p' value={ field.value || 0.05 } onChange={ field.onChange } placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='crit_damage' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Крит урон (Процент!)</label>
          <input type="number" step={ 0.01 } className='w_100p' value={ field.value || 0.5 } onChange={ field.onChange } placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='resist' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Сопротивление (Процент!)</label>
          <input type="number" step={ 0.01 } className='w_100p' value={ field.value || 0.1 } onChange={ field.onChange } placeholder='0'/>
        </div>
      ) }/>
      
      <Controller control={ control } name='total_stats' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Всего очков</label>
          <input type="number" className='w_100p' value={ field.value || 1 } onChange={ field.onChange } placeholder='0' disabled/>
        </div>
      ) }/>
      
      
      <button className='button mt_15'>Сохранить</button>
    </form>
  );
};

export default EnemyStatsForm;