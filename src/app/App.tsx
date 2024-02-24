import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/app/router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRaceStore } from '@/shared/store/RaceStore';
import { useClassStore } from '@/shared/store/ClassStore';
import { useTechniqueStore } from '@/shared/store/TechniqueStore';
import { useArenaStore } from '@/shared/store/ArenaStore';
import { useEnemyStore } from '@/shared/store/EnemyStore';

const App: FC = () => {
  const { getRaceList } = useRaceStore()
  const { getClassList } = useClassStore()
  const { getTechniqueList } = useTechniqueStore()
  const { getArenaList } = useArenaStore()
  const { getEnemyList } = useEnemyStore()
  
  useEffect(() => {
    getRaceList()
    getClassList()
    getTechniqueList()
    getArenaList()
    getEnemyList()
  }, []);
  
  return (
    <BrowserRouter>
      <ToastContainer draggable={ false }/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;