import {useArenaStore} from "@/shared/store/ArenaStore";
import {createArena, fetchAllArena, fetchOneArena} from "@/shared/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/shared/constants";
import {ArenaType} from "@/shared/types";
import {queryFn} from "@/shared/util";


export const useArenaQuery = () => {
  const setFloor = useArenaStore((state) => state.setFloor)
  const setFloorList = useArenaStore((state) => state.setFloorList)

  const queryClient = useQueryClient()

  // Получаем список арен
  const floor = useQuery({
    queryKey: [queryKeys.arena],
    queryFn: (id) => queryFn<ArenaType>(() => fetchOneArena(id), setFloor)
  })

  // Получаем арену
  const floorList = useQuery({
    queryKey: [queryKeys.arena],
    queryFn: () => queryFn<ArenaType[]>(fetchAllArena, setFloorList)
  })

  // Создания арены
  const create = useMutation({
    mutationFn: createArena,
    mutationKey: [queryKeys.arena],
    onSuccess: () => queryClient.invalidateQueries({queryKey: [queryKeys.arena]})
  })

  // Выбираем арену
  const selectFloor = (arena: ArenaType) => {
    setFloor(arena)
  }

  return {
    floorList,
    selectFloor,
    create,
  }
}

