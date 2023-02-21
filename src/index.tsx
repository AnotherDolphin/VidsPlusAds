import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import AdStateProvider from './utils/AdContext'
import VideoAdManager from './VideoAdManager'
import { IPlayerHandler, VideoProps } from './utils/interfaces'

interface Props {
  videoSource: string
  adSource?: string
  thumbnail?: string
  height?: number
  width?: number
  fluid?: boolean
  fill?: boolean
  onPlay?: Function
  onPause?: Function
  onLoadedMetaData?: Function
  overlayChild?: React.ReactNode
  adFrequency?: number
  preroll?: boolean
  // ref? : React.Ref<unknown> | undefined
}

function VidsPlusAds(props: Props, ref: React.Ref<IPlayerHandler> | undefined) {
  const videoProps: VideoProps = {
    onReady: () => {},
    options: {
      poster: props.thumbnail,
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: props.fluid ?? false,
      fill: props.fill ?? false,
      height: props.height ?? window.innerHeight,
      width: props.width ?? window.innerWidth,
      sources: [
        {
          // src: process.env.PUBLIC_URL + '/video.mp4',
          src: props.videoSource,
          type: 'video/mp4',
        },
      ],
    },
  }

  const adProps: VideoProps | undefined = props.adSource
    ? {
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
    : undefined

  const configs = { adFrequency: props.adFrequency, preroll: props.preroll }
  const { onPlay, onLoadedMetaData, overlayChild, onPause } = props
  return (
    <>
      <AdStateProvider>
        <VideoAdManager
          {...{ videoProps, adProps, configs, onPlay, onLoadedMetaData, onPause, overlayChild }}
          ref={ref}
        />
      </AdStateProvider>
    </>
  )
}

export default forwardRef(VidsPlusAds)
