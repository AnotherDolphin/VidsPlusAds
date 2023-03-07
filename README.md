# VidsPlusAds

React video component library with in-built support for running video ads

### Integrate ads in your videos without hassle

- Easy configuration with simple props
- (*New v1*) Supports all [VideoJS](https://docs.videojs.com/player) methods
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
controls | boolean | show video controls
onPlay | function | callback when player starts/resumes
onLoadedMetaData | function | callback when video metadata is loaded
onPause | function | callback when player is paused
overlayChild | React.Node | element to be displayed on top of video



## Component Methods

ref | useRef() Obj | Can be used to programmatically trigger player methods/actions

```tsx
const ref = useRef()
// ...

<VidsPlusAds {...props} ref={ref} />
```

### Core Methods

All Video Player methods supported by [VideoJS](https://docs.videojs.com/player) are accessible on any VidsPlusAds intance through
the '*core*' prop on `ref.current`.

examples:
- `ref.current.core.play()`
  plays video
- `ref.current.core.pause()`
  pauses video
- `ref.current.core.duration()`
  returns video duration in seconds
- `ref.current.core.currentTime()`
  returns current video time in seconds
- `ref.current.core.currentTime(seconds)`
  sets current video time in seconds
- `ref.current.core.paused()`
  returns true if video is paused
- `ref.current.core.ended()`
  returns true if video has ended

### Extended Methods

Convenience methods with added functionality. Accessed directly with `ref.current`

- `ref.current.togglePlay()`
  toggles play/pause

## Migration
version 1.0.0+ added support for all VideoJS methods.

To migrate from version 0 to 1 install the new version and covert any *core* method calls on `ref.current` to `ref.current.core` instead.