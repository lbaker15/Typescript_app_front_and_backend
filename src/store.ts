import { combineReducers, createStore } from 'redux'
import {reducer} from './reducers'

export const store = createStore(combineReducers({
    reducer: reducer
}))