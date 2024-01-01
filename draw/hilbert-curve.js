import { drawHilbertCurve } from "../algorithms/hilbert.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("hilbert-curve");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    for (let iteration = 0; iteration <= 10; iteration++) {
        setTimeout(function () {
            ctx.clearRect(0, 0, w, h);
            drawHilbertCurve(ctx, [[0, "red"], [1 / 3, "orange"], [2 / 3, "yellow"], [1, "lime"]], [[0, 0], [w, 0], [w, h], [0, h]], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
