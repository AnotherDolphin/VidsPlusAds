# VidsPlusAds

React video componnet library with in-built support for running video ads

### Integrate ads in your videos without hassle

- Easy configuration with simple props
- Written in TS for type filling and parametr diagnosis
- Set how often you want the ad to run
- Set whether you want the ad to preroll
- Ads automatically adjust to your displayed video component dimensions regardless of ratio/size differences
- _Skip Ad_ feature when ad is running
- Can use as simple video player if no ad source was passed

## Installation

`npm install vids-plus-ads`

## Usage

#### Import package

```typescript
import VidsPlusAds from 'vids-plus-ads'
```

#### Set required parameters

```typescript
// set ad frequency in ms (time between ads)
const adFrequency = 10000
// set video source
const videoSource =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
// set ad source
const adSource =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
```

#### Pass props and call component

```tsx
<VidsPlusAds {...{ adFrequency, videoSource, adSource }} />
```

## Component Props

\* *requried*

Name | Type | Description
--- | --- | ---
videoSource* | string | Local path or URL source for main video content
adSource | string | Local path or URL source for video ad
adFrequency | number | The time in milliseconds between ad runs
preroll | boolean | Preroll ad upon video playback if true
thumbnail | string | video thumbnail image source
height | number | height of player in px
width | number | width of player in px
fluid | boolean | auto adjust player size
onPlay | function | callback when palyer starts/resumes



## Component Methods

ref | useRef() Obj | Can be used to programmatically trigger player methods/actions

```tsx
const ref = useRef()
// ...

<VidsPlusAds {...props} ref={ref} />
```

### Methods
- `ref.current.play()`
  plays video
- `ref.current.pause()`
  pauses video
- `ref.current.togglePlay()`
  toggles play/pause
- `ref.current.duration()`
  returns video duration in seconds
- `ref.current.currentTime()`
  returns current video time in seconds
- `ref.current.paused()`
  returns true if video is paused
- `ref.current.ended()`
  returns true if video has ended
- `ref.current.muted()`
  returns true if video is muted