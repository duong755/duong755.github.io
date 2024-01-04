/**
 * @typedef {[number, number]} Point2D
 * @typedef {[Point2D, Point2D]} LineSegment
 * @typedef {[Point2D, Point2D, Point2D]} Triangle
 * @typedef {[Point2D, Point2D, Point2D, Point2D]} Quadrangle
 */

/**
 *
 * @param {Point2D} point1
 * @param {Point2D} point2
 * @returns {number}
 */
export function distance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 *
 * @param {Point2D} center
 * @param {Point2D} point
 * @param {number} angle In radian
 * @param {number} scale
 * @returns {Point2D}
 */
export function rotate(center, point, angle, scale = 1.0) {
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
        (point[0] - center[0]) * scale * cosAngle -
        (point[1] - center[1]) * scale * sinAngle,
        center[1] +
        (point[0] - center[0]) * scale * sinAngle +
        (point[1] - center[1]) * scale * cosAngle,
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
export function divide(firstPoint, secondPoint, ratio) {
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
export function vector(point1, point2) {
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
export function translate(point, vector) {
    return [
        point[0] + vector[0],
        point[1] + vector[1]
    ];
}


/**
 * 
 * @param {Triangle} triangle 
 * @returns {number}
 */
export function signedArea(triangle) {
    const [A, B, C] = triangle;
    const AB = vector(A, B);
    const AC = vector(A, C);

    return 0.5 * (AB[0] * AC[1] - AB[1] * AC[0]);
}

/**
 * 
 * @param  {...[Point2D, number]} args 
 */
export function barycenter(...args) {
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

/**
 * 
 * @param  {...Point2D} points 
 * @returns {Point2D}
 */
export function centroid(...points) {
    console.assert(points.length > 0);

    const [sumX, sumY] = points.reduce(function (acc, element) {
        const [x, y] = acc;
        return [
            x + element[0],
            y + element[1]
        ];
    }, [0, 0]);

    return [sumX / points.length, sumY / points.length];
}
