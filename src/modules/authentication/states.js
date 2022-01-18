import { createState, postpone } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

export const authState = createState({});
authState.attach(Persistence('user'));
authState.batch(state => {
   if (state.promised) return postpone;
});
