/* Math.random generates some number between 0-1, when this is multiplied by the max
 * number and will result in some float between 0-max. */
export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/* Shuffling algorithm is based on the Fischer Yates Algorithm to avoid sorting overhead.
 * Walk through array in reverse, then swap each element with a random one before it. Finally
  * return the first n elements in the array from 0-n */
export function getRandomSelection(data, max) {
    for (let i = data.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    return data.slice(0, max);
}