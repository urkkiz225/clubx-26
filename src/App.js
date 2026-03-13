import './App.css';
import VideoPlayer from './VideoPlayer.js';
import CurtainEffect from './CurtainEffect.js';
import HeaderLogo from './Assets/header_underline.png'
import { useEffect, useState } from 'react';


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
                document.body.style.backgroundSize = "auto 66%;"
            }
        };
        const handleResize = () => {
            //kätevä debugaamiseen (varsinki jos se toimis takasin konekokoon mentäes)
            checkMobile();
        }
        window.addEventListener('resize', handleResize);
        checkMobile();
    });
    /*todo punasta hehkuu noilt reunoilt sit ku toi kuva loppuu*/
  return (
    <div className='App'>
        {isMobile ? (<header className = 'headerMobile'></header>):""}
        <header className = "headerImage" style={{marginTop:'100px', top: isMobile ? "min(30svw:-300px)":"-2rem",
            maxWidth: isMobile ? "100svh" : "40vw"}}>
            <img src={HeaderLogo} alt="header hedari" style={{width: "100%", height: "auto", display: "block"}}/>
        </header>
        {/*TODO mieti sopiiks tää mobiilille vai ei.*/}
        (<CurtainEffect blurCurtains = {!isMobile}/>)
      <VideoPlayer id = 'video'
        //lisää process.env.PUBLIC_URL pathii jos haet jotai staticMedia folderista
        url = {process.env.PUBLIC_URL + "/staticMedia/club-x_promo.MOV" }
        isMobile = {isMobile}
      />
        {/*todo fix mobile bg scaling (ipad for example)*/}
        <div style = {{
            /*todo siirrä tää css:ään*/
            color:'white', 
            display:'flex',
            flexDirection:'column', 
            justifyContent: 'center', 
            alignItems:'center', 
            textAlign:'center', 
            top: isMobile ? '300px' : '70vw' /*alkaa vähän epäilyttää näin monet mobiilicheckit hmm aijai*/,
            position:'relative',
            zIndex:'3',
            maxWidth: '80%',
            margin: '7.5vw'}}>
            <h1>CLUB X 2026</h1>
            <h2>
                Tervetuloa Otaniemen tällä kertaa OIKEASTI haippisimpaan opiskelijatapahtumaan, 
                nimittäin Athenen vuosittaisiin fuksijuhliin Club X:ään, jonka teemana on tänä vuonna Club ABSOLUTE CINEMA!
                Pukeudu siis oman elämän elokuvasti main characteriksi ja dominoi iltaa upeassa seurassa 2.4. osoitteessa Betonimiehenkuja 3!
            </h2>
            <h1 style = {{marginTop: '10vw'}}>ARTISTIT JA ESIINTYJÄT</h1>
            <h2>
                Illan upeina esiintyjinä on, öö, ATK!!!!!! ja kanssa öö RETUPERÄN BEEWEEKOO!! joo!! Kanssa lisää mysteerihenkilöitä...
            </h2>
            <h1 style = {{marginTop: '10vw'}}>AIKATAULU</h1>
            <h2>
                Klo 13: startti
                Klo 15: Välipala ja leikkiaika
                Klo 18: Pilkku
            </h2>
            <h1 style = {{marginTop: '10vw'}}>öö emt joku Athenes common principles</h1>
            <h2>
                At the event we aim to create a safer space for everyone and don't tolerate any kind of harassment or discrimination. If you experience or notice this kind of behaviour, please contact the staff immediately.
                Our harassment contact persons Matti and Maija will be present at the party and can also be reached via tg: @MattiMeikalainen and @MaijaMeikalainen
            </h2>
            <h1 style = {{marginTop: '10vw'}}>SPONSORS</h1>
            <h2>
                öö joo sponsoreita tänne visio?
            </h2>
            <h2>
                sit kans jonneki näitä
            </h2>
        </div>
    </div>
  );
}
export default App;

//mm nn gojira...