export interface LoadableOptions {
  isParallelLoadable?: boolean;
}

export interface LoadableSelectors<State> {
  selectError: (state: State) => any;
  selectIsLoaded: (state: State) => boolean;
  selectIsLoading: (state: State) => boolean;
  selectIsLoadingCount: (state: State) => number;
}

export interface LoadableState {
  error?: any;
  isLoaded: boolean;
  isLoading: boolean | number;
}

export interface LoadableStateAdapter {
  startLoading<State extends LoadableState>(state: State): State;
  stopLoading<State extends LoadableState>(state: State): State;
  failLoading<State extends LoadableState>(error: any, state: State): State;
  succeedLoading<State extends LoadableState>(state: State): State;
}

export interface LoadableAdapter extends LoadableStateAdapter {
  getInitialState(): LoadableState;
  getInitialState<State extends object>(state: State): LoadableState & State;
  getSelectors(): LoadableSelectors<LoadableState>;
  getSelectors<State>(
    selectState: (state: State) => LoadableState,
  ): LoadableSelectors<State>;
}
