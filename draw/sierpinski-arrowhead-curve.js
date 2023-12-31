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
                    [1 / 6, "orange"],
                    [2 / 6, "yellow"],
                    [3 / 6, "lime"],
                    [4 / 6, "lightblue"],
                    [5 / 6, "blue"],
                    [1, "purple"],
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