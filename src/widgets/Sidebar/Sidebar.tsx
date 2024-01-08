import { FC, useState } from 'react';
import { Drawer } from "@mui/material";
import { SidebarConfig } from "@/widgets/Sidebar/Sidebar.config";
import { Link, useLocation } from "react-router-dom";

export interface ISidebarProps {

}

const Sidebar: FC<ISidebarProps> = ({}) => {
  const [open, setOpen] = useState(true)
  const location = useLocation()
  
  const isActive = (href: string) => {
    if (href === location.pathname) return true
  }
  
  return (
    <>
      <Drawer anchor="left" variant="permanent" open={ open } onClose={ () => setOpen(false) }
              sx={ { background: "#121123", pt: "100px" } }>
        <div className="block_column w_100p pt_100 minw_300">
          { SidebarConfig.map(({ title, href }) => (
            isActive(href)
              ? (
                <Link
                  key={ title }
                  to={ href }
                  className={ `w_100p image_centerY pl_50 p_10Y mb_20 bg_primary_500` }
                >
                  {/*{ icon }*/ }
                  <p className='text_body text_med text_gray_700'>{ title }</p>
                </Link>
              )
              : (
                <Link
                  key={ title }
                  to={ href }
                  className={ `w_100p image_centerY pl_50 p_10Y mb_20 bg_primary_500-h` }
                >
                  {/*{ icon }*/ }
                  <p className='text_body text_reg text_gray_300'>{ title }</p>
                </Link>
              )
          )) }
        </div>
      </Drawer>
    
    </>
  );
};

export default Sidebar;