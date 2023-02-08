import React from 'react'
import AdStateProvider from './utils/AdContext'
import VideoAdManager from './VideoAdManager'
import { VideoProps } from './utils/interfaces'

interface Props {
  adFrequency?: number
  videoSource: string
  adSource?: string
  preroll?: boolean
  thumbnail?: string
  height?: number,
  width?: number
  fluid?: boolean
  fill?: boolean
}

function VidsPlusAds(props: Props) {
  const videoProps: VideoProps = {
    onReady: () => {},
    options: {
      poster: props.thumbnail,
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: props.fluid?? false,
      fill: props.fill?? false,
      height: props.height?? window.innerHeight,
      width: props.width?? window.innerWidth,
      sources: [
        {
          // src: process.env.PUBLIC_URL + '/video.mp4',
          src: props.videoSource,
          type: 'video/mp4',
        },
      ],
    },
  }

  const adProps: VideoProps | undefined = props.adSource? {
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
  }: undefined

  const configs = { adFrequency: props.adFrequency, preroll: props.preroll }

  return (
    <>
      <AdStateProvider>
        <VideoAdManager {...{ videoProps, adProps, configs }} />
      </AdStateProvider>
    </>
  )
}

export default VidsPlusAds
