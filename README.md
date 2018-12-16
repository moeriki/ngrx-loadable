# ngrx-loadable

<p align="center">
  <p align="center">Add some loading to your state<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/ngrx-loadable">
      <img src="https://img.shields.io/npm/v/ngrx-loadable.svg" alt="npm version">
    </a>
    <a href="https://david-dm.org/moeriki/ngrx-loadable">
      <img src="https://david-dm.org/moeriki/ngrx-loadable/status.svg" alt="dependencies Status"></img>
    </a>
    <a href="https://snyk.io/test/github/moeriki/ngrx-loadable">
      <img src="https://snyk.io/test/github/moeriki/ngrx-loadable/badge.svg" alt="Known Vulnerabilities"></img>
    </a>
  </p>
</p>

## Install

```sh
npm install --save ngrx-loadable
```

## Usage

```js
import {
  createLoadableAdaptor,
  LoadableAdapter,
  LoadableState,
} from 'ngrx-loadable';

import { Actions, Types } from './actions';

export interface MyState extends LoadableState {}

export const adapter: LoadableAdapter = createLoadableAdaptor();

export const initialState = adapter.getInitialState() as MyState;

export function featureReducer(state = initialState, action: Actions): MyState {
  switch (action.type) {
    case Types.LOAD_REQUEST: {
      return loadableAdapter.startLoading(state);
    }
    case Types.LOAD_CANCELATION: {
      return loadableAdapter.stopLoading(state);
    }
    case Types.LOAD_FAILURE: {
      return loadableAdapter.failLoading(action.payload.error, state);
    }
    case Types.LOAD_SUCCESS: {
      return loadableAdapter.succeedLoading(state);
    }
    default: {
      return state;
    }
  }
}

const {
  selectError,
  selectIsLoaded,
  selectIsLoading,
  selectIsLoadingCount,
} = loadableAdapter.getSelectors(selectFeatureState);

export { selectError, selectIsLoaded, selectIsLoading, selectIsLoadingCount };
```

## Options

### `isParallelLoadable`

Defaults to `false`. Set to `true` if you load your requests in parallel.

Eg. if you use `concatMap` in your load request effect you'll want to set this to true.
