import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

// Component-level reset styles
const Section = styled.section`
  && {
    all: initial;
    box-sizing: border-box;
    display: block;
    width: 80vw;
    margin: 0 auto;
    padding: 4rem 0;
    font-size: ${(props) => props.theme.fontmd};
    color: black;
    overflow: hidden;
    font-family: inherit;
  }
`;

const Title = styled(motion.h2)`
  && {
    all: initial;
    box-sizing: border-box;
    font-size: ${(props) => props.theme.fontxxxl};
    font-family: 'Kaushan Script';
    margin: 0 0 2rem 0;
    padding: 0;
    color: inherit;
    display: block;
    @media (max-width: 30em) {
      font-size: calc(1.5rem + 5vw); // More reasonable mobile size
      line-height: 1.2; // Better line spacing for mobile
    }
  }
`;

const Director = styled(motion.div)`
  && {
    all: initial;
    box-sizing: border-box;
    display: block;
    margin: 0 0 2rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-family: inherit;
    color: inherit;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }
`;

const Name = styled.h3`
  && {
    all: initial;
    box-sizing: border-box;
    font-size: ${(props) => props.theme.fontxl};
    margin: 0 0 0.5rem 0;
    padding: 0;
    color: black;
    position: relative;
    display: inline-block;
    font-family: inherit;
    font-weight: bold;
    @media (max-width: 30em) {
      font-size: calc(1.1rem); // More reasonable mobile size
      line-height: 1.2; // Better line spacing for mobile
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #ff4d4d, #f9cb28);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

// Paragraph reset (for the director descriptions)
const Description = styled.p`
  && {
    all: initial;
    box-sizing: border-box;
    display: block;
    margin: 0.5rem 0 0 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    line-height: 1.5;
  }
`;

// Animation variants remain the same
const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const titleVariants = {
  hidden: {x: -50, opacity: 0},
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 100,
    },
  },
};

const Directors = () => {
  return (
    <Section>
      <Title
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: false, margin: '-100px', reverse: true}}
      >
        Our Leadership
      </Title>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: false, margin: '-50px', reverse: true}}
      >
        <Director variants={itemVariants}>
          <Name>Mr. Mahesh Gondhali (CEO) – The Visionary Strategist</Name>
          <Description>
            Over 25 years in pharmaceuticals and 5+ years in direct selling, Mr.
            Gondhali built a ₹500 Cr company, launched 1300+ e-bike showrooms,
            and shaped Siggmalyf&apos;s strategic direction.
          </Description>
        </Director>

        <Director variants={itemVariants}>
          <Name>Mr. Mayur Ingale (Director) – The Sales Catalyst</Name>
          <Description>
            With 20+ years in companies like Philips, Jio, PhonePe, Mr. Ingale
            is a network marketing expert driving direct sales empowerment at
            Siggmalyf.
          </Description>
        </Director>

        <Director variants={itemVariants}>
          <Name>Mr. Mahesh Gavane (Director) – The Marketing Maestro</Name>
          <Description>
            With 15+ years in Marketing, IT, and Forex, Mr. Gavane brings a rare
            blend of brand, finance, and tech expertise to scale
            Siggmalyf&apos;s presence.
          </Description>
        </Director>
      </motion.div>
    </Section>
  );
};

export default Directors;
