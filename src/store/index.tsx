import {rootReducer} from '@/reducers';
import rootSaga from '@/saga';
import AsyncStorage from '@react-native-async-storage/async-storage'; // je storage ni library use kari hoy te ahiya set kari devani
import immutablePersistenceTransform from '@/utils/immutablePersistenceTransform';
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

const sagaMonitor = __DEV__ ? (console as any).tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middleWare = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav', 'navigation'],
  transforms: [immutablePersistenceTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middleWare);

const enhancers = __DEV__
  ? composeEnhancers(middleware, (console as any).tron.createEnhancer())
  : compose(middleware);

const store = createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
