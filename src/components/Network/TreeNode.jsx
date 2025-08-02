/*eslint-disable */

import React, {useState, useEffect, useRef} from 'react';
import Tree from 'react-d3-tree';
import MixedNodeInputElement from './MixedNodeInputElement';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';

const TreeNode = ({network}) => {
  const [data, setData] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedNode, setMatchedNode] = useState(null);
  const treeContainerRef = useRef();

  useEffect(() => {
    const transformedData = transformNetworkData(network);
    setData(transformedData);
  }, [network]);

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    } else {
      setMatchedNode(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm);
      } else {
        setMatchedNode(null);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(delay); // Clear timeout on next keystroke
  }, [searchTerm]);

  const treeRef = useRef();
  const handleSearch = (term) => {
    if (!data) return;

    // 1. Expand path to match
    const match = findAndExpandNode(data, term);

    if (match) {
      // 2. Save matched node for highlighting
      setMatchedNode(match);

      // 3. Trigger re-render to apply `collapsed = false`
      setData({...data});

      // 4. Delay centering until next render/frame
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (treeRef.current && match.__rd3t) {
            treeRef.current.centerNode(match.__rd3t);
          }
        }, 50); // Slight delay so react-d3-tree attaches __rd3t
      });
    }
  };

  const findAndExpandNode = (node, term) => {
    const idMatch = node.attributes?.ID?.toLowerCase() === term.toLowerCase();
    const nameMatch = node.attributes?.FirstName?.toLowerCase().includes(
      term.toLowerCase(),
    );

    if (idMatch || nameMatch) return node;

    if (node.children) {
      for (let child of node.children) {
        const result = findAndExpandNode(child, term);
        if (result) {
          // ✅ Expand this ancestor
          node.__rd3t = node.__rd3t || {};
          node.__rd3t.collapsed = false;
          return result;
        }
      }
    }
    return null;
  };

  const findNode = (node, term) => {
    if (!node) return null;
    const idMatch = node.attributes?.ID?.toLowerCase() === term.toLowerCase();
    const nameMatch = node.attributes?.FirstName?.toLowerCase().includes(
      term.toLowerCase(),
    );

    if (idMatch || nameMatch) return node;

    if (node.children) {
      for (let child of node.children) {
        const result = findNode(child, term);
        if (result) return result;
      }
    }
    return null;
  };

  const windowWidth = window.innerWidth;
  const smallScreen = windowWidth <= 768;

  const transformNetworkData = (data) => {
    const transformNode = (node) => {
      const {
        side,
        id,
        first_name,
        sponserer_username,
        isGolden,
        isActive,
        leftCount,
        rightCount,
        centerCount,
      } = node.data;
      const {name} = node;

      const aChild = node.children?.find((c) => c.data.side === 'A (Left)');
      const bChild = node.children?.find((c) => c.data.side === 'B (Center)');
      const cChild = node.children?.find((c) => c.data.side === 'C (Right)');

      const hasAnyChild = aChild || bChild || cChild;

      let children;

      if (hasAnyChild) {
        // Preserve position by always using 3 slots
        children = [
          aChild
            ? transformNode(aChild)
            : {name: '', attributes: {}, _invisible: true},
          bChild
            ? transformNode(bChild)
            : {name: '', attributes: {}, _invisible: true},
          cChild
            ? transformNode(cChild)
            : {name: '', attributes: {}, _invisible: true},
        ];
      }

      return {
        name,
        attributes: {
          ID: id,
          FirstName: first_name,
          Sponserer: sponserer_username,
          Side: side,
          IsGolden: isGolden,
          IsActive: isActive,
          Counts: ` ${leftCount} LEFT- ${centerCount} CENTER- ${rightCount} RIGHT`,
        },
        ...(children ? {children} : {}),
      };
    };

    return transformNode(data);
  };

  const countNodes = (node) => {
    if (!node?.children || node?.children?.length === 0) {
      return 0;
    }

    let count = node?.children?.length;

    node.children.forEach((child) => {
      count += countNodes(child);
    });

    return count;
  };

  const customNodeFnMapping = {
    svg: {
      description: 'Default - Pure SVG node & label (IE11 compatible)',
      fn: (rd3tProps, appState) => (
        <PureSvgNodeElement
          nodeDatum={rd3tProps.nodeDatum}
          toggleNode={rd3tProps.toggleNode}
          orientation={appState.orientation}
          matchedNode={appState.matchedNode}
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
      nodes: {
        node: {
          circle: {
            fill: 'transparent',
          },
          attributes: {
            stroke: '#000',
          },
        },
        leafNode: {
          circle: {
            fill: 'transparent',
          },
          attributes: {
            stroke: '#000',
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
        <div className="flex items-center gap-2 p-4">
          <span>Total Members: {treeProps.totalNodeCount}</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or Name"
            className="border-gray-300 ml-4 w-90 rounded border px-2 py-1"
          />
        </div>

        <Tree
          ref={treeRef}
          data={treeProps.data}
          renderCustomNodeElement={
            treeProps.renderCustomNodeElement
              ? (rd3tProps) =>
                  treeProps.renderCustomNodeElement(rd3tProps, {
                    ...treeProps,
                    matchedNode,
                  })
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
