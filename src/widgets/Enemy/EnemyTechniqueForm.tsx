import React, { FC, useEffect, useState } from 'react';
import { Chip, MenuItem, OutlinedInput, Select } from "@mui/material";
import { EnemyTechniqueType, TechniqueType } from "@/shared/types";
import { fetchAllTechnique } from "@/shared/api/technique";

export interface IEnemyTechniqueFormProps {
  techniqueList: EnemyTechniqueType[]
  updateTechniqueId: (technique: number[]) => void
}

const EnemyTechniqueForm: FC<IEnemyTechniqueFormProps> = ({ techniqueList, updateTechniqueId }) => {
  const [list, setList] = useState<TechniqueType[]>([])
  const [listId, setListId] = useState<number[]>([])
  
  const save = () => {
    updateTechniqueId(listId)
  }
  
  useEffect(() => {
    fetchAllTechnique().then((res) => {
      if (res.data) {
        setList(res.data)
      }
    })
  }, []);
  
  useEffect(() => {
    if (techniqueList) {
      let numberList = techniqueList.map(({ technique_id }) => technique_id)
      setListId([...numberList])
    }
  }, [techniqueList]);
  
  return (
    <div className='w_100p'>
      <label>Техники (Можно выьрать несколько)</label>
      <div className="block_row align-start justify-between gap_15 w_100p mt_10">
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          
          className='w_100p'
          value={ listId }
          onChange={ (val) => setListId(val.target.value as number[]) }
          
          input={ <OutlinedInput id="select-multiple-chip" placeholder='Техники'/> }
          renderValue={ (selected) => (
            <div className='maxw_100p block_row block_wrap justify-start gap_5'>
              { selected.length && selected.map((value) => (
                <Chip className='p_5 brs_5 bg_gray_200' key={ value } label={ list.find(({ id }) => value === id)?.name }/>
              )) }
            </div>
          ) }
        >
          { list.map(({ id, name }) => (
            <MenuItem value={ id } key={ id }>{ name }</MenuItem>
          )) }
        </Select>
        
        <button className="button p_15X" onClick={ () => save() }>Выбрать</button>
      </div>
    </div>
  );
};

export default EnemyTechniqueForm;