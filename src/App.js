import './App.css';
import VideoPlayer from './VideoPlayer.js';
import HeaderLogo from './Assets/header_underline.png'
import { useEffect, useState } from 'react';

function App() {
    //pöllitty mobile check vahnasta projektista xd
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
            if(isMobileDevice){
                //todo consider constants 4 these
                document.body.style.backgroundSize = "450% auto"
            }else{
                document.body.style.backgroundSize = "auto 66%;"
            }
        };
        const handleResize = () => {
            //kätevä debugaamiseen 
            checkMobile();
        }
        window.addEventListener('resize', handleResize);
        checkMobile();
    });
    /*todo punasta hehkuu noilt reunoilt sit ku toi kuva loppuu*/
  return (
    <div className='App'>
        <header style={{position: "absolute", top: isMobile ? "45vw":"30px", left: "50%", //aikamoista css spagettia mutta ei jaksanu tehä classei näillä paskasti koodatuille positionaamisilla
            transform: "translateX(-50%)", width: "100vw",  
            maxWidth: isMobile ? "100vw" : "650px", display: "flex", justifyContent: "center"}}>
            <img src={HeaderLogo} alt="header shit" style={{width: "100%", height: "auto", display: "block"}}/>
        </header>
      <VideoPlayer id = 'video'
      //lisää process.env.PUBLIC_URL pathii jos haet jotai staticMedia folderista
      url = {process.env.PUBLIC_URL + "/staticMedia/club-x_promo.MOV"}/>
        <h1 style = {{color:'white', top: '1000px', position:'relative'}}> ARTISTS:</h1>
        <h2 style = {{color:'white', position:'relative', /*todo tee näille joku yleinen luokka plz xd*/ maxWidth: isMobile? "80%":"50%", top:'1020px'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. (ja myös juha on soittamassa.):</h2>
    </div>
  );
}



export default App;