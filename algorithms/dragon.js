import { rotate } from "./helpers.js";

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @returns {import("./helpers.js").Point2D[]}
 */
export function simpleDragon(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    /**
     * @type {Point2D}
     */
    const midpoint = [(x1 + x2) / 2, (y1 + y2) / 2];

    return [start, rotate(midpoint, start, -Math.PI / 2), end];
}

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} step
 * @returns {import("./helpers.js").Point2D[]}
 */
export function dragonCurve(start, end, step) {
    /**
     *
     * @param {import("./helpers.js").Point2D[]} result
     * @param {number} step
     * @returns
     */
    function recur(result, step) {
        if (step <= 0) return result;

        const segments = result.flatMap((point, index, thisPath) => {
            if (index === thisPath.length - 1) return [];
            if (index === 0) return simpleDragon(point, thisPath[index + 1]);
            if (index % 2 === 0)
                return simpleDragon(point, thisPath[index + 1]).slice(1);
            return simpleDragon(thisPath[index + 1], point)
                .reverse()
                .slice(1);
        });

        return recur(segments, step - 1);
    }

    return recur([start, end], step);
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {[number, string][]} colors
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} step
 */
export function drawDragonCurve(context, colors, start, end, step) {
    context.beginPath();
    const points = dragonCurve(start, end, step);
    const linearGradient = context.createLinearGradient(
        points[0][0],
        points[0][1],
        points[points.length - 1][0],
        points[points.length - 1][1]
    );
    colors.forEach(([key, val]) => linearGradient.addColorStop(key, val));

    points.forEach((point, index) => {
        if (index === 0) {
            context.moveTo(...point);
        } else {
            context.lineTo(...point);
        }
    });
    context.strokeStyle = linearGradient;
    context.stroke();
}
