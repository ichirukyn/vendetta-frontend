import React, { FC, useEffect, useState } from 'react';
import { EnemyType, FloorEnemyType, TeamType } from "@/shared/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useArenaStore } from "@/shared/store/ArenaStore";
import { ArenaFloorCreateScheme } from "@/widgets/Arena/Arena.schemas";
import { createArenaEnemy, fetchOneArenaEnemy, updateArenaEnemy } from "@/shared/api/arena";
import { fetchAllEnemy } from "@/shared/api/enemy";
import { fetchAllTeam } from "@/shared/api/team";


export interface ITechniqueFormProps {
  id?: number,
}

const ArenaFloorForm: FC<ITechniqueFormProps> = ({ id }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({ resolver: yupResolver(ArenaFloorCreateScheme) })
  const navigate = useNavigate();
  
  const [enemies, setEnemies] = useState<EnemyType[]>([])
  const [teams, setTeams] = useState<TeamType[]>([])
  const [floorEnemyId, setFloorEnemyId] = useState<number | undefined>(id)
  const { floorList, floor, getArenaList } = useArenaStore()
  
  const enemy_id = watch('enemy_id')
  const team_id = watch('team_id')
  
  const onSubmit = async (data: InferType<typeof ArenaFloorCreateScheme>) => {
    if (!data.team_id && !data.enemy_id) return toast('Нужно выбрать противника или команду', { type: 'error' })
    if (!data.floor_id) return toast('Нужно выбрать этаж', { type: 'error' })
    
    if (!floorEnemyId) {
      createArenaEnemy(data.floor_id, data as FloorEnemyType).then((res) => {
        if (res.data) {
          reset()
          toast('Создание успешно', { type: 'success' })
          setFloorEnemyId(res.data.id)
          getArenaList()
        }
      })
    } else {
      updateArenaEnemy(data.floor_id, floorEnemyId, data as FloorEnemyType).then((res) => {
        if (res.data) {
          toast('Обновление успешно', { type: 'success' })
          getArenaList()
        }
      })
    }
  }
  
  
  useEffect(() => {
    fetchAllEnemy().then((res) => {
      if (res.data) setEnemies(res.data)
    })
    fetchAllTeam(true).then((res) => {
      if (res.data) setTeams(res.data)
    })
  }, []);
  
  useEffect(() => {
    if (id) setFloorEnemyId(id)
  }, [id]);
  
  useEffect(() => {
    if (floor?.id && floorEnemyId) {
      fetchOneArenaEnemy(floor?.id, floorEnemyId).then((res) => {
        setData(res.data)
      })
    }
  }, [floorEnemyId]);
  
  const setData = (data: FloorEnemyType) => {
    setValue('floor_id', data.floor_id)
    setValue('enemy_id', data.enemy_id)
    setValue('team_id', data.team_id)
  }
  
  
  return (
    <>
      <div className="block_column align-start card brs_10 maxw_450">
        <form className="block_column align-start w_100p">
          <Controller control={ control } name='floor_id' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Этаж</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                { floorList.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='enemy_id' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Противник</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange } disabled={ !!team_id }>
                <MenuItem value={ 0 } selected>Противники</MenuItem>
                { enemies.map(({ name, id }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
          
          <Controller control={ control } name='team_id' defaultValue={ 0 } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Группа противников</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange } disabled={ !!enemy_id }>
                <MenuItem value={ 0 } selected>Группы</MenuItem>
                { teams.map(({ id, name }) => (
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

export default ArenaFloorForm;