/**
 * @typedef {[number, number]} Point2D
 */

/**
 *
 * @param {Point2D} point1
 * @param {Point2D} point2
 * @returns {number}
 */
function distance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 *
 * @param {Point2D} center
 * @param {Point2D} point
 * @param {number} angle In radian
 * @returns {Point2D}
 */
function rotate(center, point, angle) {
    const radius = distance(center, point);

    if (radius === 0) {
        // returns a copy
        return [point[0], point[1]];
    }

    const cosAngle = Math.cos(angle),
        sinAngle = Math.sin(angle);

    /**
     * @type {Point2D}
     */
    const image = [
        center[0] +
        (point[0] - center[0]) * cosAngle -
        (point[1] - center[1]) * sinAngle,
        center[1] +
        (point[0] - center[0]) * sinAngle +
        (point[1] - center[1]) * cosAngle,
    ];
    return image;
}

/**
 * 
 * @param {Point2D} firstPoint 
 * @param {Point2D} secondPoint 
 * @param {number} ratio
 * @returns {Point2D}
 */
function divide(firstPoint, secondPoint, ratio) {
    const t = ratio;
    const [x1, y1] = firstPoint;
    const [x2, y2] = secondPoint;

    return [
        x1 * t + x2 * (1 - t),
        y1 * t + y2 * (1 - t)
    ];
}

/**
 * 
 * @param {Point2D} point1
 * @param {Point2D} point2
 * @returns {Point2D}
 */
function vector(point1, point2) {
    return [
        point2[0] - point1[0],
        point2[1] - point1[1]
    ];
}

/**
 * 
 * @param {Point2D} point 
 * @param {Point2D} vector 
 * @returns {Point2D}
 */
function translate(point, vector) {
    return [
        point[0] + vector[0],
        point[1] + vector[1]
    ];
}


/**
 * 
 * @param {[Point2D, Point2D, Point2D]} triangle 
 * @returns {number}
 */
function signedArea(triangle) {
    const [A, B, C] = triangle;
    /**
     * @type {Point2D}
     */
    const AB = [B[0] - A[0], B[1] - A[1]];
    const AC = [C[0] - A[0], C[1] - A[1]];

    return 0.5 * (AB[0] * AC[1] - AB[1] * AC[0]);
}

/**
 * 
 * @param  {...[Point2D, number]} args 
 */
function barycenter(...args) {
    console.assert(args.length > 0);

    const [sumX, sumY, sumWeight] = args.reduce(function (acc, element) {
        const [x, y, w] = acc;
        const [point, weight] = element;
        return [
            x + point[0] * weight,
            y + point[1] * weight,
            w + weight
        ]
    }, [0, 0, 0])

    return [sumX / sumWeight, sumY / sumWeight];
}
