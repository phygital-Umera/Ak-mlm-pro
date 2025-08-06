import React from 'react';
import styled from 'styled-components';
import img1 from '../assets2/Images/about1.jpg';
import img3 from '../assets2/Images/about2.jpeg';

const Heading = styled.h2`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontxl};
  margin-bottom: 1rem;
  color: ${(props) => props.theme.primary}; // Add a primary color to your theme
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 3px;
    background: ${(props) => props.theme.primary};
    border-radius: 3px;
  }
`;

const SubHeading = styled.h3`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontlg};
  margin: 1.5rem 0 0.5rem;
  color: ${(props) => props.theme.body};
`;

const StyledList = styled.ul`
  background-color: ${(props) => props.theme.body};
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 12px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 48em) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const ListItem = styled.li`
  color: ${(props) => props.theme.text};
  font-weight: 500;
  text-align: center;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 64em) {
    width: 90vw;
    flex-direction: column;
  }

  @media (max-width: 30em) {
    width: 100vw;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: relative;
  z-index: 5;
  padding-right: 2rem;
  margin-top: 2rem;

  @media (max-width: 64em) {
    width: 100%;
    padding: 2rem;
    margin-top: 5rem;
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.4)`};
    backdrop-filter: blur(5px);
    border-radius: 20px;
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
    padding: 1.5rem;
  }
`;

const Right = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 64em) {
    width: 100%;
    margin-top: 2rem;

    img {
      width: 100%;
      max-width: 500px;
    }
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontBig};
  font-family: 'Kaushan Script';
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;
  color: ${(props) => props.theme.primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    font-size: ${(props) => `calc(${props.theme.fontBig} - 3vw)`};
    top: 0;
    left: 5%;
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;

const Paragraph = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 300;
  margin: 1rem 0;
  line-height: 1.6;
  text-align: justify;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const ContentBlock = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${(props) => `rgba(${props.theme.textRgba},0.05)`};
  border-radius: 15px;
  border-left: 4px solid ${(props) => props.theme.primary};

  @media (max-width: 48em) {
    padding: 1rem;
  }
`;

const About = () => {
  return (
    <Section id="fixed-target" className="about">
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        About Us
      </Title>

      <Left data-scroll data-scroll-sticky data-scroll-target="#fixed-target">
        {/* <Heading>Our Philosophy</Heading> */}

        <ContentBlock>
          <SubHeading>Vision</SubHeading>
          <Paragraph>
            We are committed to becoming a global leader in the health and
            wellness sector, empowering individuals to not only achieve
            financial independence but also experience deep personal
            fulfillment. Our vision is to cultivate a thriving, health-conscious
            community that is supported by a combination of innovative wellness
            products and a transformative business network that encourages
            growth, collaboration, and success.
          </Paragraph>
          <Paragraph>
            We aim to inspire individuals to take control of their health,
            unlock their full potential. Together, we can build a future where
            health and personal success are within reach for everyone, anywhere.
          </Paragraph>
        </ContentBlock>

        <ContentBlock>
          <SubHeading>Mission</SubHeading>
          <Paragraph>
            Our mission is to empower and inspire individuals to unlock their
            full personal and professional potential. By providing premium,
            nature-based wellness products that enhance physical, mental, and
            emotional well-being, we aim to make a meaningful difference in
            peoples lives.
          </Paragraph>
          <Paragraph>
            We are dedicated to fostering a vibrant community built on
            encouragement, trust, and collaboration, where every individual
            feels supported in their journey toward growth and achievement.
            Together, we strive to create a world where wellness and success go
            hand in hand, empowering everyone to live their best life.
          </Paragraph>
        </ContentBlock>

        {/* <ContentBlock>
          <SubHeading>Core Values</SubHeading>
          <StyledList>
            <ListItem>Loyalty</ListItem>
            <ListItem>Integrity</ListItem>
            <ListItem>Innovation</ListItem>
            <ListItem>Respect</ListItem>
            <ListItem>Culture</ListItem>
            <ListItem>Growth</ListItem>
            <ListItem>Consistency</ListItem>
            <ListItem>Discipline</ListItem>
          </StyledList>
        </ContentBlock> */}
      </Left>

      <Right>
        <img src={img1} alt="About Us" data-scroll data-scroll-speed="1" />
      </Right>
    </Section>
  );
};

export default About;
