import { makeLinearGradient } from "../draw/helpers.js";
import { barycenter, centroid } from "./helpers.js";

/**
 * 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 * @returns {import("./helpers.js").Quadrangle}
 */
export function simpleHilbert(quadrangle) {
    const [A, B, C, D] = quadrangle;
    return [
        [barycenter([A, 0], [B, 0], [C, 1], [D, 1]), barycenter([A, 1], [B, 1], [C, 1], [D, 1]), barycenter([A, 1], [B, 0], [C, 0], [D, 1]), barycenter([A, 0], [B, 0], [C, 0], [D, 1])],
        [barycenter([A, 1], [B, 0], [C, 0], [D, 0]), barycenter([A, 1], [B, 1], [C, 0], [D, 0]), barycenter([A, 1], [B, 1], [C, 1], [D, 1]), barycenter([A, 1], [B, 0], [C, 0], [D, 1])],
        [barycenter([A, 1], [B, 1], [C, 0], [D, 0]), barycenter([A, 0], [B, 1], [C, 0], [D, 0]), barycenter([A, 0], [B, 1], [C, 1], [D, 0]), barycenter([A, 1], [B, 1], [C, 1], [D, 1])],
        [barycenter([A, 1], [B, 1], [C, 1], [D, 1]), barycenter([A, 0], [B, 0], [C, 1], [D, 1]), barycenter([A, 0], [B, 0], [C, 1], [D, 0]), barycenter([A, 0], [B, 1], [C, 1], [D, 0])]
    ];
}

/**
 * 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 * @param {number} iteration 
 * @returns {import("./helpers.js").Quadrangle[]}
 */
export function hilbertCurve(quadrangle, iteration) {
    /**
     * 
     * @param {import("./helpers.js").Quadrangle[]} result 
     * @param {number} step 
     * @returns {import("./helpers.js").Quadrangle[]}
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }
        return recur(result.flatMap(simpleHilbert), step + 1);
    }

    return recur([quadrangle], 0);
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {[number, string][]} colors 
 * @param {import("./helpers.js").Quadrangle} quadrangle 
 * @param {number} iteration 
 */
export function drawHilbertCurve(context, colors, quadrangle, iteration) {
    const quadrangles = hilbertCurve(quadrangle, iteration);
    const centroids = quadrangles.map(function (quadrangle) {
        return centroid.apply(undefined, quadrangle);
    });

    
    context.beginPath();
    makeLinearGradient(context, colors, centroids[0], centroids[centroids.length - 1]);
    centroids.forEach(function (point, index) {
        if (index === 0) {
            context.moveTo.apply(context, point);
        } else {
            context.lineTo.apply(context, point);
        }
    });
    context.stroke();
}
