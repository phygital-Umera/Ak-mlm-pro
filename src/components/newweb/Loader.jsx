import {motion} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// Modern gradient background container
const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  z-index: 9999;
  overflow: hidden;
  touch-action: none;
`;

// Animated gradient circle
const LoaderCircle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(145deg, #00c6fb 0%, #005bea 100%);
  box-shadow: 0 0 20px rgba(0, 198, 251, 0.4);
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: linear-gradient(145deg, #005bea 0%, #00c6fb 100%);
    z-index: -1;
    filter: blur(10px);
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

// Modern text styling
const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl || '2rem'};
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ffffff 0%, #d1d1d1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.25rem 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontlg || '1.5rem'};
  }
`;

// Additional decorative element
const DecorativeLine = styled(motion.div)`
  width: 100px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 198, 251, 0.8) 50%,
    transparent 100%
  );
  margin: 1rem 0;
`;

// Animation variants
const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const circleVariants = {
  hidden: {scale: 0.8, opacity: 0},
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      repeatType: 'mirror',
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const textVariants = {
  hidden: {opacity: 0, y: 10},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: {scaleX: 0, opacity: 0},
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Loader = () => {
  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <LoaderCircle
        variants={circleVariants}
        animate={{
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />

      <DecorativeLine variants={lineVariants} />

      <Text variants={textVariants}>WELCOME TO</Text>
      <Text variants={textVariants}>TMS LIFE</Text>
      <Text variants={textVariants}>SOLUTION</Text>
    </Container>
  );
};

export default Loader;
