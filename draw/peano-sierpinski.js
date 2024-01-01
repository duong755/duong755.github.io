import { drawPeanoSierpinskiCurve } from "../algorithms/peano-sierpinski.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("peano-sierpinski");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";

    for (let iteration = 0; iteration <= 5; iteration++) {
        setTimeout(function () {
            ctx.clearRect(0, 0, w, h);
            drawPeanoSierpinskiCurve(ctx, [[0, 0], [w, 0], [w, h], [0, h]], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
