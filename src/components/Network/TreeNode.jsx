// /*eslint-disable */

// import React, {useState, useEffect} from 'react';
// import Tree from 'react-d3-tree';
// import MixedNodeInputElement from './MixedNodeInputElement';
// import MixedNodeElement from './MixedNodeElement';
// import PureSvgNodeElement from './PureSvgNodeElement';

// const TreeNode = ({network}) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const transformedData = transformNode(network);
//     setData(transformedData);
//   }, [network]);

//   const windowWidth = window.innerWidth;
//   const smallScreen = windowWidth <= 768;

//   const transformNode = (node) => {
//     if (!node || !node.data) return null;

//     const {
//       side = '',
//       id = '',
//       first_name = '',
//       directSponsorId = '',
//       isGolden = false,
//       isActive = false,
//     } = node.data;

//     let children = [];

//     // if (node.children && node.children.length > 0) {
//     //   const leftChild = node.children.find(
//     //     (child) => child.data.side === 'LEFT',
//     //   );
//     //   const rightChild = node.children.find(
//     //     (child) => child.data.side === 'RIGHT',
//     //   );

//     //   if (leftChild) {
//     //     children.push(transformNode(leftChild));
//     //   } else {
//     //     children.push({
//     //       name: ' ',
//     //       attributes: {},
//     //       _invisible: true, // Custom flag if you want to skip rendering content
//     //       children: [],
//     //     });
//     //   }

//     //   if (rightChild) {
//     //     children.push(transformNode(rightChild));
//     //   } else {
//     //     children.push({
//     //       name: ' ',
//     //       attributes: {},
//     //       _invisible: true,
//     //       children: [],
//     //     });
//     //   }
//     // }

//     const leftChild = node.children?.find(
//       (child) => child.data.side === 'LEFT',
//     );
//     const rightChild = node.children?.find(
//       (child) => child.data.side === 'RIGHT',
//     );

//     children.push(
//       leftChild
//         ? transformNode(leftChild)
//         : {
//             name: ' ',
//             attributes: {},
//             _invisible: true,
//             __side: 'LEFT',
//             __parentId: id,
//             children: [],
//           },
//     );

//     children.push(
//       rightChild
//         ? transformNode(rightChild)
//         : {
//             name: ' ',
//             attributes: {},
//             _invisible: true,
//             __side: 'RIGHT',
//             __parentId: id,
//             children: [],
//           },
//     );

//     return {
//       name: first_name,
//       attributes: {
//         ID: id,
//         FirstName: first_name,
//         DirectSponsorId: directSponsorId,
//         Side: side,
//         IsGolden: isGolden,
//         IsActive: isActive,
//       },
//       ...(children.length > 0 ? {children} : {}),
//     };
//   };

//   const countNodes = (node) => {
//     if (!node?.children || node?.children?.length === 0) {
//       return 0;
//     }

//     let count = node?.children?.length;

//     node.children.forEach((child) => {
//       count += countNodes(child);
//     });

//     return count;
//   };

//   const customNodeFnMapping = {
//     svg: {
//       description: 'Default - Pure SVG node & label (IE11 compatible)',
//       fn: (rd3tProps, appState) => (
//         <PureSvgNodeElement
//           nodeDatum={rd3tProps.nodeDatum}
//           toggleNode={rd3tProps.toggleNode}
//           orientation={appState.orientation}
//         />
//       ),
//     },
//     mixed: {
//       description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
//       fn: ({nodeDatum, toggleNode}, appState) => (
//         <MixedNodeElement
//           nodeData={nodeDatum}
//           triggerNodeToggle={toggleNode}
//           foreignObjectProps={{
//             width: appState.nodeSize.x,
//             height: appState.nodeSize.y,
//             x: -50,
//             y: 50,
//           }}
//         />
//       ),
//     },
//     input: {
//       description: 'MixedNodeElement - Interactive nodes with inputs',
//       fn: ({nodeDatum, toggleNode}, appState) => (
//         <MixedNodeInputElement
//           nodeData={nodeDatum}
//           triggerNodeToggle={toggleNode}
//           foreignObjectProps={{
//             width: appState.nodeSize.x,
//             height: appState.nodeSize.y,
//             x: -50,
//             y: 50,
//           }}
//         />
//       ),
//     },
//   };

//   const treeProps = {
//     data: data,
//     totalNodeCount: data && Object.keys(data).length > 0 && countNodes(data),
//     orientation: 'vertical',
//     centeringTransitionDuration: 800,
//     translateX: smallScreen ? 187 : 548,
//     translateY: smallScreen ? 140 : 115,
//     pathFunc: '',
//     collapsible: true,
//     shouldCollapseNeighborNodes: false,
//     initialDepth: 6,
//     zoomable: true,
//     draggable: true,
//     zoom: 1,
//     scaleExtent: {min: 0.1, max: 1},
//     separation: {siblings: 2, nonSiblings: 2},
//     nodeSize: {x: 200, y: 200},
//     enableLegacyTransitions: false,
//     transitionDuration: 500,
//     renderCustomNodeElement: customNodeFnMapping['svg'].fn,
//     styles: {
//       nodes: {
//         node: {
//           circle: {
//             fill: 'transparent',
//           },
//           attributes: {
//             stroke: '#000',
//           },
//         },
//         leafNode: {
//           circle: {
//             fill: 'transparent',
//           },
//           attributes: {
//             stroke: '#000',
//           },
//         },
//       },
//     },
//   };
//   if (!data) return <div>Loading...</div>;

//   const containerStyles = {
//     width: '100%',
//     height: '100vh',
//     position: 'relative',
//   };

//   return (
//     Object.keys(network).length > 0 && (
//       <div
//         className={`relative ${smallScreen ? 'mobileTree' : 'desktopTree'}`}
//         style={containerStyles}
//       >
//         <div className="flex items-center gap-2 p-4">
//           {/* <span>Total Members: {treeProps.totalNodeCount}</span> */}
//         </div>

//         <Tree
//           data={treeProps.data}
//           renderCustomNodeElement={
//             treeProps.renderCustomNodeElement
//               ? (rd3tProps) =>
//                   treeProps.renderCustomNodeElement(rd3tProps, {
//                     ...treeProps,
//                   })
//               : undefined
//           }
//           orientation={treeProps.orientation}
//           centeringTransitionDuration={treeProps.centeringTransitionDuration}
//           translate={{x: treeProps.translateX, y: treeProps.translateY}}
//           collapsible={treeProps.collapsible}
//           initialDepth={treeProps.initialDepth}
//           zoomable={treeProps.zoomable}
//           draggable={treeProps.draggable}
//           zoom={treeProps.zoom}
//           scaleExtent={treeProps.scaleExtent}
//           nodeSize={treeProps.nodeSize}
//           separation={treeProps.separation}
//           enableLegacyTransitions={treeProps.enableLegacyTransitions}
//           transitionDuration={treeProps.transitionDuration}
//           styles={treeProps.styles}
//           shouldCollapseNeighborNodes={treeProps.shouldCollapseNeighborNodes}
//           onNodeClick={(node) => {
//             setHoveredNode(node);
//           }}
//         />
//       </div>
//     )
//   );
// };

// export default TreeNode;
/*eslint-disable */

import React, {useState, useEffect, useRef} from 'react';
import Tree from 'react-d3-tree';
import MixedNodeInputElement from './MixedNodeInputElement';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElementG from './PureSvgNodeElementG';

const TreeNode = ({network}) => {
  const [data, setData] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const treeContainerRef = useRef();

  useEffect(() => {
    const transformedData = transformNetworkData(network);
    setData(transformedData);
  }, [network]);

  const windowWidth = window.innerWidth;
  const smallScreen = windowWidth <= 768;

  const transformNetworkData = (data) => {
    const transformNode = (node) => {
      const {side, id, first_name, sponserer_username, isGolden} = node.data;
      const {name} = node;
      return {
        name: name,
        attributes: {
          ID: id,
          // FirstName: first_name,
          Sponserer: sponserer_username,
          // Side: side,
          IsGolden: isGolden,
          IsActive: node.data.isActive,
        },
        children: node.children ? node.children.map(transformNode) : [],
      };
    };
    return transformNode(data);
  };

  const countNodes = (node) => {
    if (!node.children || node.children.length === 0) {
      return 0;
    }

    let count = node.children.length;

    node.children.forEach((child) => {
      count += countNodes(child);
    });

    return count;
  };

  const customNodeFnMapping = {
    svg: {
      description: 'Default - Pure SVG node & label (IE11 compatible)',
      fn: (rd3tProps, appState) => (
        <PureSvgNodeElementG
          nodeDatum={rd3tProps.nodeDatum}
          toggleNode={rd3tProps.toggleNode}
          orientation={appState.orientation}
        />
      ),
    },
    mixed: {
      description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
      fn: ({nodeDatum, toggleNode}, appState) => (
        <MixedNodeElement
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          foreignObjectProps={{
            width: appState.nodeSize.x,
            height: appState.nodeSize.y,
            x: -50,
            y: 50,
          }}
        />
      ),
    },
    input: {
      description: 'MixedNodeElement - Interactive nodes with inputs',
      fn: ({nodeDatum, toggleNode}, appState) => (
        <MixedNodeInputElement
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          foreignObjectProps={{
            width: appState.nodeSize.x,
            height: appState.nodeSize.y,
            x: -50,
            y: 50,
          }}
        />
      ),
    },
  };

  const treeProps = {
    data: data,
    totalNodeCount: data && Object.keys(data).length > 0 && countNodes(data),
    orientation: 'vertical',
    centeringTransitionDuration: 800,
    translateX: smallScreen ? 187 : 548,
    translateY: smallScreen ? 140 : 115,
    pathFunc: '',
    collapsible: true,
    shouldCollapseNeighborNodes: false,
    initialDepth: 6,
    zoomable: true,
    draggable: true,
    zoom: 1,
    scaleExtent: {min: 0.1, max: 1},
    separation: {siblings: 2, nonSiblings: 2},
    nodeSize: {x: 200, y: 200},
    enableLegacyTransitions: false,
    transitionDuration: 500,
    renderCustomNodeElement: customNodeFnMapping['svg'].fn,
    styles: {
      links: {
        stroke: '#9CA3AF', 
        strokeWidth: 2,
      },
      nodes: {
        node: {
          circle: {
            fill: 'transparent',
            stroke: '#000', 
            strokeWidth: 2,
          },
          attributes: {
            fill: '#000',
            fontSize: 14,
          },
          name: {
            fill: '#000', 
            fontWeight: 'bold',
          },
        },
        leafNode: {
          circle: {
            fill: 'transparent',
            stroke: '#000',
            strokeWidth: 2,
          },
          attributes: {
            fill: '#000', 
            fontSize: 14,
          },
          name: {
            fill: '#000', 
            fontWeight: 'bold',
          },
        },
      },
    },
  };

  if (!data) return <div>Loading...</div>;

  const containerStyles = {
    width: '100%',
    height: '100vh',
    position: 'relative',
  };

  return (
    Object.keys(network).length > 0 && (
      <div
        className={`relative ${smallScreen ? 'mobileTree' : 'desktopTree'}`}
        style={containerStyles}
        ref={treeContainerRef}
      >
        <div className="p-4">Total Members: {treeProps.totalNodeCount}</div>
        <Tree
          data={treeProps.data}
          renderCustomNodeElement={
            treeProps.renderCustomNodeElement
              ? (rd3tProps) =>
                  treeProps.renderCustomNodeElement(rd3tProps, treeProps)
              : undefined
          }
          orientation={treeProps.orientation}
          centeringTransitionDuration={treeProps.centeringTransitionDuration}
          translate={{x: treeProps.translateX, y: treeProps.translateY}}
          collapsible={treeProps.collapsible}
          initialDepth={treeProps.initialDepth}
          zoomable={treeProps.zoomable}
          draggable={treeProps.draggable}
          zoom={treeProps.zoom}
          scaleExtent={treeProps.scaleExtent}
          nodeSize={treeProps.nodeSize}
          separation={treeProps.separation}
          enableLegacyTransitions={treeProps.enableLegacyTransitions}
          transitionDuration={treeProps.transitionDuration}
          styles={treeProps.styles}
          shouldCollapseNeighborNodes={treeProps.shouldCollapseNeighborNodes}
          onNodeClick={(node) => {
            setHoveredNode(node);
          }}
        />
        {hoveredNode && (
          <div
            className="border-gray-300 absolute rounded border bg-white p-4 shadow-lg"
            style={{
              top: hoveredNode.y + 15,
              left: hoveredNode.x + 15,
              zIndex: 1000,
            }}
          >
            <p className="text-gray-800 font-semibold">{hoveredNode.name}</p>
            <p>ID: {hoveredNode.attributes.ID}</p>
            <p>First Name: {hoveredNode.attributes.FirstName}</p>
            <p>Sponserer: {hoveredNode.attributes.Sponserer}</p>
            <p>Sponserer: {hoveredNode.attributes.Side}</p>
          </div>
        )}
      </div>
    )
  );
};

export default TreeNode;
