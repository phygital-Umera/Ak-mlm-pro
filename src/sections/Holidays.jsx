import React, {useRef} from 'react';
import styled from 'styled-components';
import {motion, useScroll, useTransform} from 'framer-motion';
import ramojiImg from '../assets2/Images/ramoji.webp';

const HolidaysReset = styled.div`
  .holiday {
    all: initial;
    box-sizing: border-box;
    font-family: inherit;

    * {
      box-sizing: border-box;
    }
  }
`;

const Section = styled.section`
  width: 100vw;
  margin: 0 auto;
  padding: 6rem 5%; /* Changed to percentage-based padding */
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.body};
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 5%;
  }

  @media (max-width: 480px) {
    padding: 3rem 5%;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(
    2rem,
    5vw,
    ${(props) => props.theme.fontxxxl}
  ); /* Using clamp for responsive font */
  font-family: 'Kaushan Script';
  margin-bottom: 3rem;
  color: ${(props) => props.theme.text};
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 1.2;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled(motion.h3)`
  font-size: clamp(1.5rem, 3vw, ${(props) => props.theme.fontxl});
  margin: 3rem 0 1.5rem;
  color: ${(props) => props.theme.text};
  padding-left: 1rem;
  border-left: 3px solid ${(props) => props.theme.text};
  position: relative;
  line-height: 1.3;

  @media (max-width: 768px) {
    margin: 2rem 0 1rem;
  }
`;

const List = styled(motion.ul)`
  list-style: none;
  margin: 2rem 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ListItem = styled(motion.li)`
  background: ${(props) => props.theme.body};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.text};
  transition: all 0.3s ease;
  font-size: clamp(1rem, 1.1vw, 1.2rem);
  line-height: 1.6;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
    object-fit: cover;
  }

  p {
    margin: 0;
    padding: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => props.theme.text};
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    &::before {
      width: 6px;
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1rem;
  }
`;

const Description = styled(motion.p)`
  line-height: 1.8;
  margin-bottom: 2rem;
  padding: 0 1rem;
  font-size: clamp(1rem, 1.2vw, ${(props) => props.theme.fontlg});
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 0;
  }
`;

const Strong = styled(motion.strong)`
  color: ${(props) => props.theme.text};
  position: relative;
  display: inline-block;
  font-weight: 600;
`;

const Holidays = () => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const domesticPackages = [
    {
      title:
        'RAMOJI FILM CITY ( Rank Achiever Pair 100 2 night 3 days (Flight & Train)',
      image: ramojiImg,
    },
  ];

  // Animation transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 1]);

  // Strong element animation
  const strongX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const strongOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [1, 0.2, 0.5, 1],
  );

  return (
    <>
      <HolidaysReset />
      <Section ref={ref} className="holiday">
        <Title
          style={{y, opacity, scale}}
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: false, margin: '-100px'}}
          transition={{duration: 0.8}}
        >
          TMS LIFE SOLUTION
        </Title>

        <Description
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: false, margin: '-50px'}}
          transition={{duration: 0.8, delay: 0.3}}
        >
          <Strong style={{x: strongX, opacity: strongOpacity}}>
            TMS LIFE SOLUTION
          </Strong>{' '}
          is the travel and tourism arm of TMS Life Solutions Pvt Ltd, curating
          premium domestic and international experiences.
        </Description>

        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: false, margin: '-50px'}}
          transition={{duration: 0.8, delay: 0.5}}
        >
          <Subtitle
            initial={{x: -50}}
            whileInView={{x: 0}}
            viewport={{once: false}}
            transition={{type: 'spring', stiffness: 100}}
          >
            Domestic Holiday Packages
          </Subtitle>

          <List>
            {domesticPackages.map((item, index) => (
              <ListItem
                key={index}
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: false, margin: '-50px'}}
                transition={{duration: 0.6, delay: index * 0.1}}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  y: -5,
                }}
              >
                <img src={item.image} alt="Ramoji Film City" />
                <p>{item.title}</p>
              </ListItem>
            ))}
          </List>
        </motion.div>
      </Section>
    </>
  );
};

export default Holidays;
