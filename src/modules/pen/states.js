import { createState } from '@hookstate/core';
import { getGeneratedPageURL } from './utils/generatePageUrl';
import { Persistence } from '@hookstate/persistence';

export const penState = createState({});

export const unsavedChangesState = createState(0);

export const sourceUrlState = createState(getGeneratedPageURL());

export const openConsoleState = createState(false);

export const openOutputState = createState(true);

export const consoleMessagesState = createState([]);

export const cmdReturnedValueState = createState('');

export const appearanceState = createState({
   direction: 'ltr',
   fontSize: '8px',
   editorMode: 'window-mode',
});
appearanceState.attach(Persistence('appearance-settings'));
