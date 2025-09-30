/*eslint-disable */
import React, {useState} from 'react';
import {user, userbw, golden, userRed} from '../../assets/images/user';
import {FiPlus} from 'react-icons/fi';
import {useNavigate} from '@tanstack/react-router';

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
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const filteredAttributes = Object.entries(nodeDatum.attributes || {})
    .filter(([key]) => key !== 'IsGolden')
    .map(([key, value]) => {
      if (key === 'IsActive') {
        return ['__status', value ? 'Active' : 'Inactive'];
      }
      return [key, value];
    });

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  if (nodeDatum._invisible) {
    return (
      <>
        <circle r={1} fill="transparent" />
        <foreignObject x={-20} y={-20} width={50} height={50}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0f0f0',
              borderRadius: '50%',
              cursor: 'pointer',
              border: '1px dashed gray',
            }}
            onClick={() =>
              navigate({
                to: '/admin/customerregister',
                state: {
                  data: {
                    side: nodeDatum.__side,
                    parentId: nodeDatum.__parentId,
                  },
                },
              })
            }
          >
            <FiPlus />
          </div>
        </foreignObject>
      </>
    );
  }

  const imageSource = !nodeDatum.attributes.IsActive
    ? userRed
    : nodeDatum.attributes.IsGolden
      ? golden
      : nodeDatum.children?.length
        ? user
        : userbw;

  return (
    <>
      <g
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{cursor: 'pointer'}}
      >
        <image
          href={imageSource}
          width={45}
          height={45}
          onClick={toggleNode}
          style={{
            outline:
              matchedNode?.attributes?.ID === nodeDatum.attributes?.ID
                ? '10px solid red'
                : 'none',
            borderRadius: '50%',
          }}
          x={-20}
          y={-20}
        />

        <text
          className="rd3t-label__title"
          {...textLayout[orientation].title}
          style={{
            fill: nodeDatum?.attributes?.IsActive ? '' : 'red',
          }}
        >
          <tspan x={textLayout[orientation].title.x} dy="0">
            {nodeDatum.name}
          </tspan>
          <tspan x={textLayout[orientation].title.x} dy="1.2em">
            {nodeDatum.attributes?.ID}
          </tspan>
        </text>

        {showPopup && (
          <foreignObject x={50} y={20} width={200} height={500}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                background: 'white',
                border: '1px solid gray',
                borderRadius: 6,
                padding: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                fontSize: 12,
                pointerEvents: 'none', // Prevents the popup from interfering with mouse events
              }}
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
