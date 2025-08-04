import {motion} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import girl from '../../assets2/Images/walking-girl.avif';

const VideoContainer = styled.section`
  /* Reset all inherited styles */
  all: initial;

  /* Then explicitly set your styles */
  width: 100%;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 48em) {
      object-position: center 10%;
    }
  }
  @media (max-width: 30em) {
    object-position: center 50%;
  }
`;

const DarkOverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.7)`};
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
  }

  h1 {
    font-family: 'Kaushan Script';
    font-size: ${(props) => props.theme.fontBig};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};

    @media (max-width: 64em) {
      font-size: calc(${(props) => props.theme.fontBig} - 1rem);
    }

    @media (max-width: 48em) {
      font-size: calc(${(props) => props.theme.fontBig} - 2rem);
    }

    @media (max-width: 30em) {
      font-size: calc(1.5rem + 12vw); // More reasonable mobile size
      line-height: 1.2; // Better line spacing for mobile
    }
  }

  h2 {
    font-family: 'Sirin Stencil';
    font-size: ${(props) => props.theme.fontlg};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    font-weight: 300;
    text-transform: capitalize;
    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const container = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      delayChildren: 2,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },
};

const CoverVideo = () => {
  return (
    <VideoContainer>
      <DarkOverLay />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          zIndex: 5,
          maxWidth: '90%',
          color: '#fff',
          fontSize: '1.2rem',
        }}
        initial={{opacity: 0, y: 40}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 3, duration: 1}}
      >
        TMS LIFE Ventures Pvt Ltd is a forward-thinking lifestyle company
        integrating health, mobility, and smart living through innovation and
        direct selling.
      </motion.div>

      <Title variants={container} intial="hidden" animate="visible">
        <div>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.5"
            data-scroll-speed="4"
          >
            T
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.4"
            data-scroll-speed="4"
          >
            M
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.3"
            data-scroll-speed="4"
          >
            S
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.2"
            data-scroll-speed="4"
          >
            L
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.1"
            data-scroll-speed="4"
          >
            I
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.09"
            data-scroll-speed="4"
          >
            F
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.08"
            data-scroll-speed="4"
          >
            E
          </motion.h1>
          {/* <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.07"
            data-scroll-speed="4"
          >
            y
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.06"
            data-scroll-speed="4"
          >
            f
          </motion.h1> */}
        </div>
        <motion.h2
          variants={item}
          intial="hidden"
          animate="visible"
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
        >
          Innovation. Culture. Growth.
        </motion.h2>
      </Title>
      <img src={girl} alt="walking girl" />
    </VideoContainer>
  );
};

export default CoverVideo;
