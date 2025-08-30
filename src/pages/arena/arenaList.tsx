import { FC, useEffect, useState } from 'react'
import Table from '@/shared/ui/Table/Table'
import { ArenaColumn } from '@/widgets/Arena'
import {ArenaType, useArenaQuery, useArenaStore} from '@/entities'

type ArenaRow = ArenaType & {
  enemies_count?: number
}

const ArenaList: FC = () => {
  const [itemList, setItemList] = useState<ArenaRow[] | []>([])

  useArenaQuery()

  const arenaList = useArenaStore(state => state.entityList)

  useEffect(() => {
    if (arenaList?.length) {
      const list: ArenaRow[] = []

      arenaList?.forEach(floor => {
        list.push({
          ...floor,
          enemies_count: floor.enemies.length,
        })
      })
      setItemList(list)
    }
  }, [arenaList])

  console.log(arenaList)

  return (
    <div className="main__block block_column p_40 w_100p">
      <h3 className="mb_30">Этажи</h3>
      <Table rows={itemList} columns={ArenaColumn} style={{ isHeader: true }} />

      {/*<div className={ "block_row justify-end w_100p mt_10" }>*/}
      {/*  <Link to={ pathRoutes.arena.create }>*/}
      {/*    <button className='button'>Создать</button>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </div>
  )
}

export default ArenaList
