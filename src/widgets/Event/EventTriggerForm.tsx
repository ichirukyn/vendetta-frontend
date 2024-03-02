import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EffectConstants, EventConstants, EventTriggerCreateScheme } from "@/widgets";
import { EventTriggerType, ItemType } from "@/shared/types";
import { InferType } from "yup";
import { Checkbox, IconButton, MenuItem, Select } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { fetchAllItem } from "@/shared/api/item";

interface IEventTriggerFormProps {
  index: number
  defaultData?: EventTriggerType
  updateData: (data: EventTriggerType, index: number) => void
  deleteData: (index: number) => void
}

const EventTriggerForm: FC<IEventTriggerFormProps> = ({ defaultData, updateData, deleteData, index }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: yupResolver(EventTriggerCreateScheme) })
  
  const [itemList, setItemList] = useState<ItemType[]>([])
  
  const onSubmit = (data: InferType<typeof EventTriggerCreateScheme>) => {
    if (data.chance && data.chance > 1) data.chance = 1
    
    if (!data?.condition_attr || !data?.condition || !data?.condition_value) {
      data.condition_attr = undefined
      data.condition = undefined
      data.condition_value = undefined
    }
    
    updateData(data, index)
  }
  
  useEffect(() => {
    fetchAllItem().then((res) => {
      if (res.data) setItemList(res.data.filter(({ type }) => type === 'quest'))
    })
  }, [])
  
  useEffect(() => {
    if (defaultData) setData(defaultData)
  }, [defaultData])
  
  const setData = (data: EventTriggerType) => {
    setValue('name', data.name)
    setValue('desc', data.desc || '')
    setValue('condition_attr', data.condition_attr)
    setValue('condition', data.condition)
    setValue('condition_value', data.condition_value)
    setValue('condition_item', data.condition_item)
    setValue('chance', data.chance)
    setValue('trigger_type', data.trigger_type || '')
    setValue('text', data.text)
    setValue('reward', data.reward)
    setValue('mandatory', data.mandatory || false)
    setValue('hidden', data.hidden || false)
  }
  
  return (
    <form className='w_100p block_column align-start mt_5' onSubmit={ handleSubmit(onSubmit) }>
      <Controller control={ control } name='name' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Название</label>
          <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange } placeholder='"Начало приключений!"'/>
          <label className='text_error_200'>{ errors.name?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='desc' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Описание</label>
          <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange }
                 placeholder='Короткое описание тригера..'/>
          <label className='text_error_200'>{ errors.desc?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='text' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Текст (Диалог, Пролог и прочее)</label>
          <textarea value={ field.value } onChange={ field.onChange } className='w_100p'></textarea>
          <label className='text_error_200'>{ errors.text?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='reward' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Награды (Пока на словах, потом будут списки предметов)</label>
          <textarea value={ field.value } onChange={ field.onChange } className='w_100p'></textarea>
        </div>
      ) }/>
      
      
      <Controller control={ control } name='trigger_type' defaultValue={ EventConstants.trigger_type[0].value } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Тип триггера</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EventConstants.trigger_type.map(({ label, value }) => (
              <MenuItem key={ value } value={ value }>{ label }</MenuItem>
            )) }
          </Select>
          <label className='text_error_200'>{ errors.trigger_type?.message }</label>
        </div>
      ) }/>
      
      {/* Condition */ }
      <Controller control={ control } name='condition_attr' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Если атрибут</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EventConstants.attribute.map(({ label, value, disabled }) => (
              <MenuItem key={ value } value={ value } disabled={ disabled }>{ label }</MenuItem>
            )) }
          </Select>
        </div>
      ) }/>
      
      <Controller control={ control } name='condition' defaultValue={ '' } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Условие</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EffectConstants.condition.map(({ label, value }) => (
              <MenuItem key={ value } value={ value }>{ label }</MenuItem>
            )) }
          </Select>
        </div>
      ) }/>
      
      <Controller control={ control } name='condition_value' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Значение условия</label>
          <input
            type="number"
            className='w_100p'
            step={ 0.01 }
            value={ field.value || undefined }
            onChange={ field.onChange }
            placeholder='1, 0, 0.5, -100, etc..'
          />
        </div>
      ) }/>
      
      <Controller control={ control } name='condition_item' defaultValue={ 0 } render={ ({ field }) => (
        <div className="block_column align-start justify-between w_100p">
          <label>Привязка к квестовому предмету</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            <MenuItem value={ 0 }>Без предмета</MenuItem>
            { itemList.map(({ id, name }) => (
              <MenuItem value={ id } key={ id }>{ name }</MenuItem>
            )) }
          </Select>
        </div>
      ) }/>
      
      <Controller control={ control } name='chance' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Шанс срабатывания триггера(Процент!!)</label>
          <input
            type="number"
            className='w_100p'
            step={ 0.01 }
            value={ field.value || undefined }
            onChange={ field.onChange }
            placeholder='Для рандомных событий'
          />
        </div>
      ) }/>
      {/* /Condition */ }
      
      <Controller control={ control } name='mandatory' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label className='image_centerY gap_0 cursor_pointer'>
            <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
            Обязятельный ли триггер?
          </label>
        </div>
      ) }/>
      
      <Controller control={ control } name='hidden' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label className='image_centerY gap_0 cursor_pointer'>
            <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
            Скрытй ли триггер? (Для скрытых заданий)
          </label>
        </div>
      ) }/>
      
      
      <div className="block_row justify-between align-center w_100p mt_10">
        <button className='button'>Сохранить</button>
        <IconButton onClick={ () => deleteData(index) }><Delete/></IconButton>
      </div>
    </form>
  );
};

export default EventTriggerForm;