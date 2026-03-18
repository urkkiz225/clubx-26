import './App.css';
import VideoPlayer from './VideoPlayer.js';
import CurtainEffect from './CurtainEffect.js';
import HeaderLogo from './Assets/header_underline.png'
import TelegramLogo from './Assets/HeaderButtons/telegram.svg';
import InstagramLogo from './Assets/HeaderButtons/instagram.svg';
import KideAppLogo from './Assets/HeaderButtons/kide_app.svg';
import JunctionWordmark from './Assets/Sponsors/junction_wordmark.svg';
//import JunctionEmblem from './Assets/Sponsors/junction_emblem.svg';
import Friidu from './Assets/Sponsors/Friidu_Logo_Pink.svg';
import Kaalimato from './Assets/Sponsors/kaalimato_nobg.png';
import { useEffect, useState } from 'react';
import LightsEffect from './LightsEffect.js';
/*jshint -W106 */
import i18n from './i18n.js';
/*jshint +W106 */
import { useTranslation } from 'react-i18next';


function App() {
    const {t, i18n} = useTranslation();
    const [activeButton, setActiveButton] = useState(() => {
        return localStorage.getItem('websiteLang') || 'fi';
    });
    const changeLanguage = (lang, buttonPressed) =>{
        i18n.changeLanguage(lang)
        setActiveButton(buttonPressed);
    }
    const openLink = (url) => {
        window.open(url, '_blank');    }
    const [isMobile, setIsMobile] = useState(false);
    const [computerIsNarrowScreenXOR, setComputerIsNarrowScreenXOR] = useState(false); //XOR jos viewport on tosi kapee mut käyttäjä ei oo mobiilil
    useEffect(()=>{
        //varotuksen sana joka sekotti pariin kertaan jos pistät inspectorista mobile viewn päälle ja sit pois nii background tulee olee fucked up
        const checkMobile = () => {
            const computerIsNarrowScreen = window.innerWidth < 850;
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice || (window.innerWidth < 850));
            setComputerIsNarrowScreenXOR(!isMobileDevice && computerIsNarrowScreen);
            if(isMobileDevice || (window.innerWidth < 850)){
                document.body.style.backgroundSize = "min(350svw, 350svh)" /*pistää vaakasuunnanki mobiililla toimimaan*/
            }else{
                document.body.style.backgroundSize = "116svw"
            }
        };
        const handleResize = () => {
            checkMobile();
        }
        window.addEventListener('resize', handleResize);
        checkMobile();
    }, []);
    useEffect(()=>{
        localStorage.setItem('websiteLang', activeButton);
        i18n.changeLanguage(activeButton);
    }, [activeButton]);
  return (
    <div className='App'>
        {isMobile 
            ? (<header className = 'headerMobile'></header>)
            :
            <header className='headerDesktopLeft'>
                  <div className='headerButtons'>
                      <img onClick={() => openLink("https://t.me/clubabsolutecinema")} src={TelegramLogo} alt='telegram logo' />
                      <img onClick={() => openLink("https://www.instagram.com/atheneclubx/")} src={InstagramLogo} alt='instagram logo' />
                      <img onClick={() => openLink("https://www.google.com/search?q=how+to+troll+your+website+users")} src={KideAppLogo} alt='kide.app logo' />
                </div>
            </header>
        }
        <header className = 'headerDesktopRight' style = {{opacity:isMobile?(0.75):(1)}}>
            <div className = 'headerButtons'>
                {/*todo constantit button keylle*/}
                <button className = {activeButton.toLowerCase() === 'fi' ? 'activeHeaderButton':''} onClick={(e) => changeLanguage('fi', 'fi')} alt = 'finnish language toggle'>FI</button>
                <button className = {activeButton.toLowerCase() === 'en' ? 'activeHeaderButton':''} onClick={(e) => changeLanguage('en', 'en')} alt = 'english language toggle'>EN</button>
            </div>
        </header>
        <header className = "headerImage" style={{marginTop:'100px', top: isMobile ? "min(30svw:-300px)":"-2rem",
            maxWidth: isMobile ? "100svh" : "40vw"}}>
            <img src={HeaderLogo} alt="header mobiili" style={{width: "100%", height: "auto", display: "block"}}/>
        </header>
        <CurtainEffect blurCurtains = {!isMobile}/>
        <VideoPlayer id = 'video'
            //lisää process.env.PUBLIC_URL pathii jos haet jotai staticMedia folderista
            url = {process.env.PUBLIC_URL + "/staticMedia/club-x_promo.MOV" }
            isMobile = {isMobile}
            computerIsNarrowScreenXOR={computerIsNarrowScreenXOR}
        />
        <LightsEffect isMobile={isMobile} computerIsNarrowScreenXOR = {computerIsNarrowScreenXOR}/>
        {/*seuraavan divin sisälle kaikki joka tulee logon / valonheittimien jälkeen*/}
        <div className = 'clubXInfo' style={{position: 'absolute', width: '100%', top:isMobile ? !computerIsNarrowScreenXOR ? '1500px' : '2000px':'140vw'}}>
            <h1>CLUB X 2026</h1>
            <h2>
                {t('welcome')}
            </h2>
            <h1 style = {{marginTop: '10vw'}}>{t('artistsheader')}</h1>
            <h2>
                {t('artists')}
            </h2>
            <div className = 'footer'>
                <div className = 'footerButtons' style={{ marginTop: '50px', paddingBottom: '20px' }}>
                    <img onClick={() => openLink("https://t.me/clubabsolutecinema")} src = {TelegramLogo} alt = 'telegram logo'/>
                    <img onClick={() => openLink("https://www.instagram.com/atheneclubx/")} src = {InstagramLogo} alt = 'instagram logo'/>
                    <img onClick={() => openLink("https://www.google.com/search?q=how+to+troll+your+website+users")} src = {KideAppLogo} alt = 'kide.app logo'/>
                </div>
            </div>
            <h1>{t('sponsors')}</h1>
            <div className = 'sponsors' style ={{overflowX:'hidden'}}>
                <img src = {JunctionWordmark} alt = 'Junction wordmark sponsor'/>
                <img style = {{scale:(0.625)}} src = {Friidu} alt = 'Friidu logo sponsor'/>
                <img style = {{scale:(1)}} src = {Kaalimato} alt = 'Kaalimato logo sponsor'/>
            </div>
        </div>
    </div>
  );
}
export default App;

/*

₍^. .^₎⟆     ᓚᘏᗢ
 U  U

 */

 //TODO löydätkö muista tiedostoista kaikki kuusi "ᓚᘏᗢ" -kissaa?