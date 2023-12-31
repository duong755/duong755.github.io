import { drawSierpinskiCarpet } from "../algorithms/sierpinski-carpet.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("sierpinski-carpet");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let iteration = 0; iteration <= 6; iteration++) {
        setTimeout(() => {
            drawSierpinskiCarpet(ctx, [[w / 3, h / 3], [2 * w / 3, h / 3], [2 * w / 3, 2 * h / 3], [w / 3, 2 * h / 3]], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
