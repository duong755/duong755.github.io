import { drawPeanoCurve } from "../algorithms/peano.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("peano-curve-1");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    for (let iteration = 0; iteration <= 6; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawPeanoCurve(ctx, [[0, "red"], [1 / 3, "orange"], [2 / 3, "yellow"], [1, "lime"]], [[0, 0], [w, 0], [w, h], [0, h]], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
