/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @returns {[Point2D, Point2D, Point2D, Point2D, Point2D]}
 */
function simpleKoch(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    /**
     * @type {Point2D}
     */
    const oneThird = [x1 + (x2 - x1) / 3, y1 + (y2 - y1) / 3];
    /**
     * @type {Point2D}
     */
    const twoThird = [x1 + ((x2 - x1) * 2) / 3, y1 + ((y2 - y1) * 2) / 3];

    const points = [
        start,
        oneThird,
        rotate(oneThird, -Math.PI / 3, twoThird),
        twoThird,
        end,
    ];

    return points;
}

/**
 *
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} iteration
 * @returns
 */
function koch(start, end, iteration) {
    console.assert(iteration >= 0);
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
            if (index === 0) return simpleKoch(point, thisPath[index + 1]);
            return simpleKoch(point, thisPath[index + 1]).slice(1);
        });

        return recur(segments, step - 1);
    }

    return recur([start, end], iteration);
}


/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Point2D} start
 * @param {Point2D} end
 * @param {number} iteration
 */
function drawKochCurve(context, start, end, iteration) {
    context.beginPath();
    koch(start, end, iteration).forEach((point, index) => {
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
 * @param {[Point2D, Point2D, Point2D]} triangle
 * @param {number} iteration
 */
function drawKochSnowflake(context, triangle, iteration) {
    const path = new Path2D();

    const points =
        signedArea(triangle) > 0
            ? koch(triangle[0], triangle[1], iteration)
                .concat(koch(triangle[1], triangle[2], iteration))
                .concat(koch(triangle[2], triangle[0], iteration))
            : koch(triangle[0], triangle[2], iteration)
                .concat(koch(triangle[2], triangle[1], iteration))
                .concat(koch(triangle[1], triangle[0], iteration));

    points.forEach((point, index) => {
        if (index === 0) {
            path.moveTo(...point);
        } else {
            path.lineTo(...point);
        }
    });
    path.closePath();
    context.stroke(path);
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {[Point2D, Point2D, Point2D]} triangle
 * @param {number} iteration
 */
function drawKochAntisnowflake(context, triangle, iteration) {
    const path = new Path2D();

    const points =
        signedArea(triangle) < 0
            ? koch(triangle[0], triangle[1], iteration)
                .concat(koch(triangle[1], triangle[2], iteration))
                .concat(koch(triangle[2], triangle[0], iteration))
            : koch(triangle[0], triangle[2], iteration)
                .concat(koch(triangle[2], triangle[1], iteration))
                .concat(koch(triangle[1], triangle[0], iteration));

    points.forEach((point, index) => {
        if (index === 0) {
            path.moveTo(...point);
        } else {
            path.lineTo(...point);
        }
    });
    path.closePath();
    context.stroke(path);
}

