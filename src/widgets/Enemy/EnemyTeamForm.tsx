import React, { FC, useEffect, useState } from 'react';
import { EnemyTeamType, EnemyType } from "@/shared/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { EnemyTeamSchemas } from "@/widgets";
import { createTeamEnemy } from "@/shared/api/team";
import { fetchAllEnemy } from "@/shared/api/enemy";
import { useEnemyTeamStore } from "@/shared/store/Enemy";


export interface ITechniqueFormProps {
  id?: number,
}

const EnemyTeamForm: FC<ITechniqueFormProps> = () => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(EnemyTeamSchemas) })
  const navigate = useNavigate();
  const { id } = useParams()
  const { enemyTeamList, getEnemyTeamList } = useEnemyTeamStore()
  const [enemies, setEnemies] = useState<EnemyType[]>([])
  
  const onSubmit = async (data: InferType<typeof EnemyTeamSchemas>) => {
    if (!data.enemy_id) return toast('Нужно выбрать противника или команду', { type: 'error' })
    if (!id) return toast('Error')
    const team_id = Number(id)
    
    enemyTeamList.find((team) => team?.is_leader === true)
    createTeamEnemy({ ...data, team_id: team_id } as EnemyTeamType, team_id).then((res) => {
      if (res.data) {
        reset()
        toast('Создание успешно', { type: 'success' })
        getEnemyTeamList(team_id)
      }
    })
  }
  
  useEffect(() => {
    fetchAllEnemy().then((res) => {
      if (res.data) setEnemies(res.data)
    })
  }, []);
  
  useEffect(() => {
    if (id && !enemyTeamList?.length) {
      getEnemyTeamList(Number(id))
    }
  }, [id, enemyTeamList.length]);
  
  return (
    <>
      <div className="block_column align-start card brs_10 maxw_450">
        <form className="block_column align-start w_100p">
          <Controller control={ control } name='enemy_id' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Противник</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 } selected>Противники</MenuItem>
                { enemies.map(({ name, id }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='prefix' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Префикс</label>
              <input type="text" className='w_100p' value={ field.value || '' } onChange={ field.onChange } placeholder='Бурундук!'/>
              <label className='text_error_200'>{ errors.prefix?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='is_leader' defaultValue={ false } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label className='image_centerY gap_0 cursor_pointer'>
                <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
                Лидер?
              </label>
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

export default EnemyTeamForm;