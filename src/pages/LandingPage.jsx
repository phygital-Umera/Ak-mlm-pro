// import React, {useState, useEffect} from 'react';
// import {
//   Navbar,
//   Hero,
//   FAQPage,
//   Contact,
//   Footer,
// } from '@/components/LandingComponents';
// const Banner = React.lazy(
//   () => import('@/components/LandingComponents/Banner'),
// );
// import Products from '@/components/LandingComponents/Products';
// import Trial from '@/components/LandingComponents/Trial';
// import VisionMission from '@/components/LandingComponents/VisionMission';
// import {Element} from 'react-scroll';
// import '@/assets/css/loader.css';
// import BenefitsSection from '@/components/website/Benefits';
// import HeroSection from '@/components/website/HeroSection';
// import PackagePage from '@/components/website/PackagePage';
// import ExpertReviews from '@/components/website/Review';
// import SecondPage from '@/components/website/Secondpage';
// import ResultFooter from '@/components/website/Result';
// import SigmaFooter from '@/components/website/Footer';
// import Header from '@/components/HomePage/Header';
// import Bottombar from '@/components/website/Bottombar';

// const LandingPage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <Header />
//       <HeroSection />
//       {/* <Bottombar /> */}
//       <SecondPage />
//       <PackagePage />
//       <BenefitsSection />
//       <ExpertReviews />
//       <ResultFooter />
//       <SigmaFooter />
//     </>
//   );
// };

// export default LandingPage;

import React from 'react';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import {dark} from '../styles/Themes';
import {LocomotiveScrollProvider} from 'react-locomotive-scroll';
import {useRef} from 'react';
import Home from '../sections/Home';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import {AnimatePresence} from 'framer-motion';
import About from '../sections/About';
import Shop from '../sections/Shop';
import ScrollTriggerProxy from '../components/newweb/ScrollTriggerProxy';
import Banner from '../sections/Banner';
import Footer from '../sections/Footer';
import Loader from '../components/newweb/Loader';
import {useState} from 'react';
import {useEffect} from 'react';
import Directors from '../sections/Directors';
import Holidays from '../sections/Holidays';

function App() {
  const containerRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          {loaded ? null : <Loader />}
          <ScrollTriggerProxy />
          <AnimatePresence>
            <main className="App" data-scroll-container ref={containerRef}>
              <Home />
              <div style={{height: '5rem'}} />
              <About />
              <div style={{height: '5rem'}} />
              <Directors />
              <Shop />
              <Banner />
              {/* <NewArrival /> */}
              <Holidays />
              <Footer />
            </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
