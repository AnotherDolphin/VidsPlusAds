import { VideoJsPlayerOptions } from "video.js"

export interface VideoProps {
  options: VideoJsPlayerOptions
  onReady: Function
  className?: string
}

// export interface asdf as VideoJsPlayerOptions

export interface IPlayerHandler {
  play: () => void
  pause: () => void
  togglePlay: () => void
  currentTime: () => number | undefined
  duration: () => number | undefined
  paused: () => boolean | undefined
  ended: () => boolean | undefined
  muted: () => boolean | undefined
}