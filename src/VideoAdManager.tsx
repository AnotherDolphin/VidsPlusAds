import React, { forwardRef, useImperativeHandle } from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { AdEvents, AdStateContext } from './utils/AdContext'
import { VideoProps } from './utils/interfaces'
import { VideoAdHOC } from './VideoAdHOC'
import VideoJS from './VideoJS'

interface Props {
  videoProps: VideoProps
  adProps?: VideoProps
  configs: {
    preroll?: boolean
    adFrequency?: number
  }
}

const VideoAdManager = ({ videoProps, adProps, configs }: Props, ref: React.Ref<unknown> | undefined) => {
  const videoRef = useRef<VideoJsPlayer | null>(null)
  const adRef = useRef<VideoJsPlayer | null>(null)

  useImperativeHandle(ref, () => {
    return {
      play: () => {
        videoRef.current?.play()
      },
      pause: () => {
        videoRef.current?.pause()
      },
    }
  })

  const [currentTime, setCurrentTime] = useState(-1)
  const [rerunWindow, setRerunWindow] = useState(configs.adFrequency)
  const [adPreroll, setAdPreroll] = useState(configs.preroll ?? true)
  const { adState, dispatchAdState } = useContext(AdStateContext)

  const videoPlayerReady = (player: VideoJsPlayer) => {
    videoProps.onReady()
    videoRef.current = player
    if (adState.lastEvent == AdEvents.Ended) {
      player.play()
    }
    player.on('play', () => {
      setCurrentTime(0)
    })
  }

  const adPlayerReady = (player: VideoJsPlayer) => {
    if (adProps == undefined) return
    adProps.onReady()
    adRef.current = player
    // overlay elements
    let playingAd = document.createElement('div')
    playingAd.innerHTML = `<p class="playing-ad">playing ad ... </p>`
    player.el().appendChild(playingAd)
    let skipAdButton = document.createElement('div')
    skipAdButton.innerHTML = `<button class="skip-ad">Skip</button>`
    skipAdButton.onclick = () => {
      dispatchAdState(AdEvents.Ended)
    }
    player.el().appendChild(skipAdButton)
    // ad run settings
    player.playbackRate(3)
    player.on('dispose', () => {
      videojs.log('ad will dispose')
    })
    player.on('ended', () => {
      videojs.log('player will ended')
      dispatchAdState(AdEvents.Ended)
      player.dispose()
    })
  }

  useEffect(() => {
    if (!adProps || currentTime == -1) return
    switch (adState.lastEvent) {
      case AdEvents.DidNotPlay:
        if (adPreroll) {
          videoRef.current?.pause()
          dispatchAdState(AdEvents.Playing)
        } else if (!adPreroll)
          setTimeout(() => {
            dispatchAdState(AdEvents.Playing)
          }, rerunWindow)
        break
      case AdEvents.Ended:
        const player = videoRef.current
        const current = player?.currentTime() ?? 1
        player?.currentTime(current - 1)
        player?.play()
        setTimeout(function() {
          dispatchAdState(AdEvents.Playing)
        }, rerunWindow)
        break
    }
  }, [adState.lastEvent, currentTime])

  return (
    <div className="screen">
      <VideoJS
        // key={adState.lastEvent}
        options={videoProps.options}
        onReady={videoPlayerReady}
      />
      {adProps && adState.lastEvent == AdEvents.Playing && (
        <VideoAdHOC
          options={adProps.options}
          onReady={adPlayerReady}
          className="ad"
        />
      )}
      {/* <div className="settings">
        <label>
          Ad Run Frequency:
          <input
            type="number"
            value={rerunWindow}
            onChange={e => setRerunWindow(parseInt(e.target.value))}
          />
        </label>
        <label>
          Preroll Ad:
          <input
            type="checkbox"
            defaultChecked={adPreroll}
            onChange={e => setAdPreroll(e.target.checked)}
          />
        </label>
      </div> */}
    </div>
  )
}

export default forwardRef(VideoAdManager)
