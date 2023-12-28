/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @returns {Point2D[]}
 */
function simpleHeighway(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    /**
     * @type {Point2D}
     */
    const midpoint = [(x1 + x2) / 2, (y1 + y2) / 2];

    return [start, rotate(midpoint, -Math.PI / 2, start), end];
}

/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} step
 * @returns {Point2D[]}
 */
function heighway(start, end, step) {
    console.assert(step >= 0);
    /**
     *
     * @param {Point2D[]} result
     * @param {number} step
     * @returns
     */
    function recur(result, step) {
        if (step <= 0) return result;

        const segments = result.flatMap((point, index, thisPath) => {
            if (index === thisPath.length - 1) return [];
            if (index === 0) return simpleHeighway(point, thisPath[index + 1]);
            if (index % 2 === 0)
                return simpleHeighway(point, thisPath[index + 1]).slice(1);
            return simpleHeighway(thisPath[index + 1], point)
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
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} step
 */
function drawHeighwayDrachen(context, start, end, step) {
    context.beginPath();
    const points = heighway(start, end, step);
    const linearGradient = context.createLinearGradient(
        points[0][0],
        points[0][1],
        points[points.length - 1][0],
        points[points.length - 1][1]
    );
    linearGradient.addColorStop(0, "red");
    linearGradient.addColorStop(0.5, "blue");
    linearGradient.addColorStop(1, "purple");

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
