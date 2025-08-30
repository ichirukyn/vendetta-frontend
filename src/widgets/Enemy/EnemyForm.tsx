import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EnemySchemas } from '@/widgets';
import { ClassType, EnemyLootType, EnemyStatsType, EnemyTechniqueType, EnemyType, EnemyWeaponType, RaceType } from '@/shared/types';
import { InferType } from 'yup';
import { fetchAllClassByRace, fetchAllRace } from '@/shared/api/race';
import { fetchAllClass } from '@/shared/api/class';
import {
  createEnemy,
  createEnemyItem,
  createEnemyStats,
  createEnemyTechnique,
  createEnemyWeapon,
  deleteEnemyItem,
  deleteEnemyTechnique,
  fetchAllEnemyItem,
  fetchAllEnemyTechnique,
  fetchEnemyStats,
  fetchEnemyWeapon,
  fetchOneEnemy,
  updateEnemy,
  updateEnemyItem,
  updateEnemyStats,
  updateEnemyWeapon,
} from '@/shared/api/enemy';
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Select } from '@mui/material';
import { Constants } from '../../shared/constant';
import EnemyStatsForm from '@/widgets/Enemy/EnemyStatsForm';
import EnemyWeaponForm from '@/widgets/Enemy/EnemyWeaponForm';
import EnemyTechniqueForm from '@/widgets/Enemy/EnemyTechniqueForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { pathRoutes } from '@/app';
import { useEnemyStore } from "@/shared/store/EnemyStore";
import EnemyLootForm from "@/widgets/Enemy/EnemyLootForm";

interface IEnemyFormProps {
  id?: number
}

const EnemyForm: FC<IEnemyFormProps> = ({ id }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(EnemySchemas) })
  const navigate = useNavigate();
  const { getEnemyList } = useEnemyStore()

  const [accordionStats, setAccordionStats] = useState(false)
  const [accordion, setAccordion] = useState<null | number>(null)
  const [lootList, setLootList] = useState<EnemyLootType[] | []>([])

  const [raceList, setRaceList] = useState<RaceType[]>([])
  const [classList, setClassList] = useState<ClassType[]>([])

  const [stats, setStats] = useState<EnemyStatsType | undefined>()
  const [weapon, setWeapon] = useState<EnemyWeaponType | undefined>()
  const [techniqueList, setTechniqueList] = useState<EnemyTechniqueType[]>([])

  const race_id = watch('race_id')

  const onSubmit = async (data: InferType<typeof EnemySchemas>) => {
    if (!stats) return toast('Сохраните характеристики', { type: 'warning' })
    if (!weapon?.weapon_id) return toast('Выберите оружие', { type: 'warning' })
    if (!techniqueList.length) return toast('Выберите минимум 1 технику', { type: 'warning' })

    // CREATE
    if (!id) {
      const enemy = await createEnemy(data as EnemyType)
      if (!enemy.data.id) return toast('Ошибка, повтрорите позже', { type: 'error' })


      let newList: EnemyTechniqueType[] = []
      techniqueList.forEach((technique) => {
        createEnemyTechnique({ technique_id: technique.technique_id } as EnemyTechniqueType, enemy.data.id).then(({ data }) => {
          if (data) newList.push(data)
        })
      })

      await createEnemyStats(stats, enemy.data.id)
      await createEnemyWeapon({ weapon_id: weapon.weapon_id } as EnemyWeaponType, enemy.data.id!)

      if (newList.length) setTechniqueList(newList)
      toast('Противник создан', { type: 'success' })
      await getEnemyList()

      let error = false

      if (lootList.length) {
        lootList.map(async (loot) => {
          if (!enemy.data.id) {
            error = true
            return toast('Ошибка technique_id', { type: "error" })
          }
          await createEnemyItem(loot as EnemyLootType, enemy.data.id)
        })
      }

      return navigate(`${ pathRoutes.enemy.edit }/${ enemy.data.id }`)

    }
    // UPDATE
    else {
      await updateEnemy(data as EnemyType, id)

      await updateEnemyStats(stats, id)
      await updateEnemyWeapon({ weapon_id: weapon.weapon_id } as EnemyWeaponType, id)


      const res = await fetchAllEnemyTechnique(id)
      if (!res.data) return

      // Находим идентификаторы, которые есть в начальном массиве, но нет в новом
      res.data.forEach(({ technique_id }) => {
        if (!techniqueList.find((technique) => technique.technique_id === technique_id)) {
          deleteEnemyTechnique(id!, technique_id);
        }
      });

      // Находим идентификаторы, которые есть в новом массиве, но нет в начальном
      techniqueList.forEach(({ technique_id }) => {
        if (!res.data.find((technique) => technique.technique_id === technique_id)) {
          createEnemyTechnique({ technique_id: technique_id }, id!);
        }
      });

      if (lootList.length < 1) return

      const items = await fetchAllEnemyItem(id)
      if (!items.data) return

      // Находим идентификаторы, которые есть в начальном массиве, но нет в новом
      items.data.forEach((item) => {
        if (!lootList.find((loot) => loot.id === item.id)) deleteEnemyItem(id, item.item_id!);
        else {
          const new_data = { ...lootList.find((loot) => loot.id === item.id) }
          delete new_data?.item

          updateEnemyItem(new_data!, id, item.id!);
        }
      });

      // Находим идентификаторы, которые есть в новом массиве, но нет в начальном
      lootList.forEach((item) => {
        if (!items.data.find((loot) => loot.id === item.id)) createEnemyItem(item, id!)
      });

      await getEnemyList()
      toast('Противник обновлен', { type: 'success' })
    }
  }

  useEffect(() => {
    fetchAllRace().then((res) => setRaceList(res.data))
    fetchAllClass().then((res) => setClassList(res.data))
  }, []);

  useEffect(() => {
    if (!race_id) return

    fetchAllClassByRace(race_id!).then((res) => {
      // TODO: Временно?
      // setClassList(res?.data)
      // setValue('class_id', res.data[0].id)
    })
  }, [race_id]);

  useEffect(() => {
    if (!id) return

    fetchOneEnemy(id).then(({ data }) => {
      setData(data)
    })
    fetchEnemyStats(id).then(({ data }) => {
      setStats(data)
    })
    fetchEnemyWeapon(id).then(({ data }) => {
      setWeapon(data)
    })
    fetchAllEnemyTechnique(id).then(({ data }) => {
      setTechniqueList(data)
    })
    fetchAllEnemyItem(id).then(({ data }) => {
      setLootList(data)
    })
  }, [id]);

  const setData = (data: EnemyType) => {
    setValue('name', data.name)
    setValue('rank', data.rank)
    setValue('class_id', data.class_id)
    setValue('race_id', data.race_id)
  }

  const lootUpdate = (data: EnemyLootType, index: number) => {
    lootList[index] = data;
    setLootList([...lootList]);
  }

  const lootAdd = () => {
    if (lootList.length >= 10) return toast('Максимум 10 предметов', { type: 'warning' })
    let items = [...lootList, { count: 0 }]
    setLootList(items)
  }

  const lootDelete = (index: number) => {
    if (id && lootList[index].item_id) {
      deleteEnemyItem(id, lootList[index].item_id!).then(() => {
        toast('Предмет удалён успешно!', { type: "success" })
      })
    }

    lootList.splice(index, 1)
    setLootList([...lootList])
    setAccordion(null)
  }


  return (
    <>
      <div className="block_column align-start card brs_10 maxw_450">
        <form className="block_column align-start w_100p">
          <Controller control={ control } name='name' render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Имя</label>
              <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange } placeholder='Скелет'/>
              <label className='text_error_200'>{ errors.name?.message }</label>
            </div>
          ) }/>

          <Controller control={ control } name='rank' defaultValue={ Constants.rank[0].value } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Ранг</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                { Constants.rank.map(({ value, label }) => (
                  <MenuItem value={ value } key={ value }>{ label }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>


          <Controller control={ control } name='race_id' defaultValue={ 1 } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Раса</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 } disabled>Любая раса</MenuItem>
                { raceList?.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>

          <Controller control={ control } name='class_id' defaultValue={ 1 } render={ ({ field }) => (
            <div className="block_column align-start w_100p">
              <label>Класс</label>
              <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                <MenuItem value={ 0 } disabled>Любой класс</MenuItem>
                { classList.map(({ id, name }) => (
                  <MenuItem value={ id } key={ id }>{ name }</MenuItem>
                )) }
              </Select>
            </div>
          ) }/>
        </form>

        <div className="w_100p pb_10">
          <EnemyWeaponForm weapon={ weapon } updateWeapon={ (weapon) => setWeapon(weapon) }/>
        </div>

        <div className="w_100p pb_10">
          <EnemyTechniqueForm techniqueList={ techniqueList }
                              updateTechniqueId={ (listId) => setTechniqueList(listId?.map((id) => ({ technique_id: id }))) }/>
        </div>

        <Accordion expanded={ accordionStats } onChange={ () => setAccordionStats(!accordionStats) }
                   className='w_100p'>
          <AccordionSummary className='b_1 bc_gray_100'>
            <div onSubmit={ handleSubmit(onSubmit) } className="block_row align-center justify-between w_100p">
              <p className='text_body'>Характеристики</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <EnemyStatsForm stats={ stats } updateStats={ (stats) => setStats(stats) }/>
          </AccordionDetails>
        </Accordion>

        <button className='button button_outline_active w_100p' onClick={ lootAdd }>Добавить предмет (лут)</button>

        { lootList.map((value, index) => (
          <Accordion key={ index } expanded={ accordion === index } onChange={ () => setAccordion(accordion === index ? null : index) }
                     className='w_100p'>
            <AccordionSummary aria-controls={ `${ index }-content` } id={ `${ index }-header` } className='b_1 bc_gray_100'>
              <div className="block_row align-center justify-between w_100p">
                <p className='text_body'>Предмет: { value?.item?.name || '' }</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <EnemyLootForm
                update_data={ lootUpdate }
                index={ index }
                defaultData={ lootList[index] }
                effectDelete={ lootDelete }
              />
            </AccordionDetails>
          </Accordion>
        )) }


        <div className="block_row justify-between w_100p">
          <button className='button button_outline_active w_100p mt_10' onClick={ () => navigate(pathRoutes.enemy.base) }>Назад</button>
          <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Отправить</button>
        </div>
      </div>
    </>
  );
};

export default EnemyForm;
