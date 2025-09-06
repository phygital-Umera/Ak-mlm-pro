import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  width: 90vw; // Increased from 80vw
  max-width: 1200px; // Added maximum width
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  @media (max-width: 48em) {
    width: 95vw; // Increased for mobile
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%; // Added to ensure full width
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 64em) {
    justify-content: center;
  }
`;

const BannerComponent = styled.h1`
  font-size: ${(props) => props.theme.fontxxl}; // Increased size
  font-family: 'Kaushan Script', cursive;
  color: ${(props) => props.theme.text};
  white-space: nowrap;
  text-transform: uppercase;
  line-height: 1.5; // Reduced line height
  font-weight: 500;
  width: 100%; // Added to ensure full width
  text-align: center; // Center alignment

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl}; // Adjusted size
  }
  @media (max-width: 64em) {
    margin: 1rem 0; // Increased margin
    font-size: ${(props) => props.theme.fontlg};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
    margin: 0.75rem 0;
    white-space: normal; // Allow text to wrap on mobile
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }

  span {
    display: inline-block; // Changed from block to inline-block
    background-color: ${(props) => props.theme.body};
    padding: 0.75rem 2rem; // Increased horizontal padding
    border-radius: 8px;
    text-align: center;
    margin: 0.5rem 0; // Added vertical margin
  }
`;

const Banner = () => {
  return (
    <Section>
      <Container id="up">
        <BannerComponent>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="8"
            data-scroll-target="#up"
          >
            Loyalty that builds lasting bonds.
          </span>
        </BannerComponent>
        <BannerComponent>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
            data-scroll-target="#up"
          >
            Integrity in every action.
          </span>
        </BannerComponent>
        <BannerComponent>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
            data-scroll-target="#up"
          >
            Innovation for better living.
          </span>
        </BannerComponent>
        <BannerComponent>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-4"
            data-scroll-target="#up"
          >
            Respect for people and ideas.
          </span>
        </BannerComponent>
        <BannerComponent>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
            data-scroll-target="#up"
          >
            A culture of growth and purpose.
          </span>
        </BannerComponent>
      </Container>
    </Section>
  );
};

export default Banner;
