import { makeLinearGradient } from "../draw/helpers.js";
import { rotate, divide, distance } from "./helpers.js";

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {boolean} flip
 * @returns {import("./helpers.js").Point2D[]}
 */
export function simpleSierpinski(start, end, flip = false) {
    const otherVertice = rotate(start, end, flip ? -Math.PI / 3 : Math.PI / 3);

    return [start, divide(start, otherVertice, 0.5), divide(otherVertice, end, 0.5), end];
}

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} iteration
 */
export function sierpinskiArrowheadCurve(start, end, iteration) {
    /**
     *
     * @param {import("./helpers.js").Point2D[]} result
     * @param {number} step
     * @returns {import("./helpers.js").Point2D[]}
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }

        const points = result.flatMap(function (point, index, thisArr) {
            if (index === result.length - 1) {
                return [];
            }
            const nextPoint = thisArr[index + 1];

            if (step % 2 === 0) {
                if (index % 2 === 0) {
                    return simpleSierpinski(point, nextPoint, true).slice(index === 0 ? 0 : 1);
                }
                return simpleSierpinski(point, nextPoint).slice(1);
            }

            if (index % 2 === 0) {
                return simpleSierpinski(point, nextPoint).slice(index === 0 ? 0 : 1);
            }

            return simpleSierpinski(point, nextPoint, true).slice(1);
        });

        return recur(points, step + 1);
    }

    return recur([start, end], 0);
}

/**
 * 
 * @param {import("./helpers.js").Triangle} triangle 
 * @param {number} iteration 
 */
export function sierpinskiTriangle(triangle, iteration) {
    /**
     * 
     * @param {import("./helpers.js").Triangle[][]} result 
     * @param {number} step
     * @param {import("./helpers.js").Triangle[][]} 
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }

        const last = result[result.length - 1];
        const smallerTriangles = last.flatMap(function (element) {
            const [A, B, C] = element;
            const M_AB = divide(A, B, 0.5);
            const M_BC = divide(B, C, 0.5);
            const M_CA = divide(C, A, 0.5);

            /** @type {import("./helpers.js").Triangle} */
            const first = [A, M_AB, M_CA];
            /** @type {import("./helpers.js").Triangle} */
            const second = [M_AB, B, M_BC];
            /** @type {import("./helpers.js").Triangle} */
            const third = [M_CA, M_BC, C];

            return [first, second, third];
        });

        return recur([...result, smallerTriangles], step + 1);
    }

    return recur([[triangle]], 0);
}

/**
 * 
 * @param {import("./helpers.js").Triangle} triangle 
 * @param {number} iteration 
 */
export function sierpinskiPedalTriangle(triangle, iteration) {
    /**
     * 
     * @param {import("./helpers.js").Triangle[][]} result 
     * @param {number} step
     * @param {import("./helpers.js").Triangle[][]} 
     */
    function recur(result, step) {
        if (step >= iteration) {
            return result;
        }

        const last = result[result.length - 1];
        const smallerTriangles = last.flatMap(function (element) {
            const [A, B, C] = element;
            const BC = distance(B, C);
            const CA = distance(C, A);
            const AB = distance(A, B);

            const S_A = (-(BC ** 2) + CA ** 2 + AB ** 2) / 2;
            const S_B = (BC ** 2 - (CA ** 2) + AB ** 2) / 2;
            const S_C = (BC ** 2 + CA ** 2 - (AB ** 2)) / 2;

            const M_AB = divide(A, B, S_B / AB**2);
            const M_BC = divide(B, C, S_C / BC**2);
            const M_CA = divide(C, A, S_A / CA**2);

            /** @type {import("./helpers.js").Triangle} */
            const first = [A, M_AB, M_CA];
            /** @type {import("./helpers.js").Triangle} */
            const second = [M_AB, B, M_BC];
            /** @type {import("./helpers.js").Triangle} */
            const third = [M_CA, M_BC, C];

            return [first, second, third];
        });

        return recur([...result, smallerTriangles], step + 1);
    }

    return recur([[triangle]], 0);
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {[number, string][]} colors
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} step
 */
export function drawSierpinskiArrowheadCurve(context, colors, start, end, step) {
    context.beginPath();
    const points = sierpinskiArrowheadCurve(start, end, step);
    makeLinearGradient(context, colors, points[0], points[points.length - 1]);
    points.forEach(function (point, index) {
        if (index === 0) {
            context.moveTo(...point);
        } else {
            context.lineTo(...point);
        }
    });
    context.stroke();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {import("./helpers.js").Triangle} triangle
 * @param {number} step
 */
export function drawSierpinskiTriangle(context, triangle, step) {
    const listOfListOfTriangles = sierpinskiTriangle(triangle, step);
    listOfListOfTriangles.forEach(function (listOfTriangles) {
        listOfTriangles.forEach(function (triangle) {
            const [A, B, C] = triangle;
            context.beginPath();
            context.moveTo(...A);
            context.lineTo(...B);
            context.lineTo(...C);
            context.closePath();
            context.stroke();
        });
    });
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {import("./helpers.js").Triangle} triangle
 * @param {number} step
 */
export function drawSierpinskiPedalTriangle(context, triangle, step) {
    const listOfListOfTriangles = sierpinskiPedalTriangle(triangle, step);
    listOfListOfTriangles.forEach(function (listOfTriangles) {
        listOfTriangles.forEach(function (triangle) {
            const [A, B, C] = triangle;
            context.beginPath();
            context.moveTo(...A);
            context.lineTo(...B);
            context.lineTo(...C);
            context.closePath();
            context.stroke();
        });
    });
}

