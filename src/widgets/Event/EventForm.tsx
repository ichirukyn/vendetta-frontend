import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventConstants, EventCreateScheme } from "@/widgets";
import { EventTriggerType, EventType } from "@/shared/types";
import { InferType } from "yup";
import { createEvent, fetchOneEvent, updateEvent } from "@/shared/api/event";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import EventTriggerForm from "@/widgets/Event/EventTriggerForm";
import { createEventTrigger, deleteEventTrigger, fetchAllEventTrigger, updateEventTrigger } from "@/shared/api/item";
import { useNavigate } from "react-router-dom";

export interface IEventFormProps {
  id?: number
}

const EventForm: FC<IEventFormProps> = ({ id }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(EventCreateScheme) })
  const navigate = useNavigate();
  
  const [accordion, setAccordion] = useState<null | number>(null)
  const [triggerList, setTriggerList] = useState<EventTriggerType[]>([])
  
  const onSubmit = async (data: InferType<typeof EventCreateScheme>) => {
    if (!id) {
      const event = await createEvent(data as EventType)
      if (event.data) toast('Создание успешно', { type: 'success' })
      
      let error = false
      
      triggerList.map(async (trigger) => {
        if (!event.data.id) {
          error = true
          return toast('Ошибка trigger_id', { type: "error" })
        }
        
        await createEventTrigger(trigger as EventTriggerType, event.data.id)
      })
      
      if (event.data) toast('Триггеры созданы успешно', { type: 'success' })
      if (!error) setTriggerList([])
    } else {
      const event = await updateEvent(data as EventType, id)
      if (event.data) toast('Обновление успешно', { type: 'success' })
      
      let i = -1
      for (let trigger of triggerList) {
        i++
        
        if (!trigger?.id) {
          createEventTrigger(trigger as EventTriggerType, id).then((res) => {
            triggerList[i] = res.data
            setTriggerList(triggerList)
          })
          
          continue
        }
        
        updateEventTrigger(trigger as EventTriggerType, trigger.id!, id).then((res) => {
          triggerList[i] = res.data
          setTriggerList(triggerList)
        })
      }
    }
  }
  
  useEffect(() => {
    if (!id) return
    
    fetchOneEvent(id).then(({ data }) => {
      setData(data)
    })
    fetchAllEventTrigger(id).then((res) => {
      if (res.data) setTriggerList(res.data)
    })
  }, [id]);
  
  const setData = (data: EventType) => {
    setValue('name', data.name)
    setValue('desc', data.desc)
    setValue('text', data.text)
    setValue('keyboard', data.keyboard)
    setValue('state', data.state)
  }
  
  const addTrigger = () => {
    if (triggerList.length > 9) return toast('Максимум 10 триггеров', { type: 'warning' })
    const name = `${ triggerList.length.toString() }`
    let trigger = [...triggerList, { name: name }]
    setTriggerList(trigger)
  }
  
  const updateTrigger = (data: EventTriggerType, index: number) => {
    triggerList[index] = data;
    setTriggerList([...triggerList]);
  }
  
  const deleteTrigger = (index: number) => {
    if (id && triggerList[index].id) {
      deleteEventTrigger(triggerList[index].id!, id).then(() => {
        toast('Триггер удалён успешно', { type: "success" })
      })
    }
    
    triggerList.splice(index, 1)
    setTriggerList([...triggerList])
    setAccordion(null)
  }
  
  
  return (
    <div className="block_column align-start card brs_10 maxw_450">
      <form className="block_column align-start w_100p">
        <Controller control={ control } name='name' render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Название</label>
            <input type="text" className='w_100p' value={ field.value } onChange={ field.onChange } placeholder='Доставка почты'/>
            <label className='text_error_200'>{ errors.name?.message }</label>
          </div>
        ) }/>
        
        <Controller control={ control } name='desc' render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Описание</label>
            <textarea value={ field.value } onChange={ field.onChange } className='w_100p'></textarea>
            <label className='text_error_200'>{ errors.desc?.message }</label>
          </div>
        ) }/>
        
        <Controller control={ control } name='text' render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Текст (Диалог, Пролог и прочее)</label>
            <textarea value={ field.value } onChange={ field.onChange } className='w_100p'></textarea>
            <label className='text_error_200'>{ errors.text?.message }</label>
          </div>
        ) }/>
        
        <Controller control={ control } name='type' defaultValue={ EventConstants.type[0].value } render={ ({ field }) => (
          <div className="block_column align-start w_100p">
            <label>Тип события</label>
            <Select className='w_100p' value={ field.value } onChange={ field.onChange }>
              { EventConstants.type.map(({ value, label }) => (
                <MenuItem value={ value } key={ value }>{ label }</MenuItem>
              )) }
            </Select>
          </div>
        ) }/>
      </form>
      
      <button className='button button_outline_active w_100p' onClick={ addTrigger }>Добавить триггер</button>
      
      { triggerList.map((value, index) => (
        <Accordion key={ index } expanded={ accordion === index } onChange={ () => setAccordion(accordion === index ? null : index) }
                   className='w_100p'>
          <AccordionSummary aria-controls={ `${ index }-content` } id={ `${ index }-header` } className='b_1 bc_gray_100'>
            <div className="block_row align-center justify-between w_100p">
              <p className='text_body'>Триггер: { value?.name }</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <EventTriggerForm defaultData={ triggerList[0] } updateData={ updateTrigger } deleteData={ deleteTrigger } index={ index }/>
          </AccordionDetails>
        </Accordion>
      )) }
      
      
      <div className="block_row justify-between w_100p">
        <button className='button button_outline_active w_100p mt_10' onClick={ () => navigate(-1) }>Назад</button>
        <button className='button w_100p mt_10' onClick={ handleSubmit(onSubmit) }>Отправить</button>
      </div>
    </div>
  );
};

export default EventForm;