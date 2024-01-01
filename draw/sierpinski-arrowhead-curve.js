import { drawSierpinskiArrowheadCurve } from "../algorithms/sierpinski.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("sierpinski-arrowhead-curve");
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = width;

    const w = width,
        h = width;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;

    for (let step = 0; step <= 12; step++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawSierpinskiArrowheadCurve(
                ctx,
                [
                    [0, "red"],
                    [1 / 3, "orange"],
                    [2 / 3, "yellow"],
                    [1, "lime"],
                ],
                [0, h],
                [w, h],
                step
            );
        }, step * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);