import { LoadableState, LoadableStateAdapter } from './models';

const decreaseLoading = (isLoading: boolean | number) =>
  typeof isLoading === 'boolean' ? false : isLoading - 1;

const increaseLoading = (isLoading: boolean | number) =>
  typeof isLoading === 'boolean' ? true : isLoading + 1;

export function createStateAdapter(): LoadableStateAdapter {
  function startLoading<State extends LoadableState>(state: State): State {
    return {
      ...state,
      isLoading: increaseLoading(state.isLoading),
    } as State;
  }
  function stopLoading<State extends LoadableState>(state: State): State {
    return {
      ...state,
      isLoading: decreaseLoading(state.isLoading),
    } as State;
  }
  function failLoading<State extends LoadableState>(error: any, state: State) {
    return Object.assign(stopLoading(state), { error }) as State;
  }
  function succeedLoading<State extends LoadableState>(state: State): State {
    return Object.assign(stopLoading(state), {
      error: undefined,
      isLoaded: true,
    }) as State;
  }
  return {
    failLoading,
    startLoading,
    stopLoading,
    succeedLoading,
  };
}
