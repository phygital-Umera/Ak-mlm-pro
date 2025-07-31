import React from 'react';
import styled from 'styled-components';
import CoverVideo from '../components/newweb/CoverVideo';
import Logo from '../components/newweb/Logo';
import NavBar from '../components/newweb/NavBar';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  return (
    <Section id="home">
      <CoverVideo />
      <Logo />
      <NavBar />
    </Section>
  );
};

export default Home;
