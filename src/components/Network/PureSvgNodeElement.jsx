/*eslint-disable */
import React from 'react';
import {user, userbw, golden, userRed} from '../../assets/images/user';

const textLayout = {
  vertical: {
    title: {
      textAnchor: 'start',
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: '1.2em',
    },
  },
  horizontal: {
    title: {
      textAnchor: 'start',
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: '1.2em',
    },
  },
};

// const PureSvgNodeElement = ({
//   nodeDatum,
//   orientation,
//   toggleNode,
//   onNodeClick,
// }) => {
//   // Add Only This Const code for remove IsGolden Text from Node Tree
//   const filteredAttributes = Object.entries(nodeDatum.attributes || {}).filter(
//     ([key]) => key !== 'IsGolden',
//   );

//   if (nodeDatum._invisible) {
//     return (
//       <>
//         {/* Draw a transparent circle just to ensure the line gets drawn */}
//         <circle r={1} fill="transparent" />
//       </>
//     );
//   }

//   return (
//     <>
//       <image
//         href={
//           !nodeDatum.attributes.IsActive
//             ? userRed
//             : nodeDatum.attributes.IsGolden
//               ? golden
//               : nodeDatum.children?.length
//                 ? user
//                 : userbw
//         }
//         width={45}
//         height={45}
//         onClick={toggleNode}
//         style={{cursor: 'pointer'}}
//         x={-20} // Adjust x and y to center the image if needed
//         y={-20}
//       />

//       <g className="rd3t-label">
//         <text
//           className="rd3t-label__title"
//           {...textLayout[orientation].title}
//           onClick={onNodeClick}
//           style={{
//             fill: nodeDatum?.attributes?.IsActive ? '' : 'red', // Add styles as needed
//           }}
//         >
//           {nodeDatum.name}
//         </text>
//         <text
//           className="rd3t-label__attributes"
//           {...textLayout[orientation].attributes}
//         >
//           {/* {nodeDatum.attributes &&
//             Object.entries(nodeDatum.attributes).map(
//               ([labelKey, labelValue], i) => ( */}
//           {filteredAttributes.map(
//             (
//               [labelKey, labelValue],
//               i, // Add this line For remove IsGolden Text from Node Tree
//             ) => (
//               <tspan
//                 key={`${labelKey}-${i}`}
//                 {...textLayout[orientation].attribute}
//               >
//                 {labelKey}: {labelValue}
//               </tspan>
//             ),
//           )}
//         </text>
//       </g>
//     </>
//   );
// };

const PureSvgNodeElement = ({
  nodeDatum,
  orientation,
  toggleNode,
  onNodeClick,
  matchedNode,
}) => {
  // Only render minimal invisible node for connector
  if (nodeDatum._invisible) {
    return (
      <>
        {/* Needed to render connector lines, otherwise line disappears */}
        <circle r={1} fill="transparent" />
      </>
    );
  }
  if (matchedNode?.__rd3t?.id === nodeDatum.__rd3t?.id) {
    circleFill = 'yellow'; // highlight background
  }

  // Rest of your original rendering logic
  const filteredAttributes = Object.entries(nodeDatum.attributes || {}).filter(
    ([key]) => key !== 'IsGolden',
  );

  return (
    <>
      <image
        href={
          !nodeDatum.attributes.IsActive
            ? userRed
            : nodeDatum.attributes.IsGolden
              ? golden
              : nodeDatum.children?.length
                ? user
                : userbw
        }
        width={45}
        height={45}
        onClick={toggleNode}
        style={{
          cursor: 'pointer',
          outline:
            matchedNode?.attributes?.ID === nodeDatum.attributes?.ID
              ? '10px solid red'
              : 'none',
          borderRadius: '50%',
        }}
        x={-20}
        y={-20}
      />

      <g className="rd3t-label">
        <text
          className="rd3t-label__title"
          {...textLayout[orientation].title}
          onClick={onNodeClick}
          style={{
            fill: nodeDatum?.attributes?.IsActive ? '' : 'red',
          }}
        >
          {nodeDatum.name}
        </text>
        <text
          className="rd3t-label__attributes"
          {...textLayout[orientation].attributes}
        >
          {filteredAttributes.map(([labelKey, labelValue], i) => (
            <tspan
              key={`${labelKey}-${i}`}
              {...textLayout[orientation].attribute}
            >
              {labelKey}: {labelValue}
            </tspan>
          ))}
        </text>
      </g>
    </>
  );
};

export default PureSvgNodeElement;
