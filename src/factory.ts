import { createStateAdapter } from './adapter';
import { createInitialStateFactory } from './initial-state';
import { LoadableAdapter, LoadableOptions } from './models';
import { createSelectorsFactory } from './selectors';

export function createLoadableAdaptor(
  options: LoadableOptions = {},
): LoadableAdapter {
  const stateFactory = createInitialStateFactory(options);
  const selectorsFactory = createSelectorsFactory();
  const stateAdapter = createStateAdapter();

  return { ...stateFactory, ...selectorsFactory, ...stateAdapter };
}
