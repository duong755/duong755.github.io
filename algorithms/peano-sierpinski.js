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
        return centroid(...quadrangle);
    });

    centroids.forEach(function (_, index) {
        if (index % 4 === 0 && iteration > 0) {
            context.beginPath();
            context.moveTo(...centroids[index + 0]);
            context.lineTo(...centroids[index + 1]);
            context.lineTo(...centroids[index + 2]);
            context.lineTo(...centroids[index + 3]);
            context.stroke();
        }
    });
}
