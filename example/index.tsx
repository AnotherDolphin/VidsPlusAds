import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VidsPlusAds from '../src';

const App = () => {
  const playerRef = React.useRef<any>(undefined)
  const options = {
    // adSource: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoSource: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    adFrequency: 3000,
    preroll: true
  }

  return (
    <div>
      <VidsPlusAds {...options} ref={playerRef}/>
      <button onClick={() => playerRef.current?.pause()}>Play</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
