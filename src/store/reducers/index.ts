import { combineReducers } from 'redux'
import { memeApi } from '../services/meme.api'
import userReducer from '../slices/userSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  [memeApi.reducerPath]: memeApi.reducer,
})
