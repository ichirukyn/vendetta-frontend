import React, { FC, useEffect, useState } from 'react';
import { SpellType } from "@/shared/types/spell";
import Table from "@/shared/ui/Table/Table";
import { SpellColumn } from "@/widgets/Spell/Spell.column";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { MenuItem, Select } from "@mui/material";
import { useSpellFilter } from "@/shared/store/Spell";
import { useSpellStore } from "@/shared/store/SpellStore";
import { ElementDamage } from "@/widgets";

const SpellList: FC = () => {
  const [filterList, setFilterList] = useState<SpellType[] | []>([])
  
  const { spellList } = useSpellStore()
  const { filter, setFilter } = useSpellFilter()
  
  useEffect(() => {
    if (filter.type_damage) {
      setFilterList(spellList.filter((spell) => spell.type_damage === filter.type_damage))
    } else if (filter.name) {
      setFilterList(spellList.filter((spell) => {
        return spell.name.toLowerCase().includes(filter.name?.toLowerCase() || '')
      }))
    } else {
      setFilterList(spellList)
    }
  }, [filter, spellList]);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список заклинаний</h3>
      
      <div className='block_row w_100p'>
        <div className="block_column align-start w_100p">
          <label>Раса</label>
          <input className='w_100p' type='text' placeholder='Поиск по названию..'
                 onChange={ (e) => setFilter({ ...filter, name: e.target.value }) }/>
        </div>
        
        <div className="block_column align-start w_100p">
          <label>Стихия</label>
          <Select className='w_100p' value={ filter.type_damage } onChange={ (e) => setFilter({ ...filter, type_damage: e.target.value }) }>
            <MenuItem value=''>Любая стихия</MenuItem>
            { ElementDamage.map(({ value, label, disabled }) => {
              if (!disabled) return <MenuItem value={ value } key={ value } disabled={ disabled }>{ label }</MenuItem>
            }) }
          </Select>
        </div>
      </div>
      
      <Table rows={ filterList } columns={ SpellColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.spell.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default SpellList;