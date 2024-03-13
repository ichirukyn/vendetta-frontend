import React, { FC, useEffect } from 'react';
import { InferType } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { EnemyLootSchemas } from "@/widgets";
import { ReactComponent as Delete } from '@/shared/assets/icons/Delete.svg'
import { EnemyLootType } from "@/shared/types";
import { useItemStore } from "@/shared/store/ItemStore";
import { toast } from "react-toastify";

export interface IEnemyLootProps {
  index: number
  effectDelete: (index: number) => void
  update_data?: (a: InferType<typeof EnemyLootSchemas>, index: number) => void
  defaultData?: EnemyLootType
}

const EnemyLootForm: FC<IEnemyLootProps> = ({ update_data, index, defaultData, effectDelete }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm({ resolver: yupResolver(EnemyLootSchemas) })
  
  const item_id = watch('item_id')
  
  const { getItemList, getItemOption, itemList } = useItemStore()
  
  useEffect(() => {
    if (defaultData) {
      setValue('item_id', defaultData.item_id)
      setValue('chance', defaultData.chance)
      setValue('count_min', defaultData.count_min)
      setValue('count_max', defaultData.count_max)
      setValue('exp', defaultData.exp)
    }
  }, [defaultData]);
  
  useEffect(() => {
    getItemList()
  }, [])
  
  const onSubmit = (data: EnemyLootType) => {
    console.log(data)
    if (!data.chance) return toast('Шанс нужно обязательно прописать..', { type: 'error' })
    if (0 > data.chance || data.chance > 1) return toast('Шанс не может быть больше 100%', { type: 'error' })
    if (!data.count_max || data?.count_max <= 0) return toast('Лут не может быть отрицательным :)', { type: 'error' })
    
    if (update_data) {
      let item = itemList.find((item) => item.id === data.item_id)
      data = { ...data, item: item }
      
      if (defaultData) {
        data = { ...defaultData, ...data }
      }
      
      update_data(data, index)
      toast('Предмет обновлён (Не забудь сохранить противника!!)', { type: 'info' })
    }
  }
  
  return (
    <form className='w_100p block_column align-start mt_5' onSubmit={ handleSubmit(onSubmit) }>
      <Controller
        name='item_id'
        control={ control }
        defaultValue={ item_id || 0 }
        render={ ({ field }) => (
          <div className="block_column align-start w_100p mt_10">
            <Autocomplete
              disablePortal
              value={ getItemOption().find(({ value }) => value === field.value) || { label: 'Золото', value: 0 } }
              onChange={ (_, option) => field.onChange(option?.value) }
              options={ getItemOption() }
              renderInput={ (params) => <TextField { ...params } label="Предметы"/> }
              className='w_100p'
              getOptionLabel={ (v) => v.label || '' }
              isOptionEqualToValue={ (option, value) => {
                if (value.label === '') return true
                return option.value === value.value
              } }
            />
          </div>
        ) }
      />
      
      <Controller control={ control } name='chance' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Шансы</label>
          <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                 placeholder='1 -- 100% | 0 -- 0%'/>
          <label className='text_error_200'>{ errors.count_min?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='count_min' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Мин. количество</label>
          <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                 placeholder='0, 1, 10'/>
          <label className='text_error_200'>{ errors.count_min?.message }</label>
        </div>
      ) }/>
      
      <Controller control={ control } name='count_max' render={ ({ field }) => (
        <div className="block_column align-start w_100p">
          <label>Макс. количество</label>
          <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                 placeholder='0, 5, 100...'/>
          <label className='text_error_200'>{ errors.count_max?.message }</label>
        </div>
      ) }/>
      
      { item_id === 0 && (
        <Controller control={ control } name='exp' render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Опыт (Сверх. того что выдаст игроку за победу)</label>
            <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                   placeholder='0, 5, 100...'/>
            <label className='text_error_200'>{ errors.count_max?.message }</label>
          </div>
        ) }/>
      ) }
      
      <div className="block_row justify-between align-center w_100p mt_10">
        <button className='button'>Сохранить</button>
        <IconButton onClick={ () => effectDelete(index) }><Delete/></IconButton>
      </div>
    </form>
  );
};

export default EnemyLootForm;