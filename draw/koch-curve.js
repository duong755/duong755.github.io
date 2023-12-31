import { drawKochCurve } from "../algorithms/koch.js";

function draw () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("koch-curve");
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = width/2;

    const w = width, h = width/2;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let iteration = 0; iteration <= 9; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawKochCurve(ctx, [0, 2 * h /3], [w, 2 * h / 3], iteration);
        }, iteration * 1000);
    }   
}

draw();
document.getElementById("replay").addEventListener("click", draw);