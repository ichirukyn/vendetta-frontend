import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TechniqueCreateScheme } from "@/widgets/Technique/Technique.schemas";
import { InferType } from "yup";
import { EffectCreateScheme, EffectEmpty } from "@/widgets";
import {
  createTechnique,
  createTechniqueEffect,
  deleteTechniqueEffect,
  fetchAllTechniqueEffect,
  fetchOneTechnique,
  updateTechnique,
  updateTechniqueEffect
} from "@/shared/api/technique";
import { EffectType, TechniqueEffectType, TechniqueType } from "@/shared/types/technique";
import { toast } from "react-toastify";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, MenuItem, Select } from "@mui/material";
import EffectForm from "@/widgets/Effect/EffectForm";
import { ClassType, RaceType } from "@/shared/types";
import { fetchAllClassByRace, fetchAllRace } from "@/shared/api/race";
import { TechniqueConstants } from "@/widgets/Technique/Technique.constant";

export interface ITechniqueFormProps {
  id?: number,
}

const TechniqueForm: FC<ITechniqueFormProps> = ({ id }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(TechniqueCreateScheme) })
  
  const [accordion, setAccordion] = useState<null | number>(null)
  const [effectList, setEffectList] = useState<TechniqueEffectType[] | [] | EffectEmpty[]>([])
  
  const [raceList, setRaceList] = useState<RaceType[]>([])
  const [classList, setClassList] = useState<ClassType[]>([])
  
  const race_id = watch('race_id')
  
  const onSubmit = async (data: InferType<typeof TechniqueCreateScheme>) => {
    if (!data.damage || data?.damage < 0) data.damage = 0
    if (!data.cooldown || data?.damage < 0) data.cooldown = 0
    
    if (data.damage > 5) data.damage = 5
    if (data.cooldown > 5) data.cooldown = 5
    
    if (data.race_id != 0) {
      let classValid = classList.find((item) => item.id === data.class_id && item.race_id == data.race_id)
      if (!classValid && data.class_id != 0) return toast('Нужно завершить выбор класса', { type: 'warning' })
    }
    
    if (data.race_id == 0 && data.class_id == 0) {
      data.race_id = null
      data.class_id = null
    }
    
    
    if (!id) {
      const technique = await createTechnique(data as TechniqueType)
      
      if (!technique.data) return toast('Ошибка', { type: 'error' })
      id = technique.data.id
      
      let error = false
      
      if (effectList.length) {
        effectList.map(async (effect) => {
          if (!technique.data.id) {
            error = true
            return toast('Ошибка technique_id', { type: "error" })
          }
          await createTechniqueEffect(effect as EffectType, technique.data.id)
        })
      }
      
      if (!error) {
        toast('Техника создана!', { type: "success" })
        setEffectList([])
      }
    } else {
      updateTechnique(data as TechniqueType, id).then((res) => {
        if (res.data) {
          toast('Техника обновлена!', { type: 'success' })
          setData(res.data)
        }
      })
      
      if (effectList.length < 1) return
      
      let i = -1
      for (let effect of effectList) {
        i++
        
        if (!effect?.id) {
          createTechniqueEffect(effect as EffectType, id).then((res) => {
            effectList[i] = res.data
            setEffectList(effectList)
          })
          
          continue
        }
        
        updateTechniqueEffect(effect as EffectType, effect.id!, id).then((res) => {
          effectList[i] = res.data
          setEffectList(effectList)
        })
      }
    }
  }
  
  
  useEffect(() => {
    fetchAllRace().then((res) => setRaceList(res.data))
  }, []);
  
  useEffect(() => {
    if (race_id) fetchAllClassByRace(race_id).then((res) => setClassList(res.data))
  }, [race_id]);
  
  useEffect(() => {
    if (id) {
      fetchOneTechnique(id).then(({ data }) => {
        setData(data)
      })
      
      fetchAllTechniqueEffect(id).then(({ data }) => {
        setEffectList([...data])
      })
    }
  }, [id])
  
  const setData = (data: TechniqueType) => {
    setValue('name', data.name)
    setValue('desc', data.desc)
    setValue('desc_short', data.desc_short)
    setValue('damage', data.damage)
    setValue('type_damage', data.type_damage)
    setValue('type_attack', data.type_attack)
    setValue('distance', data.distance)
    setValue('race_id', data.race_id)
    setValue('class_id', data.class_id)
    setValue('type', data.type)
    setValue('cooldown', data.cooldown)
    setValue('is_stack', data.is_stack)
  }
  
  const onUpdateEffect = (data: InferType<typeof EffectCreateScheme>, index: number) => {
    effectList[index] = data;
    setEffectList([...effectList]);
  }
  
  const effectAdd = () => {
    if (effectList.length > 4) return toast('Максимум 5 эффектов', { type: 'warning' })
    const name = `Бонус - ${ effectList.length.toString() }`
    let effects = [...effectList, { name: name }]
    setEffectList(effects)
  }
  
  const effectDelete = (index: number) => {
    if (id && effectList[index].id) {
      deleteTechniqueEffect(effectList[index].id!, id).then(() => {
        toast('Эффект удалён успещно!', { type: "success" })
      })
    }
    
    effectList.splice(index, 1)
    setEffectList([...effectList])
    setAccordion(null)
  }
  
  return (
    <>
      <div className="block_column align-start card brs_10 maxw_450">
        <form className="block_column align-start w_100p">
          <Controller control={ control } name='name' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Название</label>
              <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange } placeholder='Жертвенный удар'/>
              <label className='text_error_200'>{ errors.name?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='desc' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Описание (Подробное)</label>
              <input
                type="text"
                className='w_100p'
                value={ field.value } onChange={ field.onChange }
                placeholder='Очень длинное описание, с числами, Жертвенного удара'
              />
              <label className='text_error_200'>{ errors.desc?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='desc_short' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Описание (Короткое)</label>
              <input
                type="text"
                className='w_100p'
                value={ field.value } onChange={ field.onChange }
                placeholder='Очень длинное описание Жертвенного удара'
              />
              <label className='text_error_200'>{ errors.desc_short?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='damage' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Урон</label>
              <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                     placeholder='1 - это 100%'/>
            </div>
          ) }/>
          
          <Controller control={ control } name='type_damage' defaultValue={ 'fire_damage' } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Модификатор стихии</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                { TechniqueConstants.elements.map(({ value, label }) => (
                  <MenuItem value={ value } key={ value }>{ label }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='distance' defaultValue={ 'melee' } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Дистанция</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value='melee'>Ближнияя</MenuItem>
                <MenuItem value='distant'>Дальняя</MenuItem>
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='race_id' defaultValue={ 0 } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Привязка к расе</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 }>Любая раса</MenuItem>
                { raceList.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='class_id' defaultValue={ 0 } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Привязка к классу</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 }>Любой класс</MenuItem>
                { classList.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='type' defaultValue={ 'attack' } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Тип техники</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value='attack'>Атака</MenuItem>
                <MenuItem value='support'>Поддержка</MenuItem>
              </Select>
            </div>
          ) }/>
          
          
          <Controller control={ control } name='type_attack' defaultValue={ 'all' } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Привязка к основному атрибуту</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                { TechniqueConstants.type_attack.map(({ value, label }) => (
                  <MenuItem value={ value } key={ value }>{ label }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='cooldown' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>КД</label>
              <input type="number" className='w_100p' placeholder='0' value={ field.value } onChange={ field.onChange }/>
            </div>
          ) }/>
          
          <Controller control={ control } name='is_stack' defaultValue={ false } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label className='image_centerY gap_0 cursor_pointer'>
                <Checkbox value={ field.value } onChange={ field.onChange }/>
                Может ли стакатся?
              </label>
            </div>
          ) }/>
        </form>
        
        <button className='button button_outline_active w_100p' onClick={ effectAdd }>Добавить эффект</button>
        
        { effectList.map((value, index) => (
          <Accordion key={ index } expanded={ accordion === index } onChange={ () => setAccordion(accordion === index ? null : index) }
                     className='w_100p'>
            <AccordionSummary aria-controls={ `${ index }-content` } id={ `${ index }-header` } className='b_1 bc_gray_100'>
              <div className="block_row align-center justify-between w_100p">
                <p className='text_body'>Эффект: { value?.name }</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <EffectForm
                update_data={ onUpdateEffect }
                index={ index }
                defaultData={ effectList[index] as EffectType | undefined }
                effectDelete={ effectDelete }/>
            </AccordionDetails>
          </Accordion>
        )) }
        
        
        <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Отправить</button>
      </div>
    </>
  );
};

export default TechniqueForm;