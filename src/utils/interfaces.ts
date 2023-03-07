import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js"

export interface VideoProps {
  options: VideoJsPlayerOptions
  onReady: Function
  className?: string
}

// export interface asdf as VideoJsPlayerOptions

export interface IVideoHandler {
  // play: () => void
  // pause: () => void
  togglePlay: () => void
  core: VideoJsPlayer | null
  // currentTime: (seconds: number) => number | undefined
  // currentTime: () => number | undefined
  // duration: () => number | undefined
  // paused: () => boolean | undefined
  // ended: () => boolean | undefined
  // muted: () => boolean | undefined
}