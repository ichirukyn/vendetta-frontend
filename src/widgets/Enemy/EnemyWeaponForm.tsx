import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnemyWeaponSchemas } from "@/widgets";
import { InferType } from "yup";
import { EnemyWeaponType, ItemType } from "@/shared/types";
import { MenuItem, Select } from "@mui/material";
import { fetchAllItem } from "@/shared/api/item";

export interface IEnemyWeaponFormProps {
  weapon?: EnemyWeaponType,
  updateWeapon: (weapon: EnemyWeaponType) => void
}

const EnemyWeaponForm: FC<IEnemyWeaponFormProps> = ({ weapon, updateWeapon }) => {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(EnemyWeaponSchemas) })
  
  const [weaponList, setWeaponList] = useState<ItemType[]>([])
  
  const onSubmit = (data: InferType<typeof EnemyWeaponSchemas>) => {
    updateWeapon(data as EnemyWeaponType)
  }
  
  useEffect(() => {
    fetchAllItem().then((res) => {
      if (res.data) setWeaponList(res.data.filter(({ type }) => type === 'weapon'))
    })
  }, []);
  
  useEffect(() => {
    if (weapon) setData(weapon)
  }, [weapon]);
  
  
  const setData = (data: EnemyWeaponType) => {
    setValue('weapon_id', data.weapon_id)
    setValue('lvl', data.lvl)
  }
  
  return (
    <form className='w_100p' onSubmit={ handleSubmit(onSubmit) }>
      <label>Оружие</label>
      <Controller control={ control } name='weapon_id' defaultValue={ 1 } render={ ({ field }) => (
        <div className="block_row align-start justify-between gap_15 w_100p mt_10">
          <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
            <MenuItem value={ 0 } disabled>Любой класс</MenuItem>
            { weaponList.map(({ id, name }) => (
              <MenuItem value={ id } key={ id }>{ name }</MenuItem>
            )) }
          </Select>
          
          <button className="button p_15X">Выбрать</button>
        </div>
      ) }/>
    </form>
  );
};

export default EnemyWeaponForm;