
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducerEnhancer from './enhancers/monitorReducerEnhancer'
import loggerMiddleware from './middleware/logger'
import createReducerManager from './reducerManager'
import {noOpReducer} from './userReducer'
const staticReducers = {
  noop:noOpReducer
}
function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware ,thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = compose(...enhancers)

  const reducerManager = createReducerManager(staticReducers)

  const store = createStore(reducerManager.reduce, preloadedState , composedEnhancers  )
  store.reducerManager = reducerManager
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(reducerManager.reduce))
  // }
  return store
}


// export default store
//npm install --save-dev redux-devtools-extension


// To add a new reducer, one can now call store.reducerManager.add("asyncState", asyncReducer).

// To remove a reducer, one can now call store.reducerManager.remove("asyncState")

export default configureStore({noop:null})