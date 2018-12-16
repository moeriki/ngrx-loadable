import { LoadableOptions, LoadableState } from './models';

function getInitialLoadableState(options: LoadableOptions): LoadableState {
  return {
    isLoaded: false,
    isLoading: options.isParallelLoadable ? 0 : false,
  };
}

export function createInitialStateFactory(options: LoadableOptions) {
  function getInitialState(): LoadableState;
  function getInitialState<State extends object>(
    additionalState: State,
  ): LoadableState & State;
  function getInitialState(additionalState: any = {}): any {
    return Object.assign(getInitialLoadableState(options), additionalState);
  }

  return { getInitialState };
}
