/*eslint-disable */
import React, {useState} from 'react';
import {user, userbw, golden, userRed} from '../../assets/images/user';

const textLayout = {
  vertical: {
    title: {textAnchor: 'start', x: 40},
    attributes: {},
    attribute: {x: 40, dy: '1.2em'},
  },
  horizontal: {
    title: {textAnchor: 'start', y: 40},
    attributes: {x: 0, y: 40},
    attribute: {x: 0, dy: '1.2em'},
  },
};

const PureSvgNodeElement = ({
  nodeDatum,
  orientation,
  toggleNode,
  onNodeClick,
  matchedNode,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  if (nodeDatum._invisible) {
    return <circle r={1} fill="transparent" />;
  }

  const filteredAttributes = Object.entries(nodeDatum.attributes || {})
    .filter(([key]) => key !== 'IsGolden')
    .map(([key, value]) => {
      if (key === 'IsActive') {
        return ['__status', value ? 'Active' : 'Inactive'];
      }
      return [key, value];
    });

  const handleTogglePopup = (e) => {
    e.stopPropagation();
    setShowPopup((prev) => !prev);
  };

  const imageSource = !nodeDatum.attributes.IsActive
    ? userRed
    : nodeDatum.attributes.IsGolden
      ? golden
      : nodeDatum.children?.length
        ? user
        : userbw;

  return (
    <>
      <image
        href={imageSource}
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

      <g className="rd3t-label__title">
        {/* Only show ID */}
        <text
          onClick={handleTogglePopup}
          className="rd3t-label__title"
          {...textLayout[orientation].title}
          style={{
            fill: nodeDatum?.attributes?.IsActive ? '' : 'red',
          }}
        >
          <tspan x={textLayout[orientation].title.x} dy="0">
            {nodeDatum.name}
          </tspan>
          <tspan
            x={textLayout[orientation].title.x}
            dy="1.2em"
            onClick={handleTogglePopup}
            style={{cursor: 'pointer'}}
          >
            {nodeDatum.attributes?.ID}
          </tspan>
        </text>

        {/* Popup Tooltip for other attributes */}
        {showPopup && (
          <foreignObject x={50} y={20} width={200} height={150}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                background: 'white',
                border: '1px solid gray',
                borderRadius: 6,
                padding: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                fontSize: 12,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {filteredAttributes.map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    fontWeight: key === '__status' ? 'bold' : 'normal',
                    color:
                      key === '__status'
                        ? value === 'Active'
                          ? 'green'
                          : 'red'
                        : 'black',
                  }}
                >
                  {key === '__status'
                    ? value
                    : key === 'ID'
                      ? `CRN: ${value}`
                      : `${key}: ${value}`}
                </div>
              ))}
            </div>
          </foreignObject>
        )}
      </g>
    </>
  );
};

export default PureSvgNodeElement;
