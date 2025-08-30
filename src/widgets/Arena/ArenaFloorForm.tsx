import { FC, useEffect, useState } from 'react'
import { EnemyType, TeamType } from '@/shared/types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import { MenuItem, Select } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ArenaFloorCreateScheme } from '@/widgets/Arena/Arena.schemas'
import { fetchAllEnemy } from '@/shared/api/enemy'
import { fetchAllTeam } from '@/shared/api/team'
import { ArenaEnemyCreateType, ArenaEnemyType, useArenaEnemyQuery, useArenaStore } from '@/entities'
import { RequestDataType } from '@/shared/utils'

export interface ITechniqueFormProps {
  id?: number
}

export const ArenaFloorForm: FC<ITechniqueFormProps> = ({ id }) => {
  const { control, watch, handleSubmit } = useForm({ resolver: yupResolver(ArenaFloorCreateScheme) })
  const navigate = useNavigate()

  const [enemies, setEnemies] = useState<EnemyType[]>([])
  const [teams, setTeams] = useState<TeamType[]>([])
  const [floorEnemyId, setFloorEnemyId] = useState<number | undefined>(id)

  // const arena = useArenaStore(state => state.entity)
  const arenaList = useArenaStore(state => state.entityList)

  const { ArenaEnemyCreateQuery, ArenaEnemyUpdateQuery } = useArenaEnemyQuery(floorEnemyId)

  const enemy_id = watch('enemy_id')
  const team_id = watch('team_id')

  const onSubmit = async (data: InferType<typeof ArenaFloorCreateScheme>) => {
    if (!data.team_id && !data.enemy_id) return toast('Нужно выбрать противника или команду', { type: 'error' })
    if (!data.floor_id) return toast('Нужно выбрать этаж', { type: 'error' })

    const body: RequestDataType<ArenaEnemyCreateType> = {
      second_id: data.floor_id,
      data: data as ArenaEnemyType,
    }
    if (!floorEnemyId) {
      ArenaEnemyCreateQuery.mutate(body, {
        onSuccess: data => {
          if (!data) return
          toast('Создание успешно', { type: 'success' })
          // setFloorEnemyId(res.data.id)
          // getArenaList()
        },
      })
    } else {
      ArenaEnemyUpdateQuery.mutate(body, {
        onSuccess: data => {
          if (!data) return
          toast('Обновление успешно', { type: 'success' })
          // setFloorEnemyId(res.data.id)
          // getArenaList()
        },
      })
    }

    useEffect(() => {
      fetchAllEnemy().then(res => {
        if (res.data) setEnemies(res.data)
      })
      fetchAllTeam(true).then(res => {
        if (res.data) setTeams(res.data)
      })
    }, [])

    useEffect(() => {
      if (id) setFloorEnemyId(id)
    }, [id])

    // const setData = (data: ArenaEnemyType) => {
    //   setValue('floor_id', data.floor_id)
    //   setValue('enemy_id', data.enemy_id)
    //   setValue('team_id', data.team_id)
    // }

    return (
      <>
        <div className="block_column align-start card brs_10 maxw_450">
          <form className="block_column align-start w_100p">
            <Controller
              control={control}
              name="floor_id"
              render={({ field }) => (
                <div className="block_column align-start w_100p">
                  <label>Этаж</label>
                  <Select className="w_100p" value={field.value} onChange={field.onChange}>
                    {arenaList?.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            />

            <Controller
              control={control}
              name="enemy_id"
              render={({ field }) => (
                <div className="block_column align-start w_100p">
                  <label>Противник</label>
                  <Select className="w_100p" value={field.value} onChange={field.onChange} disabled={!!team_id}>
                    <MenuItem value={0} selected>
                      Противники
                    </MenuItem>
                    {enemies.map(({ name, id }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            />

            <Controller
              control={control}
              name="team_id"
              defaultValue={0}
              render={({ field }) => (
                <div className="block_column align-start w_100p">
                  <label>Группа противников</label>
                  <Select className="w_100p" value={field.value} onChange={field.onChange} disabled={!!enemy_id}>
                    <MenuItem value={0} selected>
                      Группы
                    </MenuItem>
                    {teams.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            />
          </form>

          <div className="block_row justify-between w_100p">
            <button className="button button_outline_active w_100p mt_10" onClick={() => navigate(-1)}>
              Назад
            </button>
            <button className="button w_100p mt_10" onClick={handleSubmit(onSubmit)}>
              Отправить
            </button>
          </div>
        </div>
      </>
    )
  }
}
