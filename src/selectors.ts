import { createSelector } from '@ngrx/store';

import { LoadableSelectors, LoadableState } from './models';

export function createSelectorsFactory() {
  function getSelectors(): LoadableSelectors<LoadableState>;
  function getSelectors<State>(
    selectState: (state: State) => LoadableState,
  ): LoadableSelectors<State>;

  function getSelectors(
    selectState?: (state: LoadableState) => LoadableState,
  ): LoadableSelectors<LoadableState> {
    const selectError = (state: LoadableState) => state.error;
    const selectIsLoaded = (state: LoadableState) => state.isLoaded;
    const selectIsLoading = (state: LoadableState) =>
      typeof state.isLoading === 'boolean'
        ? state.isLoading
        : state.isLoading > 0;
    const selectIsLoadingCount = (state: LoadableState) =>
      typeof state.isLoading === 'boolean'
        ? Number(state.isLoading)
        : state.isLoading;

    if (!selectState) {
      return {
        selectError,
        selectIsLoaded,
        selectIsLoading,
        selectIsLoadingCount,
      };
    }

    return {
      selectError: createSelector(
        selectState,
        selectError,
      ),
      selectIsLoaded: createSelector(
        selectState,
        selectIsLoaded,
      ),
      selectIsLoading: createSelector(
        selectState,
        selectIsLoading,
      ),
      selectIsLoadingCount: createSelector(
        selectState,
        selectIsLoadingCount,
      ),
    };
  }

  return { getSelectors };
}
