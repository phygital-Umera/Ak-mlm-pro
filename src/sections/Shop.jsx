/* eslint-disable */
import {motion} from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, {useLayoutEffect, useRef} from 'react';
import styled from 'styled-components';

// Replace these with your actual product images
import waterIonizer from '../assets2/Products/Ionizer.jpg';
import ebike from '../assets2/Products/Bicycle.jpg';
import ebikeSpecs from '../assets2/Products/specs.jpg';
// import cleanWater from "../assets/Products/cleanwater.jpg";

const ShopReset = styled.div`
  #shop {
    all: initial;
    box-sizing: border-box;
    font-family: inherit;

    * {
      box-sizing: border-box;
    }
  }
`;

const Section = styled(motion.section)`
  min-height: 100vh;
  height: auto;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: ${(props) => props.theme.white};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  font-weight: 300;
  color: ${(props) => props.theme.text};
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  z-index: 10;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .full-version {
    display: block;
  }

  .mobile-version {
    display: none;
  }

  p {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 64em) {
    p {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    width: 40%;
    p {
      font-size: ${(props) => props.theme.fontsm};
    }

    .full-version {
      display: none;
    }

    .mobile-version {
      display: block;
    }
  }
  @media (max-width: 30em) {
    p {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;

const Right = styled.div`
  position: absolute;
  left: 35%;
  padding-left: 30%;
  background-color: ${(props) => props.theme.white};
  color: black;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled(motion.div)`
  display: inline-block;
  width: 22rem;
  margin-right: 6rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  color: black;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 1rem;
    object-fit: cover;
    aspect-ratio: 1/1;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 0.5rem;
    color: black;
  }

  p {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontmd};
    text-align: center;
    opacity: 0.8;
    color: black;
  }

  @media (max-width: 48em) {
    width: 18rem;
    padding: 1rem;
  }
`;

const Product = ({img, title, description}) => {
  return (
    <Item
      initial={{filter: 'grayscale(100%)', y: 50, opacity: 0}}
      whileInView={{filter: 'grayscale(0%)', y: 0, opacity: 1}}
      whileHover={{y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'}}
      transition={{duration: 0.5}}
      viewport={{once: false, amount: 0.5}}
    >
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </Item>
  );
};

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const Horizontalref = useRef(null);

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = Horizontalref.current;
    let pinWrapWidth = scrollingElement.offsetWidth;
    let t1 = gsap.timeline();

    setTimeout(() => {
      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: `${pinWrapWidth} bottom`,
          scroller: '.App',
          scrub: 1,
          pin: true,
        },
        height: `${scrollingElement.scrollWidth}px`,
        ease: 'none',
      });

      t1.to(scrollingElement, {
        scrollTrigger: {
          trigger: scrollingElement,
          start: 'top top',
          end: `${pinWrapWidth} bottom`,
          scroller: '.App',
          scrub: 1,
        },
        x: -pinWrapWidth,
        ease: 'none',
      });
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      t1.kill();
      ScrollTrigger.kill();
    };
  }, []);

  const products = [
    {
      img: waterIonizer,
      title: 'SIGGMA Water Ionizer',
      description:
        'Advanced ionized water system for a healthier lifestyle and better hydration.',
    },
    {
      img: ebike,
      title: 'SIGGMA Electric Bicycle',
      description:
        'Eco-friendly e-bike with long battery life, designed for urban commutes.',
    },
    {
      img: ebikeSpecs,
      title: 'SIGGMA Cycle Specs',
      description:
        'Detailed specs of our electric bike, combining style, speed, and strength.',
    },
  ];

  return (
    <>
      <ShopReset />
      <Section ref={ref} id="shop">
        <Title data-scroll data-scroll-speed="-1">
          Our Products
        </Title>
        <Left className="full-version">
          <p>
            SIGGMA Ventures brings you revolutionary products designed to
            enhance your lifestyle. From advanced water solutions to
            eco-friendly transportation, we combine innovation with
            sustainability to create products that make a difference.
            <br />
            <br />
            Our water ionizers transform ordinary water into antioxidant-rich
            alkaline water, while our electric bicycles offer clean urban
            mobility. Each product is engineered with cutting-edge technology
            and premium materials.
          </p>
        </Left>
        <Left className="mobile-version">
          <p>
            SIGGMA Ventures delivers innovative lifestyle products combining
            advanced technology with sustainability. Our water ionizers create
            antioxidant-rich alkaline water, while our electric bicycles provide
            eco-friendly urban mobility - all crafted with premium materials and
            cutting-edge engineering.
          </p>
        </Left>
        <Right data-scroll ref={Horizontalref}>
          {products.map((product, index) => (
            <Product
              key={index}
              img={product.img}
              title={product.title}
              description={product.description}
            />
          ))}
        </Right>
      </Section>
    </>
  );
};

export default Shop;
