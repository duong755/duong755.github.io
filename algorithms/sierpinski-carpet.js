/**
 * @typedef {[Point2D, Point2D, Point2D, Point2D]} Quadrangle
 */

/**
 * 
 * @param {Quadrangle} quadrangle 
 * @returns {Quadrangle[]}
 */
function simpleSierpinskiCarpet(quadrangle) {
    const [A, B, C, D] = quadrangle;

    /** @type {Quadrangle} */
    const top = [
        barycenter([A, 10], [B, 5], [C, -2], [D, -4]),
        barycenter([A, 5], [B, 10], [C, -4], [D, -2]),
        barycenter([A, 4], [B, 8], [C, -2], [D, -1]),
        barycenter([A, 8], [B, 4], [C, -1], [D, -2])
    ];
    /** @type {Quadrangle} */
    const topRight = [
        barycenter([A, -5], [B, 20], [C, -8], [D, 2]),
        barycenter([A, -10], [B, 25], [C, -10], [D, 4]),
        barycenter([A, -8], [B, 20], [C, -5], [D, 2]),
        barycenter([A, -4], [B, 16], [C, -4], [D, 1])
    ];
    /** @type {Quadrangle} */
    const right = [
        barycenter([A, -2], [B, 8], [C, 4], [D, -1]),
        barycenter([A, -4], [B, 10], [C, 5], [D, -2]),
        barycenter([A, -2], [B, 5], [C, 10], [D, -4]),
        barycenter([A, -1], [B, 4], [C, 8], [D, -2])
    ];
    /** @type {Quadrangle} */
    const bottomRight = [
        barycenter([A, 1], [B, -4], [C, 16], [D, -4]),
        barycenter([A, 2], [B, -5], [C, 20], [D, -8]),
        barycenter([A, 4], [B, -10], [C, 25], [D, -10]),
        barycenter([A, 2], [B, -8], [C, 20], [D, -5])
    ];
    /** @type {Quadrangle} */
    const bottom = [
        barycenter([A, -2], [B, -1], [C, 4], [D, 8]),
        barycenter([A, -1], [B, -2], [C, 8], [D, 4]),
        barycenter([A, -2], [B, -4], [C, 10], [D, 5]),
        barycenter([A, -4], [B, -2], [C, 5], [D, 10])
    ];
    /** @type {Quadrangle} */
    const bottomLeft = [
        barycenter([A, -5], [B, 2], [C, -8], [D, 20]),
        barycenter([A, -4], [B, 1], [C, -4], [D, 16]),
        barycenter([A, -8], [B, 2], [C, -5], [D, 20]),
        barycenter([A, -10], [B, 4], [C, -10], [D, 25])
    ];
    /** @type {Quadrangle} */
    const left = [
        barycenter([A, 10], [B, -4], [C, -2], [D, 5]),
        barycenter([A, 8], [B, -2], [C, -1], [D, 4]),
        barycenter([A, 4], [B, -1], [C, -2], [D, 8]),
        barycenter([A, 5], [B, -2], [C, -4], [D, 10])
    ];
    /** @type {Quadrangle} */
    const topLeft = [
        barycenter([A, 25], [B, -10], [C, 4], [D, -10]),
        barycenter([A, 20], [B, -5], [C, 2], [D, -8]),
        barycenter([A, 16], [B, -4], [C, 1], [D, -4]),
        barycenter([A, 20], [B, -8], [C, 2], [D, -5])
    ];
    return [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
}

/**
 * 
 * @param {[Point2D, Point2D, Point2D, Point2D]} quadrangle 
 * @param {number} iteration 
 */
function sierpinskiCarpet(quadrangle, iteration) {
    /**
     * 
     * @param {Quadrangle[][]} listOfListOfQuadrangles 
     * @param {number} step 
     */
    function recur(listOfListOfQuadrangles, step) {
        if (step >= iteration) {
            return listOfListOfQuadrangles;
        }

        const last = listOfListOfQuadrangles[listOfListOfQuadrangles.length - 1];
        const newQuadrangleList = last.flatMap((quadrangle) => simpleSierpinskiCarpet(quadrangle));

        return recur([...listOfListOfQuadrangles, newQuadrangleList], step + 1);
    }

    return recur([[quadrangle]], 0);
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Quadrangle} quadrangle 
 * @param {number} iteration 
 */
function drawSierpinskiCarpet(context, quadrangle, iteration) {
    sierpinskiCarpet(quadrangle, iteration).forEach((listOfQuadrangles) => {
        listOfQuadrangles.forEach((quadrangle) => {
            const [A, B, C, D] = quadrangle;
            context.strokeStyle = "#FFFFFF";
            context.beginPath();
            context.moveTo(...A);
            context.lineTo(...B);
            context.lineTo(...C);
            context.lineTo(...D);
            context.closePath();
            context.stroke();
        })
    });
}
