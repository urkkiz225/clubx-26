import './App.css';
import VideoPlayer from './VideoPlayer.js';
import CurtainEffect from './CurtainEffect.js';
import HeaderLogo from './Assets/header_underline.png'
import TelegramLogo from './Assets/HeaderButtons/telegram.svg';
import InstagramLogo from './Assets/HeaderButtons/instagram.svg';
import KideAppLogo from './Assets/HeaderButtons/kide_app.svg';

import { useEffect, useState } from 'react';
import LightsEffect from './LightsEffect.js';


function App() {
    //pöllitty mobile check vahnasta projektista xd
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        //varotuksen sana joka sekotti pariin kertaan jos pistät inspectorista mobile viewn päälle ja sit pois nii background tulee olee fucked up
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
            if(isMobileDevice){
                //todo consider constants 4 these
                document.body.style.backgroundSize = "min(350svw, 350svh)" /*pistää vaakasuunnanki mobiililla toimimaan*/
            }else{
                /*todo jotai hienoi juttui taustakuvaan joka saa näyttää "valkokankaan" enemmän valkokankaalta*/
                document.body.style.backgroundSize = "116svw"
            }
        };
        const handleResize = () => {
            //kätevä debugaamiseen (varsinki jos se toimis takasin konekokoon mentäes)
            checkMobile();
        }
        window.addEventListener('resize', handleResize);
        checkMobile();
    }, []);
    /*todo punasta hehkuu noilt reunoilt sit ku toi kuva loppuu*/ //TODO kaks mieti vielä tätä
  return (
    <div className='App'>
        {isMobile 
            ? (<header className = 'headerMobile'></header>)
            : <header className = 'headerDesktop'>
                <div className = 'headerButtons'>
                    <img src = {TelegramLogo} alt = 'telegram logo'/>
                    <img src = {InstagramLogo} alt = 'instagram logo'/>
                    <img src = {KideAppLogo} alt = 'kide.app logo'/>
                </div>
            </header>
        }
        <header className = "headerImage" style={{marginTop:'100px', top: isMobile ? "min(30svw:-300px)":"-2rem",
            maxWidth: isMobile ? "100svh" : "40vw"}}>
            <img src={HeaderLogo} alt="header mobiili" style={{width: "100%", height: "auto", display: "block"}}/>
        </header>
        <CurtainEffect blurCurtains = {!isMobile}/>
        <VideoPlayer id = 'video'
            //lisää process.env.PUBLIC_URL pathii jos haet jotai staticMedia folderista
            url = {process.env.PUBLIC_URL + "/staticMedia/club-x_promo.MOV" }
            isMobile = {isMobile}
        />
        <LightsEffect isMobile={isMobile}/>
        <div className = 'infoText' style={{ height: 'max(300svw, 300svh)', position: 'absolute', width: '100%', top:isMobile?'500px':'200px'}}>
            <h1>CLUB X 2026</h1>
            <h2>
                flexbox -esimerkki
            </h2>
            <h1 style = {{marginTop: '10vw'}}>ARTISTIT JA ESIINTYJÄT</h1>
            <h2>
                They call me the UX designer kylteri the way i make and stack my lorem ipsum dolors 😈
            </h2>
            <div className = 'footer'>
                <div className = 'footerButtons' style={{ marginTop: '50px', paddingBottom: '20px' }}>
                    <img src = {TelegramLogo} alt = 'telegram logo'/>
                    <img src = {InstagramLogo} alt = 'instagram logo'/>
                    <img src = {KideAppLogo} alt = 'kide.app logo'/>
                </div>
            </div>
        </div>
    </div>
  );
}
export default App;

//mm nn gojira...

/*

₍^. .^₎⟆     ᓚᘏᗢ
 U  U

 */

 //TODO löydätkö muista tiedostoista kaikki kuusi "ᓚᘏᗢ" -kissaa?