import './App.css';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className='App'>
      <ReactPlayer 
        //runaa npm run build ja uudelleenkäynnistä servu npm startil jos pistät staticMediaan mitään uutta ni ei mee sekasi mikää
        src = {process.env.PUBLIC_URL + "/staticMedia/rickastley.mp4"}
        controls={false} 
        width="90%" 
        height="90%"
        playing 
        muted
        config={{
      }}
      />
    </div>
  );
}

export default App;