import { useRef } from 'react';
//shoutout framer-motion pkg greatest animation package of all time
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import CurtainLeft from './Assets/curtains_wavy_left2_edited_unblurred_midres.png';
import CurtainRight from './Assets/curtains_wavy_right2_edited_unblurred_midres.png';

const CurtainEffect = ({blurCurtains = true, top = '0'}) => {
  var portrait = window.screen.orientation.type === 'landscape-primary' 
  || window.screen.orientation.type === 'landscape-secondary';
  window.screen.orientation.addEventListener('change', () => {
      portrait = window.screen.orientation.type === 'landscape-primary' 
    || window.screen.orientation.type === 'landscape-secondary';
  });
  //i HATE userefs!!!1!!!!
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target:containerRef, offset:portrait?["15% start","35% start"]:["15% start", "35% start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {stiffness: 100, damping: 30, /*mietin nii pitkään miks kaikki pomppi ku unohin et tää animation method on legit sellane vieterimäine ja arvo oli jossai viides defaulttin :sob:*/
  restDelta: 0.001
});
  const curtainProgressXLeft = useTransform(smoothProgress, [0, 1.75], ['-100%', '0%']); //äähhh menee aivot solmuun krkrääähähh ᓚᘏᗢ
  const curtainProgressXRight = useTransform(smoothProgress, [0, 1.75], ['100%', '0%']);
  const gradientOpacity = useTransform(scrollYProgress, [0,1], [/*opacity -0.2 tuntuu vähän rankalta emt pitäskö tää tehä tälleen :DD*/-0.2,1])
  const curtainBlurRadius = useMotionTemplate`blur(${useTransform(scrollYProgress, [0,0.60 /*note to self väänä tästä napista jos haluut enemmän / vähemmän blurii :3*/], [12,0])}px)`; //huhhuh että framer-motionia on pelottava käyttää onneks on hyvät docsit
  //ᓚᘏᗢ
  return (
    <div ref={containerRef} style={{ height: 'max(150vw, 150vh)', position: 'absolute', width: '100vw', left:0}}>
      <div className='curtainsWrapper'>
        <motion.img 
            className = 'curtain' src={CurtainLeft} style={{x: curtainProgressXLeft, top:'-50px', filter: blurCurtains? curtainBlurRadius: 'none'}} alt = 'coolass curtain left side'
        />
        <motion.img
          className = 'curtain' src={CurtainRight} style = {{x: curtainProgressXRight, top:'-30px', filter: blurCurtains? curtainBlurRadius: 'none'}} alt = 'coolass curtain right side'
        />
        <motion.div className = 'curtainGradient' style = {{opacity:gradientOpacity}}/>
      </div>
    </div>
  );
};

export default CurtainEffect;