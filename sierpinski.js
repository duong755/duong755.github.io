/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {boolean} flip
 * @returns {Point2D[]}
 */
function simpleSierpinski(start, end, flip = false) {
    const otherVertice = rotate(start, end, flip ? -Math.PI / 3 : Math.PI / 3);

    return [start, divide(start, otherVertice, 0.5), divide(otherVertice, end, 0.5), end];
}

/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} iteration
 */
function sierpinskiCurve(start, end, iteration) {
    /**
     *
     * @param {Point2D[]} result
     * @param {number} step
     * @returns {Point2D[]}
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
 * @param {CanvasRenderingContext2D} context
 * @param {[number, string][]} colors
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} step
 */
function drawSierpinskiCurve(context, colors, start, end, step) {
    context.beginPath();
    const points = sierpinskiCurve(start, end, step);
    const linearGradient = context.createLinearGradient(
        points[0][0],
        points[0][1],
        points[points.length - 1][0],
        points[points.length - 1][1]
    );
    colors.forEach(([key, val]) => linearGradient.addColorStop(key, val));
    points.forEach(function (point, index) {
        if (index === 0) {
            context.moveTo(...point);
        } else {
            context.lineTo(...point);
        }
    });
    context.strokeStyle = linearGradient;
    context.stroke();
}
