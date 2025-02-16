import React, { FC, useEffect } from 'react';
import { boolean, InferType, number, object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, IconButton, MenuItem, Select } from "@mui/material";
import { EffectConstants } from "@/widgets";
import { ReactComponent as Delete } from '@/shared/assets/icons/Delete.svg'
import { SpellEffectType } from "@/shared/types";
import { EffectTypeAttribute, EffectTypeList, EffectValueLabel } from "@/widgets/Spell/Effect/Effect.constants";

export interface IEffectCreateProps {
  index: number
  effectDelete: (index: number) => void
  update_data?: (a: InferType<typeof EffectCreateScheme>, index: number) => void
  defaultData?: SpellEffectType
}


export const EffectCreateScheme = object().shape({
  name: string().required('Введите название эффекта (Усиление, Щит, Шок и т.п.)'),
  type: string(),
  attribute: string(),
  value: number().optional(),
  
  dependency: string().optional().nullable(),
  dependency_value: number().optional().nullable(),
  dependency_add: number().optional().nullable(),
  
  condition_attribute: string().nullable(),
  condition: string().notRequired().nullable(),
  condition_value: number().notRequired().nullable(),
  
  direction: string(),
  duration: number().optional(),
  is_single: boolean().optional(),
  every_turn: boolean().optional()
})


const attributeHide = ['hidden']
const EffectForm: FC<IEffectCreateProps> = ({ update_data, index, defaultData, effectDelete }) => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue
  } = useForm({ resolver: yupResolver(EffectCreateScheme) })
  
  const type = watch('type')
  
  useEffect(() => {
    if (defaultData) {
      setValue('name', defaultData.name)
      setValue('type', defaultData.type)
      setValue('attribute', defaultData.attribute)
      setValue('value', defaultData.value)
      setValue('condition_attribute', defaultData.condition_attribute)
      setValue('condition', defaultData.condition)
      setValue('condition_value', defaultData.condition_value)
      setValue('direction', defaultData.direction)
      setValue('duration', defaultData.duration)
      setValue('is_single', defaultData.is_single)
      setValue('every_turn', defaultData?.every_turn)
    }
  }, [defaultData]);
  
  const onSubmit = (data: InferType<typeof EffectCreateScheme>) => {
    if (!data.direction) data.direction = EffectConstants.direction[0].value
    if (data.every_turn) data.is_single = true
    
    if (!data.value) data.value = 0
    
    if (!data?.condition_attribute || !data?.condition || !data?.condition_value) {
      data.condition_attribute = undefined
      data.condition = undefined
      data.condition_value = undefined
    }
    
    if (!data.attribute) {
      if (data.type == 'control') data.attribute = EffectConstants.control[0].value
      else if (data.type == 'period') data.attribute = EffectConstants.element[0].value
      else data.attribute = EffectConstants.attribute[0].value
    }
    
    
    if (update_data) {
      if (defaultData) {
        data = { ...defaultData, ...data }
      }
      
      update_data(data, index)
    }
  }
  
  
  return (
    <form className='w_100p block_column align-start mt_5' onSubmit={ handleSubmit(onSubmit) }>
      <Controller control={ control } name='name' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Название</label>
          <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange } placeholder='Усиление'/>
          <label className='text_error_200'>{ errors.name?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='type' defaultValue={ EffectConstants.type[0].value } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Тип эффекта</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EffectTypeList.map(({ label, value, disabled }) => (
              <MenuItem key={ value } value={ value } disabled={ disabled }>{ label }</MenuItem>
            )) }
          </Select>
        </div>
      ) }/>
      
      { !attributeHide.includes(type || '') && (
        <Controller control={ control } name='attribute' defaultValue={ EffectConstants.attribute[0].value } render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Атрибут</label>
            <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
              { type ?
                Object.keys(EffectTypeAttribute).map((effectType) => {
                  if (effectType !== type) {
                    return null
                  }
                  return EffectTypeAttribute[effectType].map(({ label, value, disabled }) => (
                    <MenuItem key={ value } value={ value } disabled={ disabled || false }>{ label }</MenuItem>
                  ));
                }) :
                EffectConstants.attribute.map(({ label, value, disabled }) => (
                  <MenuItem key={ value } value={ value } disabled={ disabled || false }>{ label }</MenuItem>
                ))
              }
            </Select>
          </div>
        ) }/>
      ) }
      
      <Controller control={ control } name='value' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>
            { type
              ?
              EffectValueLabel.map((text) => {
                if (text.value === type) return text.label
                else return null
              })
              :
              EffectValueLabel[0].label
            }
          </label>
          <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                 placeholder='1, 0, 0.5, -100, etc..'/>
          <label className='text_error_200'>{ errors.value?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='condition_attribute' defaultValue={ '' } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Если атрибут</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EffectConstants.attribute.map(({ label, value, disabled }) => (
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
      
      <Controller control={ control } name='direction' defaultValue={ EffectConstants.direction[0].value } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Направление</label>
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            { EffectConstants.direction.map(({ label, value }) => (
              <MenuItem key={ value } value={ value }>{ label }</MenuItem>
            )) }
          </Select>
        </div>
      ) }/>
      
      <Controller control={ control } name='duration' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Длительность эффекта</label>
          <input type="number" step="0.01" className='w_100p' placeholder='0' value={ field.value } onChange={ field.onChange }/>
        </div>
      ) }/>
      
      <Controller control={ control } name='is_single' defaultValue={ true } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label className='image_centerY gap_0 cursor_pointer'>
            <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
            Применять лишь раз?
          </label>
        </div>
      ) }/>
      
      <Controller control={ control } name='every_turn' defaultValue={ false } render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label className='image_centerY gap_0 cursor_pointer'>
            <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
            Применять каждый ход, пока действет эффект?
          </label>
        </div>
      ) }/>
      
      <div className="block_row justify-between align-center w_100p mt_10">
        <button className='button'>Сохранить</button>
        <IconButton onClick={ () => effectDelete(index) }><Delete/></IconButton>
      </div>
    </form>
  );
};

export default EffectForm;