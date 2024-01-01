import { partition } from "../functions/collection.js";
import { centroid } from "./helpers.js";
import { simplePeano } from "./peano.js";

/**
 * 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 */
export function simplePeanoSierpinski(quadrangle) {
    return simplePeano(quadrangle).filter(function (_, index) {
        return index !== 4;
    });
}

/**
 * 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 * @param {number} iteration 
 */
export function peanoSierpinskiCurve(quadrangle, iteration) {
    /**
     * 
     * @param {import("./helpers.js").Quadrangle[]} result 
     * @param {number} step 
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }

        return recur(result.flatMap(simplePeanoSierpinski), step + 1);
    }

    return recur([quadrangle], 0);
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 * @param {number} iteration 
 */
export function drawPeanoSierpinskiCurve(context, quadrangle, iteration) {
    const quadrangles = peanoSierpinskiCurve(quadrangle, iteration);
    const centroids = quadrangles.map(function (quadrangle) {
        return centroid.apply(undefined, quadrangle);
    });
    const groupsOfFour = partition(centroids, 4);

    groupsOfFour.forEach(function (fourPoints) {
        context.beginPath();
        context.moveTo.apply(context, fourPoints[0]);
        context.lineTo.apply(context, fourPoints[1]);
        context.lineTo.apply(context, fourPoints[2]);
        context.lineTo.apply(context, fourPoints[3]);
        context.stroke();
    });
}
