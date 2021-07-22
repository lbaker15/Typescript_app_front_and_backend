import { Action } from "../actions/map"

export interface MyState {
    map: string[];
}
const initialState = {
    map: [],
}

export const reducer = (
    state: MyState = initialState, 
    action: Action
  ) => {
  switch(action.type){
    case "MAP_SAVED": {
      //console.log( action.payload )
      return action.payload;
    }
    default:
      return state
  }
}