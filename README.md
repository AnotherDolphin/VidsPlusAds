# VidsPlusAds

React video componnet library with in-built support for running video ads

### Integrate ads in your videos without hassle

- Easy configuration with simple props
- Written in TS for type filling and parametr diagnosis
- Set how often you want the ad to run
- Set whether you want the ad to preroll
- Ads automatically adjust to your displayed video component dimensions regardless of ratio/size differences
- _Skip Ad_ feature when ad is running

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

```typescript
<VidsPlusAds {...{ adFrequency, videoSource, adSource }} />
```

## Component Props

Name | Type | Description
--- | --- | ---
adFrequency | number | The time in milliseconds between ad runs
videoSource | string | Local path or URL source for main video content
adSource | string | Local path or URL source for video ad
preroll | boolean | Preroll ad upon video playback if true
