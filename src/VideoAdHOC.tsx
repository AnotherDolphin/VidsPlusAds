import React, { useLayoutEffect } from 'react'
import { useEffect, useRef, useState } from 'react'
import { __assign } from 'tslib'
import { JsxElement } from 'typescript'
import { VideoProps } from './utils/interfaces'
import VideoJS from './VideoJS'

export const VideoAdHOC = (props: VideoProps) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    props.options.height =
      divRef.current?.previousElementSibling?.clientHeight ?? 0
    console.log(divRef.current?.previousElementSibling)
    console.log(divRef.current?.previousElementSibling?.clientHeight)
    return () => {}
  }, [divRef, props])

  return (
    <div ref={divRef} className={props.className}>
      <VideoJS options={props.options} onReady={props.onReady} />
    </div>
  )
}
