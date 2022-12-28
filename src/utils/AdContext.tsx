import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useReducer,
} from 'react'

type Children = JSX.Element[] | JSX.Element

// ts enum example?
export enum AdEvents {
  DidNotPlay = 'HasNotPlayed',
  Playing = 'playingAd',
  Ended = 'FinishedAd',
  Waiting = 'WaitingTime',
}

export interface AdState {
  rerunWindow: number
  lastEvent: AdEvents
}

export interface AdReducer {
  adState: AdState
  dispatchAdState: Dispatch<AdEvents>
}

const initialAdState: AdState = {
  rerunWindow: 0,
  lastEvent: AdEvents.DidNotPlay,
}

const adStateReducer = (state: AdState, stateEvent: AdEvents): AdState => {
  switch (stateEvent) {
    case AdEvents.Playing:
      return { lastEvent: AdEvents.Playing, rerunWindow: state.rerunWindow }
    case AdEvents.Ended:
      // let currentMins = new Date().getTime() / 60000
      // setTimeout(() => {
      //   adStateReducer(state, AdEvents.Playing)
      // }, state.rerunWindow)
      return { lastEvent: AdEvents.Ended, rerunWindow: state.rerunWindow }
    default:
      throw new Error()
  }
}

export const AdStateContext = createContext<AdReducer>({
  adState: initialAdState,
  dispatchAdState: () => {},
})

const AdStateProvider = ({ children }: { children: Children }) => {
  const [adState, dispatchAdState] = useReducer(adStateReducer, initialAdState)
  return (
    <AdStateContext.Provider value={{ adState, dispatchAdState }}>
      {children}
    </AdStateContext.Provider>
  )
}

export default AdStateProvider
