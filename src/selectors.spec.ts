import { createLoadableAdaptor } from './';
import { LoadableAdapter, LoadableSelectors, LoadableState } from './models';

describe('LoadableSelectors', () => {
  let adapter: LoadableAdapter;

  beforeEach(() => {
    adapter = createLoadableAdaptor();
  });

  describe('getSelectors()', () => {
    let state: LoadableState;
    let selectors: LoadableSelectors<LoadableState>;

    beforeEach(() => {
      state = adapter.getInitialState();
      selectors = adapter.getSelectors();
    });

    describe('selectError', () => {
      it('should select error', () => {
        state.error = new Error();
        expect(selectors.selectError(state)).toBe(state.error);
      });
    });

    describe('selectIsLoaded', () => {
      it('should select isLoaded', () => {
        state.isLoaded = true;
        expect(selectors.selectIsLoaded(state)).toBe(true);
        state.isLoaded = false;
        expect(selectors.selectIsLoaded(state)).toBe(false);
      });
    });

    describe('selectIsLoading', () => {
      it('should select isLoading from boolean', () => {
        state.isLoading = true;
        expect(selectors.selectIsLoading(state)).toBe(true);
        state.isLoading = false;
        expect(selectors.selectIsLoading(state)).toBe(false);
      });

      it('should select isLoading from number', () => {
        state.isLoading = 0;
        expect(selectors.selectIsLoading(state)).toBe(false);
        state.isLoading = 1;
        expect(selectors.selectIsLoading(state)).toBe(true);
        state.isLoading = 5;
        expect(selectors.selectIsLoading(state)).toBe(true);
      });
    });

    describe('selectIsLoadingCount', () => {
      it('should select isLoadingCount from boolean', () => {
        state.isLoading = true;
        expect(selectors.selectIsLoadingCount(state)).toBe(1);
        state.isLoading = false;
        expect(selectors.selectIsLoadingCount(state)).toBe(0);
      });

      it('should select isLoadingCount from number', () => {
        state.isLoading = 0;
        expect(selectors.selectIsLoadingCount(state)).toBe(0);
        state.isLoading = 1;
        expect(selectors.selectIsLoadingCount(state)).toBe(1);
        state.isLoading = 5;
        expect(selectors.selectIsLoadingCount(state)).toBe(5);
      });
    });
  });

  describe('getSelectors({ selectState })', () => {
    interface RootState {
      feature: LoadableState;
    }

    let createRootState: (state?: Partial<LoadableState>) => RootState;
    let rootState: RootState;
    let selectors: LoadableSelectors<RootState>;

    beforeEach(() => {
      createRootState = (state = {}) => ({
        feature: { ...adapter.getInitialState(), ...state },
      });
      selectors = adapter.getSelectors((root: RootState) => root.feature);
      rootState = createRootState();
    });

    describe('selectError', () => {
      it('should select error', () => {
        const error = new Error();
        rootState.feature.error = error;
        expect(selectors.selectError(rootState)).toBe(error);
      });
    });

    describe('selectIsLoaded', () => {
      it('should select isLoaded', () => {
        rootState = createRootState({ isLoaded: true });
        expect(selectors.selectIsLoaded(rootState)).toBe(true);
        rootState = createRootState({ isLoaded: false });
        expect(selectors.selectIsLoaded(rootState)).toBe(false);
      });
    });

    describe('selectIsLoading', () => {
      it('should select isLoading from boolean', () => {
        rootState = createRootState({ isLoading: true });
        expect(selectors.selectIsLoading(rootState)).toBe(true);
        rootState = createRootState({ isLoading: false });
        expect(selectors.selectIsLoading(rootState)).toBe(false);
      });

      it('should select isLoading from number', () => {
        rootState = createRootState({ isLoading: 0 });
        expect(selectors.selectIsLoading(rootState)).toBe(false);
        rootState = createRootState({ isLoading: 1 });
        expect(selectors.selectIsLoading(rootState)).toBe(true);
        rootState = createRootState({ isLoading: 5 });
        expect(selectors.selectIsLoading(rootState)).toBe(true);
      });
    });

    describe('selectIsLoadingCount', () => {
      it('should select isLoadingCount from boolean', () => {
        rootState = createRootState({ isLoading: true });
        expect(selectors.selectIsLoadingCount(rootState)).toBe(1);
        rootState = createRootState({ isLoading: false });
        expect(selectors.selectIsLoadingCount(rootState)).toBe(0);
      });

      it('should select isLoadingCount from number', () => {
        rootState = createRootState({ isLoading: 0 });
        expect(selectors.selectIsLoadingCount(rootState)).toBe(0);
        rootState = createRootState({ isLoading: 1 });
        expect(selectors.selectIsLoadingCount(rootState)).toBe(1);
        rootState = createRootState({ isLoading: 5 });
        expect(selectors.selectIsLoadingCount(rootState)).toBe(5);
      });
    });
  });
});
