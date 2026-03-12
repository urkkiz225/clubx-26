import { useEffect } from 'react';

let intervalId;
const FRAMERATE = 30;


//shout out react-ambilight package @ https://github.com/brunos3d/video-ambilight !!!! :33
const VideoPlayer = ({url}) => {
  useEffect(() => {
    const canvas = document.getElementById('ambilight');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    function repaintAmbilight() {
      context.drawImage(video,0,0,video.videoWidth,video.videoHeight);
    }
    function startAmbilightRepaint() {
      intervalId = window.setInterval(repaintAmbilight,1000 / FRAMERATE);
    }
    function stopAmbilightRepaint() {
        clearInterval(intervalId);
    }    
    video.addEventListener('seeked', repaintAmbilight);
    video.addEventListener('load', repaintAmbilight);
    video.addEventListener('play', startAmbilightRepaint);
    video.addEventListener('pause',stopAmbilightRepaint);
    video.addEventListener('ended', stopAmbilightRepaint);
    repaintAmbilight();
    video.currentTime=0;
  }, []);
  //jos ambilight ei toimi testaa refreshaa
  return (
    //kyllästyin positionilla leikkimiseen näissä nii we love 10 stacked wrappers
    <div className = "positionWrapper"> 
      <div className="videoWrapper">
          <div className="ambilightWrapper">
              <div className="aspectRatio">
                  <video id="video" className='videoPlayer'
                      src = {url}
                      controls={false}
                      autoPlay
                      muted
                      loop = {true}
                      ></video>
              </div>
              <canvas id="ambilight"></canvas>
          </div>
      </div>
    </div>
  );
};
export default VideoPlayer;