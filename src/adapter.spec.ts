import { createLoadableAdaptor } from './';
import { LoadableAdapter, LoadableState } from './models';

describe('LoadableAdapters', () => {
  interface State extends LoadableState {
    additional?: any;
  }

  let adapter: LoadableAdapter;
  let state: State;

  beforeEach(() => {
    adapter = createLoadableAdaptor();
    state = adapter.getInitialState();
  });

  describe('failLoading()', () => {
    let error: Error;

    beforeEach(() => {
      error = new Error();
    });

    it('should set error', () => {
      state.isLoading = true;
      expect(adapter.failLoading(error, state)).toMatchObject({ error });
    });

    it('should set isLoading false if true', () => {
      state.isLoading = true;
      expect(adapter.failLoading(error, state)).toMatchObject({
        isLoading: false,
      });
    });

    it('should not change isLoaded', () => {
      state.isLoaded = true;
      expect(adapter.failLoading(error, state)).toMatchObject({
        isLoaded: true,
      });
    });

    it('should set decrease isLoading if number', () => {
      state.isLoading = 1;
      expect(adapter.failLoading(error, state)).toMatchObject({ isLoading: 0 });
      state.isLoading = 5;
      expect(adapter.failLoading(error, state)).toMatchObject({ isLoading: 4 });
    });

    it('should keep additional state', () => {
      state.additional = 'state';
      expect(adapter.failLoading(error, state)).toMatchObject({
        additional: 'state',
      });
    });
  });

  describe('startLoading()', () => {
    it('should set isLoading true if false', () => {
      state.isLoading = false;
      expect(adapter.startLoading(state)).toMatchObject({
        isLoading: true,
      });
    });

    it('should set increase isLoading by 1 is isLoading is number', () => {
      state.isLoading = 0;
      expect(adapter.startLoading(state)).toMatchObject({ isLoading: 1 });
      state.isLoading = 4;
      expect(adapter.startLoading(state)).toMatchObject({ isLoading: 5 });
    });

    it('should not change error / isLoaded', () => {
      state.isLoaded = true;
      expect(adapter.startLoading(state)).toMatchObject({
        isLoaded: true,
      });
      state.isLoaded = false;
      expect(adapter.startLoading(state)).toMatchObject({
        isLoaded: false,
      });
    });

    it('should keep additional state', () => {
      state.additional = 'state';
      expect(adapter.startLoading(state)).toMatchObject({
        additional: 'state',
      });
    });
  });

  describe('stopLoading()', () => {
    it('should set isLoading false if true', () => {
      state.isLoading = true;
      expect(adapter.stopLoading(state)).toMatchObject({ isLoading: false });
    });

    it('should not change error / isLoaded', () => {
      state.error = new Error();
      state.isLoaded = true;
      expect(adapter.stopLoading(state)).toMatchObject({
        error: expect.any(Error),
        isLoaded: true,
      });
    });

    it('should set decrease isLoading if number', () => {
      state.isLoading = 1;
      expect(adapter.stopLoading(state)).toMatchObject({ isLoading: 0 });
      state.isLoading = 5;
      expect(adapter.stopLoading(state)).toMatchObject({ isLoading: 4 });
    });

    it('should keep additional state', () => {
      state.additional = 'state';
      expect(adapter.stopLoading(state)).toMatchObject({ additional: 'state' });
    });
  });

  describe('succeedLoading()', () => {
    it('should set isLoading false if true', () => {
      state.isLoading = true;
      expect(adapter.succeedLoading(state)).toMatchObject({ isLoading: false });
    });

    it('should not change isLoaded', () => {
      state.isLoaded = true;
      expect(adapter.succeedLoading(state)).toMatchObject({ isLoaded: true });
    });

    it('should set decrease isLoading if number', () => {
      state.isLoading = 1;
      expect(adapter.succeedLoading(state)).toMatchObject({ isLoading: 0 });
      state.isLoading = 5;
      expect(adapter.succeedLoading(state)).toMatchObject({ isLoading: 4 });
    });

    it('should keep additional state', () => {
      state.additional = 'state';
      expect(adapter.succeedLoading(state)).toMatchObject({
        additional: 'state',
      });
    });

    it('should set isLoaded to true', () => {
      expect(adapter.succeedLoading(state)).toMatchObject({ isLoaded: true });
    });

    it('should unset error', () => {
      state.error = new Error();
      expect(adapter.succeedLoading(state)).toMatchObject({ error: undefined });
    });
  });
});
