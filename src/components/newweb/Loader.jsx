import {motion} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;

  svg {
    width: 10vw;
    height: auto;
    overflow: visible;

    path {
      stroke: #fff;
      fill: none;
      stroke-width: 0.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  @media (max-width: 48em) {
    svg {
      width: 20vw;
    }
  }
`;

const textVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      yoyo: Infinity,
      ease: 'easeInOut',
    },
  },
};

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const Loader = () => {
  return (
    <Container
      initial={{y: 0, opacity: 1}}
      exit={{y: '100%', opacity: 0}}
      transition={{duration: 2}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <motion.path
          key="sigma-path"
          variants={{
            hidden: {pathLength: 0, opacity: 0},
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {duration: 1.5, ease: 'easeIn'},
            },
          }}
          initial="hidden"
          animate="visible"
          d="M16,16H10.41l3.3-3.29a1,1,0,0,0,0-1.42L10.41,8H16a1,1,0,0,0,0-2H8a1,1,0,0,0-.92.62,1,1,0,0,0,.21,1.09L11.59,12l-4.3,4.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,8,18h8a1,1,0,0,0,0-2Z"
        />
      </svg>
      <Text variants={textVariants} initial="hidden" animate="visible">
        TMS LIFE
      </Text>
    </Container>
  );
};

export default Loader;
