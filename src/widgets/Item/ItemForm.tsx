import React, { FC, useEffect, useState } from 'react';
import { ClassType, ItemType, RaceType } from "@/shared/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemCreateScheme } from "@/widgets/Item/Item.schemas";
import { InferType } from "yup";
import { fetchAllRace } from "@/shared/api/race";
import { fetchAllClass } from "@/shared/api/class";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { ItemConstants } from "@/widgets/Item/Item.constants";
import { createItem, fetchOneItem, updateItem } from "@/shared/api/item";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTechniqueStore } from "@/shared/store/TechniqueStore";
import { pathRoutes } from "@/app";


export interface IItemFormProps {
  id?: number,
}

const ItemForm: FC<IItemFormProps> = ({ id }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({ resolver: yupResolver(ItemCreateScheme) })
  const navigate = useNavigate();
  
  const { getTechniqueOption } = useTechniqueStore()
  
  const [raceList, setRaceList] = useState<RaceType[]>([])
  const [classList, setClassList] = useState<ClassType[]>([])
  
  const class_id = watch('class_id')
  const class_type = watch('class_type')
  const type = watch('type')
  
  const onSubmit = async (data: InferType<typeof ItemCreateScheme>) => {
    if (data.class_type === 'null') data.class_type = null
    
    if (data.race_id == 0 && data.class_id == 0) {
      data.race_id = null
      data.class_id = null
    }
    
    if (!id) {
      createItem(data as ItemType).then((res) => {
        if (res.data) {
          reset()
          toast('Создание успешно', { type: 'success' })
          navigate(`/${ pathRoutes.item.edit }/${ res.data.id }`)
        }
      })
    } else {
      updateItem(data as ItemType, id).then((res) => {
        if (res.data) {
          toast('Обновление успешно', { type: 'success' })
        }
      })
    }
  }
  
  useEffect(() => {
    fetchAllRace().then((res) => setRaceList(res.data))
    fetchAllClass().then((res) => setClassList(res.data))
  }, []);
  
  useEffect(() => {
    if (!id) return
    
    fetchOneItem(id).then(({ data }) => {
      setData(data)
    })
  }, [id]);
  
  useEffect(() => {
    if (class_type !== 'null' && class_id !== 0) setValue('class_type', 'null')
  }, [class_id]);
  
  useEffect(() => {
    if (class_id !== 0 && class_type !== 'null') setValue('class_id', 0)
  }, [class_type])
  
  const setData = (data: ItemType) => {
    setValue('name', data.name)
    setValue('desc', data.desc)
    setValue('value', data.value)
    setValue('type', data.type)
    setValue('modify', data.modify)
    setValue('class_type', !data.class_type ? 'null' : data.class_type)
    setValue('class_id', !data.class_id ? 0 : data.class_id)
    setValue('race_id', !data.race_id ? 0 : data.race_id)
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
              <label>Описание</label>
              <input
                type="text"
                className='w_100p'
                value={ field.value } onChange={ field.onChange }
                placeholder='Очень длинное описание'
              />
              <label className='text_error_200'>{ errors.desc?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='type' defaultValue={ ItemConstants.type[0].value } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Тип предмета</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                { ItemConstants.type.map(({ value, label }) => (
                  <MenuItem value={ value } key={ value }>{ label }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          { type === 'weapon' && (
            <>
              <Controller control={ control } name='value' render={ ({ field }) => (
                <div className="block_column align-start w_100p">
                  <label>Значение</label>
                  <input type="number" step="0.01" className='w_100p' value={ field.value || 0 } onChange={ field.onChange }
                         placeholder='0'/>
                </div>
              ) }/>
              
              <Controller control={ control } name='modify' render={ ({ field }) => (
                <div className="block_column align-start w_100p">
                  <label>Модификатор улучшения</label>
                  <input type="number" step="0.01" className='w_100p' value={ field.value || 0 } onChange={ field.onChange }
                         placeholder='* на Значение'/>
                </div>
              ) }/>
            </>
          ) }
          
          { type === 'technique_book' && (
            <Controller control={ control } name='value' render={ ({ field }) => (
              <div className="block_column align-start w_100p mt_15">
                <Autocomplete
                  fullWidth
                  disablePortal
                  value={ getTechniqueOption().find(({ value }) => value === field.value) || null }
                  onChange={ (_, option) => field.onChange(option?.value) }
                  options={ getTechniqueOption() }
                  renderInput={ (params) => <TextField { ...params } label="Техника"/> }
                  getOptionLabel={ (v) => v.label || '' }
                  isOptionEqualToValue={ (option, value) => {
                    if (value.label === '') return true
                    return option.value === value.value
                  } }
                />
              </div>
            ) }/>
          ) }
          
          <Controller control={ control } name='class_type' defaultValue={ 'null' } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Тип класса</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 'null' }>Любой тип</MenuItem>
                { ItemConstants.class_type.map(({ value, label }) => (
                  <MenuItem value={ value } key={ value }>{ label }</MenuItem>
                )) }
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
              <Select className='w_100p' value={ field.value } onChange={ field.onChange } disabled={ !(class_type === 'null') }>
                <MenuItem value={ 0 }>Любой класс</MenuItem>
                { classList.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
        </form>
        
        <div className="block_row justify-between w_100p">
          <button className='button button_outline_active w_100p mt_10' onClick={ () => navigate(-1) }>Назад</button>
          <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Отправить</button>
        </div>
      </div>
    </>
  );
};

export default ItemForm;