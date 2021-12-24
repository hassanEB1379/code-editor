/*
 * This function checks whether the given object key is repeated in the array
 * */

export function detectDuplicateObject(array, object, key) {
   let duplicate = false;
   for (let i = 0; i < array.length; i++) {
      if (array[i][key] === object[key]) duplicate = true;
   }
   return duplicate;
}
