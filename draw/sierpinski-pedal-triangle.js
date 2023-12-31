import { drawSierpinskiPedalTriangle } from "../algorithms/sierpinski.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("sierpinski-pedal-triangle");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let step = 0; step <= 12; step++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawSierpinskiPedalTriangle(ctx, [[0, h], [w, h], [w / 4, h / 6]], step);
        }, step * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);

