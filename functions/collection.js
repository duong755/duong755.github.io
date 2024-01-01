/**
 * @template T
 * @param {T[]} coll
 * @param {(value?: T, index?: number, thisArr?: T[]) => boolean} pred
 * @returns {T[]}
 */
export function takeWhile(coll, pred) {
    const firstFailedIndex = coll.findIndex(function (value, index, thisArr) {
        return !pred(value, index, thisArr);
    });

    if (firstFailedIndex === -1) {
        return coll;
    }

    if (firstFailedIndex === 0) {
        return [];
    }

    return coll.slice(0, firstFailedIndex - 1);
}

/**
 * 
 * @template T
 * @param {T[]} coll 
 * @param {number} n
 * @returns {T[][]}
 */
export function partition(coll, n) {
    console.assert(Number.isInteger(n) && n > 0, "n must be a positve integer.");

    /**
     * 
     * @param {T[]} result
     * @param {T[]} theRest
     * @returns {T[]}
     */
    function recur(result, theRest) {
        if (theRest.length < n) {
            return result;
        }
        return recur([...result, theRest.slice(0, n)], theRest.slice(n));
    }

    return recur([], coll);
}

