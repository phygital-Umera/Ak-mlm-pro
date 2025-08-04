// import {motion} from 'framer-motion';
// import React, {useState} from 'react';
// import {useLocomotiveScroll} from 'react-locomotive-scroll';
// import {Link} from 'react-router-dom';
// import styled from 'styled-components';

// const NavContainer = styled(motion.div)`
//   position: absolute;
//   top: ${(props) => (props.click ? '0' : `-${props.theme.navHeight}`)};
//   transition: all 0.3s ease;
//   z-index: 6;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   /* Mobile styles */
//   @media (max-width: 40em) {
//     position: fixed; /* Changed to fixed for mobile */
//     height: ${(props) => (props.click ? '100vh' : '0')};
//     top: ${(props) => (props.click ? '0' : `-100%`)};
//     background-color: ${(props) => props.theme.body};
//     overflow: hidden;
//   }
// `;

// const MenuItems = styled(motion.ul)`
//   position: relative;
//   height: ${(props) => props.theme.navHeight};
//   background-color: ${(props) => props.theme.body};
//   color: ${(props) => props.theme.text};
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   list-style: none;
//   width: 100%;
//   padding: 0 10rem;

//   /* Mobile styles */
//   @media (max-width: 40em) {
//     flex-direction: column;
//     height: 100vh;
//     padding: 2rem 0;
//     justify-content: center;
//     gap: 2rem;
//   }
// `;

// const MenuBtn = styled.li`
//   background-color: ${(props) => `rgba(${props.theme.textRgba},0.7)`};
//   color: ${(props) => props.theme.body};
//   width: 15rem;
//   height: 2.5rem;
//   border: none;
//   outline: none;
//   clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   font-size: ${(props) => props.theme.fontmd};
//   font-weight: 600;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transition: all 0.3s ease;
//   z-index: 7;

//   /* Mobile styles */
//   @media (max-width: 40em) {
//     position: fixed;
//     top: ${(props) => (props.click ? 'calc(100vh - 2.5rem)' : '0')};
//     width: 10rem;
//     height: 2rem;
//   }
// `;

// const Item = styled(motion.li)`
//   text-transform: uppercase;
//   color: ${(props) => props.theme.text};

//   @media (max-width: 40em) {
//     flex-direction: column;
//     padding: 0.5rem 0;
//   }
// `;

// const Navbar = () => {
//   const [click, setClick] = useState(false);

//   const {scroll} = useLocomotiveScroll();

//   const handleScroll = (id) => {
//     let elem = document.querySelector(id);
//     // console.log(elem);
//     setClick(!click);
//     scroll.scrollTo(elem, {
//       offset: '-100',
//       duration: '2000',
//       easing: [0.25, 0.0, 0.35, 1.0],
//     });
//   };

//   return (
//     <NavContainer
//       click={+click}
//       initial={{y: `-100%`}}
//       animate={{y: 0}}
//       transition={{duration: 2, delay: 2 /* 2 */}}
//     >
//       <MenuItems
//         drag="y"
//         dragConstraints={{top: 0, bottom: 70}}
//         dragElastic={0.05}
//         dragSnapToOrigin
//       >
//         <MenuBtn onClick={() => setClick(!click)}>
//           <span>MENU</span>
//         </MenuBtn>
//         <Item
//           whileHover={{scale: 1.1, y: -5}}
//           whileTap={{scale: 0.9, y: 0}}
//           onClick={() => handleScroll('#home')}
//         >
//           {' '}
//           <Link to="/">Home</Link>
//         </Item>
//         <Item
//           whileHover={{scale: 1.1, y: -5}}
//           whileTap={{scale: 0.9, y: 0}}
//           onClick={(e) => {
//             handleScroll('.about')}}
//         >
//           <Link to="/">about</Link>
//         </Item>
//         <Item
//           whileHover={{scale: 1.1, y: -5}}
//           whileTap={{scale: 0.9, y: 0}}
//           onClick={() => handleScroll('#shop')}
//         >
//           <Link to="/">shop</Link>
//         </Item>

//         <Item
//           whileHover={{scale: 1.1, y: -5}}
//           whileTap={{scale: 0.9, y: 0}}
//           onClick={() => handleScroll('.holiday')}
//         >
//           {' '}
//           <Link to="/">Destinations</Link>
//         </Item>
//         <Item
//           whileHover={{scale: 1.1, y: -5}}
//           whileTap={{scale: 0.9, y: 0}}
//           onClick={() => (window.location.href = '/signin')}
//         >
//           {' '}
//           <p>Signin</p>
//         </Item>
//       </MenuItems>
//     </NavContainer>
//   );
// };

// export default Navbar;

import {motion} from 'framer-motion';
import React, {useState, useEffect} from 'react';
import {useLocomotiveScroll} from 'react-locomotive-scroll';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled(motion.div)`
  position: absolute;
  top: ${(props) => (props.click ? '0' : `-${props.theme.navHeight}`)};
  transition: all 0.3s ease;
  z-index: 6;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Mobile styles */
  @media (max-width: 40em) {
    position: fixed;
    height: ${(props) => (props.click ? '100vh' : '0')};
    top: ${(props) => (props.click ? '0' : `-100%`)};
    background-color: ${(props) => props.theme.body};
    overflow: hidden;
  }
`;

const MenuItems = styled(motion.ul)`
  position: relative;
  height: ${(props) => props.theme.navHeight};
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 0 10rem;

  /* Mobile styles */
  @media (max-width: 40em) {
    flex-direction: column;
    height: 100vh;
    padding: 2rem 0;
    justify-content: center;
    gap: 2rem;
  }
`;

const MenuBtn = styled.li`
  background-color: ${(props) => `rgba(${props.theme.textRgba},0.7)`};
  color: ${(props) => props.theme.body};
  width: 15rem;
  height: 2.5rem;
  border: none;
  outline: none;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 7;

  /* Mobile styles */
  @media (max-width: 40em) {
    position: fixed;
    top: ${(props) => (props.click ? 'calc(100vh - 2.5rem)' : '0')};
    width: 10rem;
    height: 2rem;
  }
`;

const Item = styled(motion.li)`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};

  @media (max-width: 40em) {
    flex-direction: column;
    padding: 0.5rem 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const {scroll} = useLocomotiveScroll();
  const location = useLocation();

  // Reset menu when location changes
  useEffect(() => {
    setClick(false);
  }, [location]);

  const handleScroll = (selector) => (e) => {
    e.preventDefault();
    setClick(false);

    if (!scroll) {
      console.error('Locomotive Scroll instance not available');
      return;
    }

    // Wait for DOM update before scrolling
    setTimeout(() => {
      const targetElement = document.querySelector(selector);

      if (targetElement) {
        scroll.scrollTo(targetElement, {
          offset: -100,
          duration: 1.5,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      } else {
        console.error(`Element not found: ${selector}`);
      }
    }, 50);
  };

  return (
    <NavContainer
      click={+click}
      initial={{y: `-100%`}}
      animate={{y: 0}}
      transition={{duration: 2, delay: 2}}
    >
      <MenuItems
        drag="y"
        dragConstraints={{top: 0, bottom: 70}}
        dragElastic={0.05}
        dragSnapToOrigin
      >
        <MenuBtn onClick={() => setClick(!click)}>
          <span>{click ? 'CLOSE' : 'MENU'}</span>
        </MenuBtn>
        <Item whileHover={{scale: 1.1, y: -5}} whileTap={{scale: 0.9, y: 0}}>
          <NavLink to="/" onClick={handleScroll('#home')}>
            Home
          </NavLink>
        </Item>
        <Item whileHover={{scale: 1.1, y: -5}} whileTap={{scale: 0.9, y: 0}}>
          <NavLink to="/" onClick={handleScroll('.about')}>
            About
          </NavLink>
        </Item>
        <Item whileHover={{scale: 1.1, y: -5}} whileTap={{scale: 0.9, y: 0}}>
          <NavLink to="/" onClick={handleScroll('#shop')}>
            Shop
          </NavLink>
        </Item>
        <Item whileHover={{scale: 1.1, y: -5}} whileTap={{scale: 0.9, y: 0}}>
          <NavLink to="/" onClick={handleScroll('.holiday')}>
            Destinations
          </NavLink>
        </Item>
        <Item
          whileHover={{scale: 1.1, y: -5}}
          whileTap={{scale: 0.9, y: 0}}
          onClick={() => {
            window.location.href = '/signin';
          }}
        >
          <p>Sign In</p>
        </Item>
      </MenuItems>
    </NavContainer>
  );
};

export default Navbar;
