import { FC, useEffect, useState } from "react";
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import { LinkRadialStep, } from '@visx/shape';
import { BranchData, LinkTypesProps, TreeNode } from "@/widgets";
import BranchModal from "@/widgets/Branch/BranchModal";
import { createTechniqueTree } from "@/shared/utils/formatTechniqueBranch";
import { useTechniqueBranchStore } from "@/shared/store/Technique/TechniqueBranchStore";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export const BranchWidget: FC<LinkTypesProps> = ({ margin = defaultMargin }) => {
  const [selectId, setSelectId] = useState<number | undefined>(undefined)
  
  const width = 200
  const height = 200
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;
  
  origin = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  sizeWidth = 2 * Math.PI;
  sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  
  const [data, setData] = useState<TreeNode>(BranchData)
  const { getTechniqueBranchList, techniqueBranchList } = useTechniqueBranchStore()
  
  useEffect(() => {
    getTechniqueBranchList()
  }, []);
  
  useEffect(() => {
    if (techniqueBranchList) {
      let tree = createTechniqueTree(techniqueBranchList, 'Техники');
      setData(tree)
      console.log(JSON.stringify(tree, null, 2));
    }
  }, [techniqueBranchList]);
  
  return (
    <div className='block_column w_100p h_100p branch__wrapper'>
      <TransformWrapper minScale={ 0.5 } maxScale={ 2 } initialPositionX={ 0 } initialPositionY={ 0 }>
        <TransformComponent>
          <svg width={ width } height={ height } style={ { minHeight: height } }>
            <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e"/>
            <rect width={ width } height={ height } rx={ 14 } fill='transparent'/>
            <Group top={ margin.top } left={ margin.left }>
              <Tree
                root={ hierarchy(data, (d) => (d.isExpanded ? null : d.children)) }
                size={ [sizeWidth, sizeHeight] }
                separation={ (a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth }
              >
                { (tree) => (
                  <Group top={ origin.y } left={ origin.x }>
                    { tree.links().map((link, i) => (
                      <LinkRadialStep
                        key={ i }
                        data={ link }
                        percent={ 0.5 }
                        stroke="#DB6F1599"
                        strokeWidth="1"
                        fill="none"
                      />
                    )) }
                    
                    { tree.descendants().map((node, key) => {
                      const width = 20;
                      const height = 20;
                      
                      let top: number;
                      let left: number;
                      const [radialX, radialY] = pointRadial(node.x, node.y);
                      top = radialY;
                      left = radialX;
                      
                      return (
                        <Group top={ top } left={ left } key={ key }>
                          { node.depth === 0 && (
                            <circle
                              r={ 12 }
                              fill="#DB6F1599"
                            />
                          ) }
                          { node.depth !== 0 && (
                            <rect
                              height={ height }
                              width={ width }
                              y={ -height / 2 }
                              x={ -width / 2 }
                              fill="#272b4d"
                              stroke={ node.data.isActivated ? '#03c0dc' : '#26deb0' }
                              strokeWidth={ 1 }
                              strokeDasharray={ node.data.isActivated ? '0' : '2,2' }
                              strokeOpacity={ node.data.isActivated ? 1 : 0.6 }
                              rx={ 10 }
                              onClick={ () => setSelectId(node.data.branch_id) }
                            />
                          ) }
                          <text
                            dy="-20px"
                            fontSize={ 8 }
                            fontFamily="Arial"
                            textAnchor="middle"
                            fill="#fff"
                          >
                            { node.data.name }
                          </text>
                          <text dy=".33em" textAnchor="middle">{ node.data.emoji ? node.data.emoji : '' }</text>
                        </Group>
                      );
                    }) }
                  </Group>
                ) }
              </Tree>
            </Group>
          </svg>
          <BranchModal open={ !!selectId } close={ () => setSelectId(undefined) } id={ selectId! }/>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};