/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {[number, string][]} colors
 * @param {import("../algorithms/helpers.js").Point2D} start
 * @param {import("../algorithms/helpers.js").Point2D} end
 */
export function makeLinearGradient(context, colors, start, end) {
    const linearGradient = context.createLinearGradient(start[0], start[1], end[0], end[1]);
    colors.forEach(function (element) {
        const [key, val] = element;
        linearGradient.addColorStop(key, val);
    });
    context.strokeStyle = linearGradient;
}