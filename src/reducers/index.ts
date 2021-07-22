import { Action } from "../actions/map"

export interface MyState {
    map: object;
}
const initialState = {
    map: {'here': 'here'},
}

export const reducer = (
    state: MyState = initialState, 
    action: Action
  ) => {
  switch(action.type){
    case "MAP_SAVED": {
      state.map = action.payload;
      // console.log(state.map)
      //let newA = Object.assign(state.map, action.payload)
      return {map: action.payload};
    }
    default:
      return state
  }
}