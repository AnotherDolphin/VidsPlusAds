import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import VidsPlusAds from '../src'
import { IPlayerHandler } from '../src/utils/interfaces'

const App = () => {
  const playerRef = React.useRef<IPlayerHandler | undefined>(undefined)
  const options = {
    // adSource: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoSource:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    adFrequency: 3000,
    preroll: true,
    onPlay: () => {
      console.log('onPlay')
    },
    onLoadedMetaData: () => {
      console.log(playerRef.current?.duration())
      // console.log('wer')
    },
    // fluid: true,
    fill: true,
  }

  return (
    <div>
      <div style={{height: 200, width:200}}>
        <VidsPlusAds {...options} ref={playerRef} />
      </div>
      <button
        onClick={() => {
          playerRef.current?.togglePlay()
          console.log(playerRef.current?.currentTime())
        }}
      >
        Play
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
