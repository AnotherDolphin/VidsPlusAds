import { VideoJsPlayerOptions } from "video.js"

export interface VideoProps {
  options: VideoJsPlayerOptions
  onReady: Function
  className?: string
}
