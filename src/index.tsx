import React from 'react'
import AdStateProvider from './utils/AdContext'
import VideoAdManager from './VideoAdManager'
import { VideoProps } from './utils/interfaces'

interface Props {
  adFrequency: number
  videoSource: string
  adSource: string
  preroll?: boolean
  thumbnail?: string
}

function VidsPlusAds(props: Props) {
  const adProps: VideoProps = {
    onReady: () => {},
    options: {
      fluid: false,
      autoplay: true,
      muted: false,
      controls: false,
      sources: [
        {
          src: props.adSource,
          type: 'video/mp4',
        },
      ],
    },
  }

  const videoProps: VideoProps = {
    onReady: () => {},
    options: {
      poster: props.thumbnail,
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      height: window.innerHeight,
      sources: [
        {
          // src: process.env.PUBLIC_URL + '/video.mp4',
          src: props.videoSource,
          type: 'video/mp4',
        },
      ],
    },
  }

  const configs = { adFrequency: props.adFrequency, preroll: props.preroll }

  return (
    <div>
      <AdStateProvider>
        <VideoAdManager {...{ videoProps, adProps, configs }} />
      </AdStateProvider>
    </div>
  )
}

export default VidsPlusAds
