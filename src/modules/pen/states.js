import { createState } from '@hookstate/core';
import { getGeneratedPageURL } from './utils/generatePageUrl';
import { horizontalTemplate } from './view-layout/ViewLayout-templates';
import { Persistence } from '@hookstate/persistence';

export const penState = createState({});

export const unsavedChangesState = createState(0);

export const sourceUrlState = createState(getGeneratedPageURL());

export const viewLayoutState = createState(horizontalTemplate);

export const openConsoleState = createState(false);

export const openOutputState = createState(true);

export const consoleMessagesState = createState([]);

export const cmdReturnedValueState = createState('');

export const appearanceState = createState({
   direction: 'ltr',
   fontSize: '100%',
   editorMode: 'window-mode',
});
appearanceState.attach(Persistence('appearance-settings'));
