import { useContext } from 'react';
import { RootStore, StoreContext } from 'store';

export const useStores = (): RootStore => useContext(StoreContext);
