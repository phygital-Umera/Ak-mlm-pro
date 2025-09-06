import {motion} from 'framer-motion';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets2/lg1.png';

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 6;
  width: fit-content;

  a {
    display: flex;
    align-items: flex-end;
    text-decoration: none;
  }

  img {
    height: 1.5rem; /* Default for mobile */
    width: auto; /* Maintain aspect ratio */
    object-fit: contain; /* Ensure image fits properly */
    @media (min-width: 768px) {
      height: 2.5rem; /* Larger for desktop */
    }
  }
  svg {
    width: 4rem;
    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g {
      path {
        stroke: #fff;
      }
    }
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const Logo = () => {
  return (
    <Container>
      {/* <Link to="/"> */}
      <img src={logo} alt="logo" />
      {/* </Link> */}
    </Container>
  );
};

export default Logo;
