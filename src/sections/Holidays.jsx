import React, {useRef} from 'react';
import styled from 'styled-components';
import {motion, useScroll, useTransform} from 'framer-motion';

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
  padding: 8rem 30px;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.body};
  overflow: hidden;
  position: relative;
`;

const Title = styled(motion.h2)`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  margin-bottom: 4rem;
  color: ${(props) => props.theme.text};
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;

  /* Responsive font sizes */
  @media (max-width: 1200px) {
    font-size: calc(${(props) => props.theme.fontxxxl} - 0.5rem);
  }

  @media (max-width: 992px) {
    font-size: calc(${(props) => props.theme.fontxxxl} - 1rem);
  }

  @media (max-width: 768px) {
    font-size: calc(${(props) => props.theme.fontxxxl} - 1.5rem);
    margin-bottom: 3rem;
  }

  @media (max-width: 576px) {
    font-size: calc(${(props) => props.theme.fontxxxl} - 2rem);
    margin-bottom: 2rem;
  }

  @media (max-width: 400px) {
    font-size: ${(props) => props.theme.fontxxl};
  }
`;

const Subtitle = styled(motion.h3)`
  font-size: ${(props) => props.theme.fontxl};
  margin: 4rem 0 2rem;
  color: ${(props) => props.theme.text};
  padding-left: 1rem;
  border-left: 3px solid ${(props) => props.theme.text};
  position: relative;
`;

const List = styled(motion.ul)`
  list-style: none;
  margin: 3rem 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ListItem = styled(motion.li)`
  background: ${(props) => props.theme.body};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.text};
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => props.theme.text};
    transition: all 0.4s ease;
  }
`;

const Description = styled(motion.p)`
  line-height: 1.8;
  margin-bottom: 3rem;
  padding: 0 1rem;
  font-size: ${(props) => props.theme.fontlg};
`;

const Strong = styled(motion.strong)`
  color: ${(props) => props.theme.text};
  position: relative;
  display: inline-block;
`;

const Holidays = () => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const domesticPackages = [
    'Goa',
    'Kerala Backwaters',
    'Himachal',
    'Uttarakhand',
    'Rajasthan',
    'Northeast India',
  ];
  const internationalPackages = [
    'Asia: Thailand, Singapore, Malaysia, Dubai',
    'Europe: Switzerland, Paris, Italy',
    'America: USA, Caribbean Cruises',
    'Australia & New Zealand',
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
          SIGGMA Holidays
        </Title>

        <Description
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: false, margin: '-50px'}}
          transition={{duration: 0.8, delay: 0.3}}
        >
          <Strong style={{x: strongX, opacity: strongOpacity}}>
            SIGGMA Holidays{' '}
          </Strong>{' '}
          is the travel and tourism arm of Siggmalyf Ventures Pvt Ltd, curating
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
                  scale: 1.05,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  y: -5,
                  '&::before': {
                    width: '100%',
                    opacity: 0.8,
                  },
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>

          <Description
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false, margin: '-50px'}}
            transition={{duration: 0.8}}
          >
            <Strong style={{x: strongX, opacity: strongOpacity}}>
              Special Tours:
            </Strong>{' '}
            Cultural, pilgrimage, wellness retreats.
          </Description>

          <Subtitle
            initial={{x: 50}}
            whileInView={{x: 0}}
            viewport={{once: false}}
            transition={{type: 'spring', stiffness: 100}}
          >
            International Holiday Packages
          </Subtitle>

          <List>
            {internationalPackages.map((item, index) => (
              <ListItem
                key={index}
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: false, margin: '-50px'}}
                transition={{duration: 0.6, delay: index * 0.1}}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  y: -5,
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </motion.div>

        {/* <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span>Scroll to explore</span>
        <Arrow />
      </ScrollIndicator> */}
      </Section>
    </>
  );
};

export default Holidays;
