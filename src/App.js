import './App.css';
import VideoPlayer from './VideoPlayer.js';
import CurtainEffect from './CurtainEffect.js';
import HeaderLogo from './Assets/header_underline.png'
import FilmReelLeft from './Assets/filmreel_left.png';
import FilmReelLeftBilinearFade from './Assets/filmreel_left_bilinear_fade.png';
import FilmReelRight from './Assets/filmreel_right.png';
import FilmReelRightBilinearFade from './Assets/filmreel_right_bilinear_fade.png';
import TelegramLogo from './Assets/HeaderButtons/telegram.svg';
import InstagramLogo from './Assets/HeaderButtons/instagram.svg';
import KideAppLogo from './Assets/HeaderButtons/kide_app.svg';
import JunctionWordmark from './Assets/Sponsors/junction_wordmark.svg';
import Friidu from './Assets/Sponsors/Friidu_Logo_Pink.svg';
import Kaalimato from './Assets/Sponsors/kaalimato_nobg.png';
import { useEffect, useState, useRef } from 'react';
import LightsEffect from './LightsEffect.js';
import GlobeIcon from './Assets/earth-globe-icon.svg';
import i18n from './i18n.js'; //react valittaa tästä mut sitä ei voi poistaa tai kaikki kusee
import { useTranslation } from 'react-i18next';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function App() {
    function formatEqualLengthText(str1, str2) {
        const referenceScreenWidth = isMobile? window.innerWidth + 17.5 : 450;
        const str1Length = str1.length;
        const str2Length = str2.length;
        const bufferRange = clamp((referenceScreenWidth-window.innerWidth)/2.5,0,25);
        const dotsCount = 30-str1Length-str2Length-bufferRange;
        return `${str1}${dotsCount/2>1?` ${". ".repeat(Math.floor(dotsCount/2))}`:': '}${str2}`;
    }
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
        const checkMobile = () => {
            const computerIsNarrowScreen = window.innerWidth < window.screen.width / 1.8;
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice || (window.innerWidth < window.screen.width / 1.8));
            setComputerIsNarrowScreenXOR(!isMobileDevice && computerIsNarrowScreen);
            if(isMobileDevice || (window.innerWidth < window.screen.width / 1.8)){
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
                      <img style = {{padding:'30px'}} onClick={() => openLink("https://kide.app/events/2fac24cc-b49f-4bc9-ac51-f8d72200f1f1")} src={KideAppLogo} alt='kide.app logo' />
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
        <CurtainEffect blurCurtains = {!isMobile} isMobile={isMobile}/>
        <VideoPlayer id = 'video'
            //lisää process.env.PUBLIC_URL pathii jos haet jotai staticMedia folderista
            url = {process.env.PUBLIC_URL + "/staticMedia/club-x_promo.mp4" }
            isMobile = {isMobile}
            computerIsNarrowScreenXOR={computerIsNarrowScreenXOR}
        />
        <LightsEffect isMobile={isMobile} computerIsNarrowScreenXOR = {computerIsNarrowScreenXOR}/>
        {/*seuraavan divin sisälle kaikki joka tulee logon / valonheittimien jälkeen*/}
        {window.innerWidth < window.screen.width / 1.8 ?<div className = 'postCurtainGradient'/>:<></>}
        <div className = 'clubXInfo' style={{position: 'absolute', width: '90%', top:isMobile ? !computerIsNarrowScreenXOR ? '1200px' : '1500px':'80vw'}}>
            <h1>CLUB X 2026</h1>
            <h2>{formatEqualLengthText(t('ticketsale'), t('ticketsalewhen'))}</h2>
            <h2>{formatEqualLengthText(t('when'),t('time'))}</h2>
            <h2>{formatEqualLengthText(t('where'), t('address'))}</h2>
            <h1 style = {{marginTop: '10vw'}}>{t('schedule')}</h1>
            <h2>{formatEqualLengthText(t('doorsopen'), t('doorsopenwhen'))}</h2>
            <h2>{formatEqualLengthText(t('band'), t('bandwhen'))}</h2>
            <h2>{formatEqualLengthText(t('rwbk'), t('rwbkwhen'))}</h2>
            <h2>{formatEqualLengthText(t('isaacsene'), t('isaacsenewhen'))}</h2>
            <h2>{formatEqualLengthText(t('end'), t('endwhen'))}</h2>
            <div style = {{filter:'drop-shadow(3px 2.5px 2.5vw #7f0000) drop-shadow(0px 0px max(5vw, 5vh) #ffffffba) drop-shadow(0px 0px min(13vw, 13vh) #ffffff73)'}}>
                <h2 style = {{marginTop:'10vw', scale:(1.25)}}>{t('wristbandexchange')}</h2>
                <h2 style = {{marginTop:'3vw', scale:(1.25)}}>{t('wristbandexchangewhenwhere')}</h2>
            </div>
            <PosterTextComponent/>
            <div style = {{}} className = 'footer'>
                <div className = 'footerButtons' style={{ marginTop: '150px', paddingBottom: '0px' }}>
                    <img onClick={() => openLink("https://t.me/clubabsolutecinema")} src = {TelegramLogo} alt = 'telegram logo'/>
                    <img onClick={() => openLink("https://www.instagram.com/atheneclubx/")} src = {InstagramLogo} alt = 'instagram logo'/>
                    <img onClick={() => openLink("https://kide.app/events/2fac24cc-b49f-4bc9-ac51-f8d72200f1f1")} src = {KideAppLogo} alt = 'kide.app logo'/>
                </div>
            </div>
            <h1>{t('sponsors')}</h1>
            <div className = 'sponsors' style = {{overflowX:'hidden'}}>
                <img src = {JunctionWordmark} alt = 'Junction wordmark sponsor' loading = "lazy"/> {/*nää kuvat jostai syystä muutamaan otteeseen jämäytti kaiken lataamisen*/}
                <img style = {{scale:(0.625), transform:'translateY(20%)'}} src = {Friidu} alt = 'Friidu logo sponsor' loading = "lazy"/>
                <img style = {{scale:(0.88)}} src = {Kaalimato} alt = 'Kaalimato logo sponsor' loading = "lazy"/>
            </div>
            <img className = 'filmReelBottomLeft' src = {FilmReelLeft} alt = 'footer film reel effect right'/>
            <img style = {{animation: 'moveReel 30s cubic-bezier(.56,.03,.71,.96) infinite'}} className = 'filmReelBottomLeft' src = {FilmReelLeftBilinearFade} alt = 'footer film reel effect right'/>
            <img className = 'filmReelBottomRight' src = {FilmReelRight} alt = 'footer film reel effect right'/>
            <img style = {{animation: 'moveReel 24s cubic-bezier(.56,.03,.71,.96) infinite'}} className = 'filmReelBottomRight' src = {FilmReelRightBilinearFade} alt = 'footer film reel effect right'/>
            {!isMobile || computerIsNarrowScreenXOR ? <div className = 'bottomLinks'><a target="_blank" rel="noopener noreferrer" href = "https://github.com/urkkiz225/clubx-26" style = {{color:"#5f0000"}}>GitHub</a> v{process.env.REACT_APP_VERSION}</div>:<></>}
        </div>
    </div>
  );
}
export default App;

const PosterTextComponent = () =>{
    const smallFontSize = '2.7vw';
    const medFontSize = '3.5vw';
    return (
<div style={{transform: 'scale(1.5)', filter: 'drop-shadow(3px 2.5px 50px #5200005d)'}}>
    <div className="sth2s" style={{marginTop: '12.5vw' }}>ONLY IN OTANIEMI</div>
    <div className="sth2l">APRIL 2<span style={{fontSize: smallFontSize}}> AT </span>BMK3</div>
    <div className="sth2" style={{marginTop: '3vw'}}>ATHENE <span style={{ fontSize: smallFontSize}}>PRESENTS</span></div>
    <div className="sth2">"CLUB ABSOLUTE CINEMA"<span style={{fontSize: smallFontSize}}> STARRING </span>ISAAC SENE</div>
    <div className="sth2s">DIRECTED BY<span style={{fontSize: medFontSize}}> PHUKSIT'25</span></div>
    <div className="sth2s">DRESS CODE<span style={{fontSize: medFontSize}}> "MAIN CHARACTER"</span></div>
    <div className="sth2s">JOIN THE CAST<span style={{fontSize: medFontSize}}> TELEGRAM @CLUBABSOLUTECINEMA</span></div>
    <div className="sth2s">FOLLOW THE PREMIERE<span style={{fontSize: medFontSize}}> INSTAGRAM @ATHENECLUBX</span></div>
</div>
    )
}

/*

₍^. .^₎⟆     ᓚᘏᗢ
 U  U

 */

 //TODO löydätkö muista tiedostoista kaikki kuusi "ᓚᘏᗢ" -kissaa?