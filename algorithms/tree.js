import { rotate } from "./helpers.js";

/**
 * 
 * @param {import("./helpers.js").LineSegment} lineSegment 
 * @param {number[]} angles
 * @param {number} scale
 * @returns {[import("./helpers.js").LineSegment, import("./helpers.js").LineSegment]}
 */
export function simpleTree(lineSegment, angles, scale = 1.0) {
    const [A, B] = lineSegment;

    return angles.flatMap(function (angle) {
        return [[B, rotate(B, A, angle, scale)], [B, rotate(B, A, -angle, scale)]]
    })
}

/**
 * 
 * @param {import("./helpers.js").LineSegment} lineSegment 
 * @param {number[]} angles 
 * @param {number} scale 
 * @param {number} iteration 
 */
export function tree(lineSegment, angles, scale, iteration) {
    /**
     * 
     * @param {import("./helpers.js").LineSegment[][]} result 
     * @param {number} step 
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }

        const last = result[result.length - 1];

        return recur([...result, last.flatMap(function (currentLineSegment) {
            return simpleTree(currentLineSegment, angles, scale)
        })], step + 1);
    }

    return recur([[lineSegment]], 0);
}

/**
 * 
 * @param {CanvasRenderingContext2D} context
 * @param {import("./helpers.js").LineSegment} lineSegment 
 * @param {number[]} angles 
 * @param {number} scale 
 * @param {number} iteration 
 */
export function drawTree(context, lineSegment, angles, scale, iteration) {
    const levels = tree(lineSegment, angles, scale, iteration);
    for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < levels[i].length; j++) {
            const [A, B] = levels[i][j];
            context.beginPath();
            context.moveTo(...A);
            context.lineTo(...B);
            context.stroke();
        }
    }
}
