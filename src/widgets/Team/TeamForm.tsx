import React, { FC } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TeamSchemas } from "@/widgets/Team/Team.schemas";
import { useEnemyStore } from "@/shared/store/EnemyStore";
import { useTeamStore } from "@/shared/store/TeamStore";
import { createTeam, createTeamEnemy } from "@/shared/api/team";
import { TeamType } from "@/shared/types";


export interface ITechniqueFormProps {
  id?: number,
}

const EnemyTeamForm: FC<ITechniqueFormProps> = () => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(TeamSchemas) })
  
  const navigate = useNavigate();
  const { enemyList } = useEnemyStore()
  const { getTeamList } = useTeamStore()
  
  const onSubmit = async (data: InferType<typeof TeamSchemas>) => {
    if (!data.leader_id) return toast('Нужно выбрать лидера', { type: 'error' })
    
    // TODO: Пока не использовать провреку, что уже есть команда
    // const team = await fetchAllEnemyTeam(data.leader_id)
    // if (team.data.length) return toast('Лидер уже состоит в команде')
    
    createTeam(data as TeamType).then((res) => {
      if (res.data) {
        createTeamEnemy({ enemy_id: 4, team_id: 7, is_leader: true }, 7).then(() => {
          toast('Лидер закреплён за командой!', { type: 'success' })
        })
        
        reset()
        toast('Создание успешно', { type: 'success' })
        getTeamList()
      }
    })
  }
  
  return (
    <>
      <div className="block_column align-start card brs_10 maxw_450">
        <form className="block_column align-start w_100p">
          <Controller control={ control } name='leader_id' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Лидер</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 } disabled selected>Противники</MenuItem>
                { enemyList.map(({ name, id }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='name' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Название команды</label>
              <input type="text" className='w_100p' value={ field.value || '' } onChange={ field.onChange } placeholder='Бурундуки!'/>
              <label className='text_error_200'>{ errors.name?.message }</label>
            </div>
          ) }/>
          
          <Controller control={ control } name='is_private' defaultValue={ false } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label className='image_centerY gap_0 cursor_pointer'>
                <Checkbox defaultChecked={ field.value } checked={ field.value } onChange={ field.onChange }/>
                Приватная команда?
              </label>
            </div>
          ) }/>
          
          <Controller control={ control } name='is_npc' defaultValue={ true } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label className='image_centerY gap_0 cursor_pointer'>
                <Checkbox defaultChecked={ field.value } checked={ field.value } disabled onChange={ field.onChange }/>
                Команда нпс?
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