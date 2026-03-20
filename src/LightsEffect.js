import React, {useState, useMemo, useRef } from 'react';
//shout out framer-motion pkg greatest animation package of all time
import { motion, useScroll, useTransform, useSpring} from 'framer-motion';
//perkele ku mistää ei löydy commercial use stock kuvii spotlight beameist nii tääki piti tehä ite perkele vittu! ᓚᘏᗢ
import spotLightBeam from './Assets/spotlight_texturedbeam_midres.png';
import clubXLogo from './Assets/header.png';

const LightsEffect = ({isMobile, computerIsNarrowScreenXOR}) => {
  const [portrait, setPortrait] = useState(!(window.screen.orientation.type === 'landscape-primary' 
  || window.screen.orientation.type === 'landscape-secondary'));
  window.screen.orientation.addEventListener('change', () => {
      setPortrait(!(window.screen.orientation.type === 'landscape-primary' 
  || window.screen.orientation.type === 'landscape-secondary'));
  });
  //i STILL HATE userefs!!!1!!!!
  const containerRef = useRef(null);
  const offset = (() => {
    if (isMobile && !computerIsNarrowScreenXOR)
      return portrait 
        ? ["125vw start", "240vw start"] 
        : ["10vw start", "120vw start"];
    if (!computerIsNarrowScreenXOR) 
      return ["20vw start", "145vw start"];
    return ["30vw start", "155vw start"];
    
  })();
  const { scrollYProgress } = useScroll({
    target:containerRef.current, offset: offset
  });
  const smoothProgress = useSpring(scrollYProgress, {stiffness: 250, damping: 40,
  restDelta: 0.001
  });
  const leftLightBeamRot = useTransform(smoothProgress, [0, 0.1, 0.5, 1], [90, 100, 160, 160]);
  const rightLightBeamRot = useTransform(smoothProgress, [0, 0.1, 0.5, 1], [90, 80, 20, 20]);
  const beamOpacity = useTransform(scrollYProgress, [0,0.3], [0,0.5])
  return (
    <div ref={containerRef} style={{ height: 'max(200svw, 200svh)', position: 'absolute', width: '100%', top:!computerIsNarrowScreenXOR ? '0vw': 'max(30vw,30vh)'}}>
      <div className='lightsWrapper' style = {{top:'30vw'}}>
        <motion.img 
          className = 'lightBeamRight' src={spotLightBeam} style={{rotate:rightLightBeamRot, scale:isMobile?('4'):('2'), scaleY:('0.8'), opacity:beamOpacity}} alt = 'light beam right'
        />
        <motion.img 
          className = 'lightBeamLeft' src={spotLightBeam} style={{rotate:leftLightBeamRot, scale:isMobile?('4'):('2'), scaleY:('0.8'), opacity:beamOpacity, left:isMobile?'-99%':'-91%'}} alt = 'light beam left'
        />
        <motion.img
          className = 'spotLightLogo' src = {clubXLogo} style = {{width:isMobile?'55vw':'20vw', bottom:isMobile ?'28%':'52.5%', minWidth:isMobile?'200px':'400px'}}
        />
      </div>
    </div>
  );
};

export default LightsEffect;

//ᓚᘏᗢ