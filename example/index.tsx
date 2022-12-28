import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VidsPlusAds from '../src';

const App = () => {
  const options = {
    adSource: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoSource: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    adFrequency: 3000,
    preroll: true
  }

  return (
    <div>
      <VidsPlusAds {...options} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
