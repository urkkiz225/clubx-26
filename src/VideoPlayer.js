import { useEffect, useState } from 'react';

let intervalId;
const FRAMERATE = 30;


//shout out react-ambilight package @ https://github.com/brunos3d/video-ambilight !!!! :33 ᓚᘏᗢ
const VideoPlayer = ({url, isMobile, computerIsNarrowScreenXOR}) => {
  const [portrait, setIsPortrait] = useState(false);
  useEffect(() => {
    const canvas = document.getElementById('ambilight');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    function repaintAmbilight() {
      context.drawImage(video,0,0,video.videoWidth,video.videoHeight);
    }
    function startAmbilightRepaint() {
      intervalId = window.setInterval(repaintAmbilight, 1000 / FRAMERATE);
    }
    function stopAmbilightRepaint() {
      clearInterval(intervalId);
    }    
    //ei näitä käytännösä tarvis ku video pyörii loopil ilman kontrollei mut nojaa 
    video.addEventListener('seeked', repaintAmbilight);
    video.addEventListener('load', repaintAmbilight);
    video.addEventListener('play', startAmbilightRepaint);
    video.addEventListener('pause',stopAmbilightRepaint);
    video.addEventListener('ended', stopAmbilightRepaint);
    repaintAmbilight();
    video.currentTime=0;
  }, []);
  useEffect(()=>{
    const portraitHandler = () => {
      setIsPortrait(!(window.screen.orientation.type === 'landscape-primary' 
||    window.screen.orientation.type === 'landscape-secondary'));
      document.getElementById('videoPlayer').style.transform = portrait ? 'scale(0.75)': 'scale(1.25)';
      document.getElementById('videoPlayer').style.maxWidth = portrait ? '500px':'1000px';
    }
    window.screen.orientation.addEventListener('change', portraitHandler);
    portraitHandler();
    return () => {
      window.screen.orientation.removeEventListener('change', portraitHandler);
    };
  }, [portrait])
  //jos ambilight ei toimi testaa refreshaa
  return (
    //kyllästyin positionilla leikkimiseen näissä nii we love 10 stacked wrappers ᓚᘏᗢ
    <div className = "positionWrapper"> 
      <div className="videoWrapper" id = 'videoPlayer' style = {
        isMobile ?
        {
          width: !computerIsNarrowScreenXOR?'max(60vw, 60vh)':'min(80vw, 80vh)',
          top: '-350px',
          marginTop:portrait||computerIsNarrowScreenXOR?'525px':'420px',
          scale:portrait ? 1 : 0.9
          }:{
            width: 'max(60vw, 60vh)',
            scale:0.65, 
            top:'-20%'
          }}>
          <div className="ambilightWrapper">
              <div className="aspectRatio">
                  <video id="video" className='videoPlayer'
                    src = {url}
                    controls = {false}
                    autoPlay
                    muted
                    loop = {true}
                  />
              </div>
              <canvas id="ambilight"></canvas>
          </div>
      </div>
    </div>
  );
};
export default VideoPlayer;