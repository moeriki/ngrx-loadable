import { createLoadableAdaptor } from './';

describe('createInitialState()', () => {
  it('should create initial state', () => {
    const adaptor = createLoadableAdaptor();
    expect(adaptor.getInitialState()).toEqual({
      isLoaded: false,
      isLoading: false,
    });
  });

  it('should create initial state with isParallelLoadable:true', () => {
    const adaptor = createLoadableAdaptor({ isParallelLoadable: true });
    expect(adaptor.getInitialState()).toEqual({
      isLoaded: false,
      isLoading: 0,
    });
  });

  it('should create initial state with additional state', () => {
    const adaptor = createLoadableAdaptor();
    expect(adaptor.getInitialState({ additional: 'state' })).toEqual({
      additional: 'state',
      isLoaded: false,
      isLoading: false,
    });
  });
});
