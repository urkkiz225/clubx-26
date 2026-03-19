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
import { useEffect, useState, useRef } from 'react';
import LightsEffect from './LightsEffect.js';
import GlobeIcon from './Assets/earth-globe-icon.svg';
import i18n from './i18n.js';
import { useTranslation } from 'react-i18next';

function App() {
    const [isLangButtonPressed, setIsLangButtonPressed] = useState(false); //mobiilibuttoni
    const toggleMobileLangButton = () => setIsLangButtonPressed(prev => !prev); 
    const unclickMobileLangButton = () => setIsLangButtonPressed(false);
    const {t, i18n} = useTranslation();
    const [activeButton, setActiveButton] = useState(() => {
        return localStorage.getItem('websiteLang') || 'fi';
    });
    const changeLanguage = (lang, buttonPressed) => {
        i18n.changeLanguage(lang)
        setActiveButton(buttonPressed);
    }
    const openLink = (url) => {
        window.open(url, '_blank');
    }
    const [isMobile, setIsMobile] = useState(false);
    const [computerIsNarrowScreenXOR, setComputerIsNarrowScreenXOR] = useState(false); //XOR jos viewport on tosi kapee mut käyttäjä ei oo mobiilil
    const imgRef = useRef(null);
    useEffect(()=>{
        //varotuksen sana joka sekotti pariin kertaan jos pistät inspectorista mobile viewn päälle ja sit pois nii background tulee olee fucked up
        const checkMobile = () => {
            const computerIsNarrowScreen = window.innerWidth < 850;
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice || (window.innerWidth < 850));
            setComputerIsNarrowScreenXOR(!isMobileDevice && computerIsNarrowScreen);
            if(isMobileDevice || (window.innerWidth < 850)){
                document.body.style.backgroundSize = "min(350svw, 350svh)"; /*pistää vaakasuunnanki mobiililla toimimaan*/
            }else{
                document.body.style.backgroundSize = "116svw";
            }
        };
        const handleResize = () => {
            checkMobile();
        }
        window.addEventListener('resize', handleResize);
        checkMobile();
        //image:hover ei toiminu mobiililla nii go go gadget overcompllicated clicked outside of image area checker :,)
        const checkClickOutside = (event) => {
            if (imgRef.current && !imgRef.current.contains(event.target)) {
                unclickMobileLangButton();
            }
        };
        document.addEventListener('mousedown', checkClickOutside);
        return () => document.removeEventListener('mousedown', checkClickOutside);
    }, []);
    useEffect(()=>{
        localStorage.setItem('websiteLang', activeButton);
        i18n.changeLanguage(activeButton);
    }, [activeButton, i18n]);
    useEffect(()=>{
    }, [isLangButtonPressed]);
  return (
    <div className='App'>
        {isMobile 
            ? 
            <>
            {/*käytin tähän nappiin siis legit ihan liikaa aikaa*/}
            <header className = 'headerMobileRight'>
                <div className = 'headerButtons'>
                    <div className = {isLangButtonPressed ? 'visible':'invisible'}>
                        <button className = {activeButton.toLowerCase() === 'fi' ? 'activeHeaderButton':''} onClick={() => changeLanguage('fi', 'fi')} alt = 'finnish language toggle'>FI</button>
                        <button className = {activeButton.toLowerCase() === 'en' ? 'activeHeaderButton':''} onClick={() => changeLanguage('en', 'en')} alt = 'english language toggle'>EN</button>
                    </div>
                    <img
                        ref = {imgRef}
                        style = {{scale:(1.25), 
                            filter:!isLangButtonPressed?'drop-shadow(0px 3px 5px #ffffff67)'/*67 😂*/:'revert-layer', 
                            animation:isLangButtonPressed?'spin 3s cubic-bezier(.7,.29,.76,1.1) infinite':'',
                            width:'6.5vw', 
                            height:'6.5vw'
                        }}
                        onClick = {toggleMobileLangButton}
                        src = {GlobeIcon} alt = 'Language selection globe button'>
                    </img>
                </div>
            </header>
            </>
            :
            <>
            <header className='headerDesktopLeft'>
                  <div className='headerButtons'>
                      <img style = {{padding:'30px'}} onClick={() => openLink("https://t.me/clubabsolutecinema")} src={TelegramLogo} alt='telegram logo' />
                      <img style = {{padding:'30px'}} onClick={() => openLink("https://www.instagram.com/atheneclubx/")} src={InstagramLogo} alt='instagram logo' />
                      <img style = {{padding:'30px'}} onClick={() => openLink("https://kide.app/")} src={KideAppLogo} alt='kide.app logo' />
                </div>
            </header>
            <header className = 'headerDesktopRight'>
                <div className = 'headerButtons'>
                    {/*todo constantit button keylle*/}
                    <button className = {activeButton.toLowerCase() === 'fi' ? 'activeHeaderButton':''} onClick={() => changeLanguage('fi', 'fi')} alt = 'finnish language toggle'>FI</button>
                    <button className = {activeButton.toLowerCase() === 'en' ? 'activeHeaderButton':''} onClick={() => changeLanguage('en', 'en')} alt = 'english language toggle'>EN</button>
                </div>
            </header>
            </>
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
            computerIsNarrowScreenXOR={computerIsNarrowScreenXOR}
        />
        <LightsEffect isMobile={isMobile} computerIsNarrowScreenXOR = {computerIsNarrowScreenXOR}/>
        {/*seuraavan divin sisälle kaikki joka tulee logon / valonheittimien jälkeen*/}
        <div className = 'clubXInfo' style={{position: 'absolute', width: '100%', top:isMobile ? !computerIsNarrowScreenXOR ? '1500px' : '1200px':'80vw'}}>
            {/*TODO mobiiilikoossa toimiva tää, esim. automaattinen pisteiden välistä poistaja*/}
            <h2>{isMobile?"tää teksti ei atm toimi mobiililla korjaan sen pikimmiten xd":""}</h2>
            <h1>CLUB X 2026</h1>
            <h2>LIPUNMYYNTI . . . . . . . . . . . PIAN!!?</h2>
            <h2>AIKA . . . . . . . . . . . . . . . 4.2. @ 20:00</h2>
            <h2>PAIKKA . . . . . . . . . . . . . . . . . . BMK3</h2>
            <h1 style = {{marginTop: '10vw'}}>{t('schedule')}</h1>
            <h2>DOORS OPEN . . . . . . . . . . . . . . . . . . . . . 20.00</h2>
            <h2>YLLÄTYSBÄNDI . . . . . . . . . . . . . . . . . . . . 22.00</h2>
            <h2>PALOKUNTA . . . . . . . . . . . . . . . . . . . . . . . 23.45</h2>
            <h2>ISAAC SENE  . . . . . . . . . . . . . . . . . . . . . . . 00.20</h2>
            <h2>PILKKU  . . . . . . . . . . . . . . . . . . . . . . . . . . 02.00</h2>
            <div className = 'footer'>
                <div className = 'footerButtons' style={{ marginTop: '50px', paddingBottom: '20px' }}>
                    <img onClick={() => openLink("https://t.me/clubabsolutecinema")} src = {TelegramLogo} alt = 'telegram logo'/>
                    <img onClick={() => openLink("https://www.instagram.com/atheneclubx/")} src = {InstagramLogo} alt = 'instagram logo'/>
                    <img onClick={() => openLink("https://kide.app/")} src = {KideAppLogo} alt = 'kide.app logo'/>
                </div>
            </div>
            <h1>{t('sponsors')}</h1>
            <div className = 'sponsors' style = {{overflowX:'hidden'}}>
                <img src = {JunctionWordmark} alt = 'Junction wordmark sponsor'/>
                <img style = {{scale:(0.625)}} src = {Friidu} alt = 'Friidu logo sponsor'/>
                <img style = {{scale:(0.88)}} src = {Kaalimato} alt = 'Kaalimato logo sponsor'/>
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