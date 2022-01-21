// we using dexie-js for manage indexedDB
import Dexie from 'dexie';

// create new database
export const db = new Dexie('codeEditor');

// object stores
export const stores = { pens: 'id,title,last_save,code,libraries' };
