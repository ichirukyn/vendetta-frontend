import { FC } from 'react';
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { BranchWidget } from "@/widgets";

const BranchList: FC = () => {
  return (
    <div className='main__block block_column w_100p'>
      <div className="h_100p block_column">
        <BranchWidget height={ 1100 } width={ 1500 }/>
      </div>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.branch.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
 );
};

export default BranchList;