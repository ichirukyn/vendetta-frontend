import React, { FC } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { Autocomplete, Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BranchCreateScheme, EffectConstants } from "@/widgets";
import { useTechniqueStore } from "@/shared/store/TechniqueStore";
import { createBranchTechnique } from "@/shared/api/technique";
import { toast } from "react-toastify";
import { useTechniqueBranchStore } from "@/shared/store/Technique/TechniqueBranchStore";

const BranchForm: FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ resolver: yupResolver(BranchCreateScheme) })
  const navigate = useNavigate();
  
  const { getTechniqueOption } = useTechniqueStore()
  const { getTechniqueBranchList } = useTechniqueBranchStore()
  
  const onSubmit = async (data: InferType<typeof BranchCreateScheme>) => {
    if (!data?.condition_attribute || !data?.condition || !data?.condition_value) {
      data.condition_attribute = undefined
      data.condition = undefined
      data.condition_value = undefined
    }
    
    createBranchTechnique(data).then((res) => {
      if (res.data) {
        toast('Создание успешно', { type: 'success' })
        getTechniqueBranchList()
        reset()
      }
    })
  }
  
  return (
    <div className="block_column align-start card brs_10 maxw_450">
      <form className="block_column align-start w_100p">
        <Controller
          name='parent_id'
          control={ control }
          defaultValue={ 0 }
          render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <Autocomplete
                fullWidth
                disablePortal
                value={ getTechniqueOption().find(({ value }) => value === field.value) || null }
                onChange={ (_, option) => field.onChange(option?.value) }
                options={ getTechniqueOption() }
                renderInput={ (params) => <TextField { ...params } label="Родительская техника"/> }
                getOptionLabel={ (v) => v.label || '' }
                isOptionEqualToValue={ (option, value) => {
                  if (value.label === '') return true
                  return option.value === value.value
                } }
              />
            </div>
          ) }
        />
        
        
        <Controller
          name='technique_id'
          control={ control }
          defaultValue={ 0 }
          render={ ({ field }) => (
            <div className="block_column align-start w_100p mt_20">
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
          ) }
        />
        
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
        
        
        <Controller control={ control } name='is_hidden' defaultValue={ false } render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label className='image_centerY gap_0 cursor_pointer'>
              <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
              Скрытая связь?
            </label>
          </div>
        ) }/>
      </form>
      
      <div className="block_row justify-between w_100p">
        <button className='button button_outline_active w_100p mt_10' onClick={ () => navigate(-1) }>Назад</button>
        <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Отправить</button>
      </div>
    </div>
  );
};

export default BranchForm;