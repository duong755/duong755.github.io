import { rotate, signedArea } from "./helpers.js";

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @returns {import("./helpers.js").Point2D[]}
 */
export function simpleMinkowski(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    /** @type {import("./helpers.js").Point2D} */
    const oneFourth = [x1 + (x2 - x1) / 4, y1 + (y2 - y1) / 4];
    /** @type {import("./helpers.js").Point2D} */
    const half = [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2];
    /** @type {import("./helpers.js").Point2D} */
    const threeFourth = [x1 + ((x2 - x1) * 3) / 4, y1 + ((y2 - y1) * 3) / 4];

    const points = [
        start,
        oneFourth,
        rotate(oneFourth, half,  -Math.PI / 2),
        rotate(half, oneFourth, Math.PI / 2),
        half,
        rotate(half, threeFourth, Math.PI / 2),
        rotate(threeFourth, half, -Math.PI / 2),
        threeFourth,
        end,
    ];

    return points;
}

/**
 *
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} step
 * @returns {import("./helpers.js").Point2D[]}
 */
export function minkowski(start, end, step) {
    console.assert(step >= 0);
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
            if (index === 0) return simpleMinkowski(point, thisPath[index + 1]);
            return simpleMinkowski(point, thisPath[index + 1]).slice(1);
        });

        return recur(segments, step - 1);
    }

    return recur([start, end], step);
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {import("./helpers.js").Point2D} start
 * @param {import("./helpers.js").Point2D} end
 * @param {number} step
 */
export function drawMinkowskiWurst(context, start, end, step) {
    context.beginPath();
    minkowski(start, end, step).forEach((point, index) => {
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
 * @param {import("./helpers.js").Quadrangle} viereck
 * @param {number} step
 * @param {string} color
 */
export function drawMinkowskiInsel(context, viereck, step, color) {
    const [A, B, C, D] = viereck;
    const points =
        signedArea([A, B, C]) > 0
            ? minkowski(A, B, step)
                .concat(minkowski(B, C, step))
                .concat(minkowski(C, D, step))
                .concat(minkowski(D, A, step))
            : minkowski(A, D, step)
                .concat(minkowski(D, C, step))
                .concat(minkowski(C, B, step))
                .concat(minkowski(B, A, step));

    context.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            context.moveTo(...point);
        } else {
            context.lineTo(...point);
        }
    });
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

