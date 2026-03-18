import React, { useRef } from 'react';
//shout out framer-motion pkg greatest animation package of all time
import { motion, useScroll, useTransform, useSpring} from 'framer-motion';
//perkele ku mistää ei löydy commercial use stock kuvii spotlight beameist nii tääki piti tehä ite perkele vittu! ᓚᘏᗢ
import spotLightBeam from './Assets/spotlight_texturedbeam_midres.png';
import clubXLogo from './Assets/header.png';

const LightsEffect = ({isMobile, computerIsNarrowScreenXOR}) => {
  var portrait = !( window.screen.orientation.type === 'landscape-primary' 
  || window.screen.orientation.type === 'landscape-secondary');
  window.screen.orientation.addEventListener('change', () => {
      portrait = !(window.screen.orientation.type === 'landscape-primary' 
    || window.screen.orientation.type === 'landscape-secondary');
  });
  //i STILL HATE userefs!!!1!!!!
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target:containerRef.current, offset: (isMobile && !computerIsNarrowScreenXOR)
      ?(portrait?["50vh start","130vh start"]
      :["35vh start","120vh start"])
      :!computerIsNarrowScreenXOR 
      ?["40vw start","130vw start"]
      :["10vh start","130vh start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {stiffness: 250, damping: 40,
  restDelta: 0.001
});
  const leftLightBeamRot = useTransform(smoothProgress, [0, 0.1, 0.5, 1], [90, 100, 160, 160]);
  const rightLightBeamRot = useTransform(smoothProgress, [0, 0.1, 0.5, 1], [90, 80, 20, 20]);
  const beamOpacity = useTransform(scrollYProgress, [0,0.3], [0,0.5])
  return (
    <div ref={containerRef} style={{ height: 'max(300svw, 300svh)', position: 'absolute', width: '100%', top:!computerIsNarrowScreenXOR ? '0vw': '40vw'}}>
      <div className='lightsWrapper' style = {{top:'10vw'}}>
        <motion.img 
          className = 'lightBeamRight' src={spotLightBeam} style={{rotate:rightLightBeamRot, scale:isMobile?('4'):('2'), scaleY:('0.8'), opacity:beamOpacity}} alt = 'light beam right'
        />
        <motion.img 
          className = 'lightBeamLeft' src={spotLightBeam} style={{rotate:leftLightBeamRot, scale:isMobile?('4'):('2'), scaleY:('0.8'), opacity:beamOpacity, left:isMobile?'-99%':'-91%'}} alt = 'light beam left'
        />
        <motion.img
          className = 'spotLightLogo' src = {clubXLogo} style = {{width:isMobile?'55vw':'20vw', bottom:isMobile ?'58%':'68.5%', minWidth:isMobile?'200px':'400px'}}
        />
      </div>
    </div>
  );
};

export default LightsEffect;

//ᓚᘏᗢ