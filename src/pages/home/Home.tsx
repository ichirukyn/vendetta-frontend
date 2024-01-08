import { FC, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, MenuItem, Select } from "@mui/material";
import { boolean, InferType, number, object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EffectCreate, { EffectCreateScheme, EffectEmpty } from "@/widgets/Effect/EffectCreate";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { createTechnique, createTechniqueEffect } from "@/shared/api/technique";
import { EffectType, TechniqueType } from "@/shared/types/technique";


const TechniqueCreateScheme = object().shape({
  name: string().required('Введите название'),
  desc: string().required('Введите описание'),
  desc_short: string().required('Введите описание или скопируйте из строки выше'),
  damage: number().optional(),
  modify: string(),
  distance: string(),
  race_id: number().nullable(),
  class_id: number().nullable(),
  type: string(),
  cooldown: number().optional(),
  is_stack: boolean().optional()
})

const Home: FC = () => {
  
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(TechniqueCreateScheme) })
  
  const [accordion, setAccordion] = useState<null | number>(null)
  const [effectList, setEffectList] = useState<InferType<typeof EffectCreateScheme>[] | [] | EffectEmpty[]>([])
  
  const race_id = watch('race_id')
  
  const onSubmit = async (data: InferType<typeof TechniqueCreateScheme>) => {
    if (!data.damage || data?.damage < 0) data.damage = 1
    if (!data.cooldown || data?.damage < 0) data.cooldown = 0
    
    if (data.damage > 5) data.damage = 5
    if (data.cooldown > 5) data.cooldown = 5
    
    // Последовательность действий:
    // 1. Сделать проверки для всего
    // 2. Сложить в объект для запроса
    // 3. Собрать эффекты в массив объектов
    // 4. Создать технику, получить id
    // 5. Создать эффекты с id техники из п. выше
    
    const technique = await createTechnique(data as TechniqueType)
    console.log(technique)
    
    if (!technique.data) return toast('Ошибка', { type: 'error' })
    
    if (effectList.length) {
      effectList.map(async (effect) => {
        if (!technique.data.id) return toast('Ошибка technique_id', { type: "error" })
        
        await createTechniqueEffect(effect as EffectType, technique.data.id)
      })
    }
    
    toast('Техника создана!', { type: "success" })
    
    console.log(data)
  }
  
  const onUpdateEffect = (data: InferType<typeof EffectCreateScheme>, index: number) => {
    const updatedEffectList = [...effectList];
    updatedEffectList[index] = data;
    setEffectList(updatedEffectList);
  }
  
  const effectAdd = () => {
    if (effectList.length > 4) return toast('Максимум 5 эффектов')
    let effects = [...effectList, { name: effectList.length.toString() }]
    setEffectList(effects)
  }
  
  const effectDelete = (index: number) => {
    effectList.splice(index, 1)
    setEffectList(effectList)
  }
  
  return (
    <div className='block_column p_40 w_100p'>
      <h3 className='mb_30'>Конструктор техник</h3>
      
      <div className="block_row gap_20 w_100p technique__wrap">
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
                <label>Описание (Подробное)</label>
                <input
                  type="text"
                  className='w_100p'
                  value={ field.value } onChange={ field.onChange }
                  placeholder='Очень длинное описание, с числами, Жертвенного удара'
                />
                <label className='text_error_200'>{ errors.desc?.message }</label>
              </div>
            ) }/>
            
            <Controller control={ control } name='desc_short' render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Описание (Короткое)</label>
                <input
                  type="text"
                  className='w_100p'
                  value={ field.value } onChange={ field.onChange }
                  placeholder='Очень длинное описание Жертвенного удара'
                />
                <label className='text_error_200'>{ errors.desc_short?.message }</label>
              </div>
            ) }/>
            
            <Controller control={ control } name='damage' render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Урон</label>
                <input type="number" step="0.01" className='w_100p' value={ field.value } onChange={ field.onChange }
                       placeholder='1 - это 100%'/>
              </div>
            ) }/>
            
            <Controller control={ control } name='modify' defaultValue={ 'fire_damage' } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Модификатор стихии</label>
                <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                  <MenuItem value='fire_damage'>Огонь</MenuItem>
                  <MenuItem value='water_damage'>Вода</MenuItem>
                  <MenuItem value='earth_damage'>Земля</MenuItem>
                  <MenuItem value='air_damage'>Воздух</MenuItem>
                  <MenuItem value='light_damage'>Свет</MenuItem>
                  <MenuItem value='dark_damage'>Тьма</MenuItem>
                  <MenuItem value='phys_damage'>Физ.</MenuItem>
                </Select>
              </div>
            ) }/>
            
            <Controller control={ control } name='distance' defaultValue={ 'melee' } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Дистанция</label>
                <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                  <MenuItem value='melee'>Ближнияя</MenuItem>
                  <MenuItem value='distant'>Дальняя</MenuItem>
                </Select>
              </div>
            ) }/>
            
            <Controller control={ control } name='race_id' defaultValue={ 0 } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Привязка к расе</label>
                <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                  <MenuItem value={ 0 } disabled>Выбрать расу</MenuItem>
                  <MenuItem value={ 1 }>Люди</MenuItem>
                  <MenuItem value={ 2 }>Эльфы</MenuItem>
                  <MenuItem value={ 3 }>Дворфы</MenuItem>
                </Select>
              </div>
            ) }/>
            
            <Controller control={ control } name='class_id' defaultValue={ 0 } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Привязка к классу</label>
                <Select className='w_100p' value={ field.value } onChange={ field.onChange } disabled={ !race_id }>
                  <MenuItem value={ 0 } disabled>Выбрать класс</MenuItem>
                  <MenuItem value={ 1 }>Воин</MenuItem>
                  <MenuItem value={ 2 }>Маг</MenuItem>
                  <MenuItem value={ 3 }>Лучник</MenuItem>
                </Select>
              </div>
            ) }/>
            
            <Controller control={ control } name='type' defaultValue={ 'attack' } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>Тип техники</label>
                <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
                  <MenuItem value='attack'>Атака</MenuItem>
                  <MenuItem value='support'>Поддержка</MenuItem>
                </Select>
              </div>
            ) }/>
            
            <Controller control={ control } name='cooldown' render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label>КД</label>
                <input type="number" className='w_100p' placeholder='0' value={ field.value } onChange={ field.onChange }/>
              </div>
            ) }/>
            
            <Controller control={ control } name='is_stack' defaultValue={ false } render={ ({ field }) => (
              <div className="block_column align-start w_100p">
                <label className='image_centerY gap_0 cursor_pointer'>
                  <Checkbox value={ field.value } onChange={ field.onChange }/>
                  Может ли стакатся?
                </label>
              </div>
            ) }/>
          </form>
          
          <button className='button button_outline_active w_100p' onClick={ effectAdd }>Добавить эффект</button>
          
          { effectList.map((value, index) => (
            <Accordion key={ index } expanded={ accordion === index } onChange={ () => setAccordion(accordion === index ? null : index) }
                       className='w_100p'>
              <AccordionSummary aria-controls={ `${ index }-content` } id={ `${ index }-header` } className='b_1 bc_gray_100'>
                <div className="block_row align-center justify-between w_100p">
                  <p className='text_body'>Эффект: { value?.name }</p>
                  <IconButton onClick={ () => effectDelete(index) }><Delete/></IconButton>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <EffectCreate update_data={ onUpdateEffect } index={ index }/>
              </AccordionDetails>
            </Accordion>
          )) }
          
          
          <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Создать</button>
        </div>
        
        <div className="block_column align-start card brs_10 maxw_450">
          <h6>Подсказки:</h6>
          <p>
            <b>Урон</b> - Считается в процентах.
          </p>
          <p>
            <b>Модификатор стихии</b> - добавляет зависимость от стихии к технике. То есть, если у игрока прокачана эта стихия, то урон
            будет умножатся на это значение.
          </p>
          <p>
            <b>Привязка</b> - Если не выбран класс/раса, то техника доступна всем
          </p>
          <p>
            <b>КД</b> - время восстановления техники. Если 0, то технику можно использовать каждый ход.
          </p>
          <p>
            <b>Стаки</b> - Если Включено, то эффекты техники будут складыватся между собой на цели.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;