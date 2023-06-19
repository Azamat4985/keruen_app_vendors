import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './reducers/accountReducer'
import settingsReducer from './reducers/settingsReducer'

export default configureStore({
  reducer: {
    account: accountReducer,
    settings: settingsReducer,
  }
})